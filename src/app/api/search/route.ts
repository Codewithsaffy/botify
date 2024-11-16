import { dbConnect } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { Post } from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const body = await req.json();
    const query = body?.query?.trim();

    // Validate input
    if (!query || typeof query !== "string" || query.length < 1) {
      return NextResponse.json(
        { success: false, message: "Query parameter must be a non-empty string of at least 2 characters." },
        { status: 400 }
      );
    }

    // Secure database connection
    await dbConnect();

    // Search for users
    const users = await User.find({
      $or: [
        { name: { $regex: `^${query}`, $options: "i" } },
        { username: { $regex: `^${query}`, $options: "i" } },
        { email: { $regex: `^${query}`, $options: "i" } },
        { about: { $regex: query, $options: "i" } },
      ],
    })
      .select("name username image")
      .limit(50); // Limit the number of results

    // Search for posts
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .select("title slug image")
      .limit(50); // Limit the number of results

    // Combine results
    const results = [
      ...users.map((user) => ({
        type: "user",
        name: user.name || "Unknown",
        username: user.username || "N/A",
        image: user.image || null,
      })),
      ...posts.map((post) => ({
        type: "post",
        title: post.title || "Untitled",
        slug: post.slug || "#",
        image: post.image || null,
      })),
    ];

    return NextResponse.json(
      { success: true, results },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing search query:", error.message);

    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
