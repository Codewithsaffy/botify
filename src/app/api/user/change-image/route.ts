import { NextResponse } from "next/server";
import { Post } from "@/models/Post.model"; // Adjust the path to your Post model
import { dbConnect } from "@/helper/dbConnection"; // Utility to connect to MongoDB

export async function PATCH() {
  try {
    // Connect to the database
    await dbConnect();

    // Update posts where the `image` field starts with "https://example.com/images/"
    const result = await Post.updateMany(
      {
        image: { $regex: "^https://example\\.com/images/.*" }, // Matches URLs starting with https://example.com/images/
      },
      {
        $set: { image: "damycard_jasmc8" }, // Replace with "damycard_jasmc8"
      }
    );

    return NextResponse.json({
      message: "Post images updated successfully",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
