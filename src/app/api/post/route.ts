import { dbConnect } from "@/helper/dbConnection";
import { Post } from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    // Connect to the database
    await dbConnect();

    // Parse JSON data from the request
    const { title, image, description, category, authorId, content, slug } =
      await req.json();

    // Check for required fields
    if (
      !title ||
      !image ||
      !description ||
      !category ||
      !authorId ||
      !content ||
      !slug
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create and save the post
    const post = await Post.create({
      title,
      image,
      description,
      category,
      authorId,
      content,
      slug,
    });

    // Return success response
    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  // const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items
  // const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
  // const skip = (page - 1) * limit;

  try {
    await dbConnect();
    let matchCondition = {};
    if (category && category !== "" && category !== "All") {
      matchCondition = { category };
    }

    const posts = await Post.aggregate([
      { $match: matchCondition },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $project: {
          title: 1,
          image: 1,
          slug: 1,
          description: 1,
          publishDate: "$createdAt",
          "author.image": "$author.image",
          "author.username": "$author.username",
          "author.name": "$author.name",
          likes: { $size: "$likes" },
          comments: { $size: "$comments" }
        },
      },
      { $sort: { publishDate: -1 } }, // Sort by most recent
      // { $skip: skip },
      // { $limit: limit },
    ]);

    // const totalPosts = await Post.countDocuments(matchCondition);
    // const hasMore = skip + posts.length < totalPosts;

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
