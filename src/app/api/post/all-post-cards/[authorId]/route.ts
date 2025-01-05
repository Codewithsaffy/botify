import { dbConnect } from "@/helper/dbConnection";
import { Post } from "@/models/Post.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ authorId: string }> }) {
  const params = await props.params;
  const { authorId } = params;
  if (!authorId) {
    return NextResponse.json(
      { message: "authorId is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const posts = await Post.aggregate([
      {
        $match: {
          authorId: new mongoose.Types.ObjectId(authorId),
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
          comments: { $size: "$comments" },
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
