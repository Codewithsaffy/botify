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

  try {
    await dbConnect();
 if (!category || category === "all") {
  const posts = await Post.aggregate([
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
        description: 1,
        publishDate: "$createdAt",
        "author.image": "$author.image",
        "author.username": "$author.username",
        "author.name": "$author.name",
        likes: { $size: "$likes" },
        comments: { $size: "$comments" },
      },
    },
  ])
      return NextResponse.json(
        {  posts },
        { status: 201 }
      )
}
    
    // Aggregation pipeline
    const posts = await Post.aggregate([
      { $match: { category: category } },
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
          description: 1,
          publishDate: "$createdAt",
          "author.image": "$author.image",
          "author.username": "$author.username",
          "author.name": "$author.name",
          likes: { $size: "$likes" },
          comments: { $size: "$comments" },
        },
      },
    ]);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
