import { dbConnect } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { Post } from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  try {
    if (!query) {
      return NextResponse.json(
        { message: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Search users
    await dbConnect();
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { about: { $regex: query, $options: "i" } },
      ],
    }).select("name username image");

    // Search posts
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).select("title slug image");

    // Combine results
    const results = [
      ...users.map((user) => ({
        type: "user",
        name: user.name,
        username: user.username,
        image: user.image,
      })),
      ...posts.map((post) => ({
        type: "post",
        title: post.title,
        slug: post.slug,
        image: post.image,
      })),
    ];

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Error searching users and posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
