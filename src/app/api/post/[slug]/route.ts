import { dbConnect } from "@/helper/dbConnection";
import { Post } from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const postData = await Post.aggregate([
      {
        $match: { slug: slug },
      },

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
    // If there's no post, return a response indicating that

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
