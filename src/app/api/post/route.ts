import { dbConnect } from "@/helper/dbConnection";
import { Post } from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    await dbConnect();

    const { title, image, description, category, authorId, content, slug } =
      await req.json();

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
    const existingPost = await Post.findOne({ slug });

    if (existingPost) {
      return NextResponse.json(
        { message: "Post already exists" },
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
  try {
    await dbConnect();
    const postData = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },

      {
        $unwind: "$author",
      },

      {
        $addFields: {
          author: {
            name: "$author.name",
            username: "$author.username",
            image: "$author.image",
          },
        },
      },

      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },

      // Add a field to count likes
      {
        $addFields: {
          likes: { $size: "$likes" },
        },
      },

      // Lookup to fetch comments and count them directly
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },

      // Add a field to count comments without returning comment data
      {
        $addFields: {
          commentCount: { $size: "$comments" },
        },
      },

      // Limit the results to only one post (it will return an object)
      {
        $limit: 1,
      },

      // Project the final fields for the post including author and counts
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          description: 1,
          slug: 1,
          tags: 1,
          authorId: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          author: 1,
          likes: 1,
          commentCount: 1, 
        },
      },
    ]);

    const post = postData[0];

    if (post) {
      return NextResponse.json(
        { post, message: "Post found successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect()
    const { _id, content } = await req.json();
    if (!_id) {
      return NextResponse.json(
        { message: "id is required for post identification" },
        { status: 400 }
      );
    }

    const post = await Post.findByIdAndUpdate(
      { _id },
      { content },
      { new: true }
    );

    if (!post) {
      return NextResponse.json({ message: "post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
