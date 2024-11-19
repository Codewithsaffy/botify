import { dbConnect } from "@/helper/dbConnection";
import { Post } from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

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
