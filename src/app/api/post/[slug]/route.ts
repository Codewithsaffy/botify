import { dbConnet } from "@/helper/dbConnection";
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
    await dbConnet();
    const post = await Post.aggregate([
      {
        $match: {
          slug: slug,
        },
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
        $addFields: {
          author: {
            $first: "$author",
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
      {
        $addFields: {
          likes: {
            $size: "$likes",
          },
        },
      },
      {
        $lookup:{
          from:"comments",
          localField:"_id",
          foreignField:"postId",
          as:"comments"
        }
      }
    ]);
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
