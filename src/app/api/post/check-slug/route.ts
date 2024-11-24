import { dbConnect } from "@/helper/dbConnection";
import { Post } from "@/models/Post.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const { slug, authorId } = await req.json();

    if (!slug || !authorId) {
      return NextResponse.json(
        { error: "Slug and authorId are required." },
        { status: 400 }
      );
    }

    // Check if authorId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return NextResponse.json(
        { error: "Invalid authorId format." },
        { status: 400 }
      );
    }

    // Query the database for the slug and authorId
    const posts = await Post.aggregate([
      {
        $match: {
          authorId: new mongoose.Types.ObjectId(authorId), // Use ObjectId
        },
      },
      {
        $match: {
          slug: slug,
        },
      },
    ]);

    if (posts.length > 0) {
      return NextResponse.json(
        { exists: true, message: "Slug already exists for this author." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { exists: false, message: "Slug is available." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking slug:", error);
    return NextResponse.json(
      { error: "An error occurred while checking the slug." },
      { status: 500 }
    );
  }
}
