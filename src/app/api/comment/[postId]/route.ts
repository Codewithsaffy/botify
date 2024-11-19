import { dbConnect } from "@/helper/dbConnection";
import { Comment } from "@/models/Comments.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  if (!postId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Fetch comments along with commenter details
    const comments = await Comment.aggregate([
      { $match: { postId: new mongoose.Types.ObjectId(postId) } }, // Filter by postId
      { $sort: { createdAt: -1 } }, // Sort by newest first
      {
        $lookup: {
          from: "users", // Join with the User collection
          localField: "commenterId", // Field in Comment model
          foreignField: "_id", // Field in User model
          as: "commenter", // Alias for the joined data
        },
      },
      {
        $unwind: {
          path: "$commenter", // Unwrap the commenter array
          preserveNullAndEmptyArrays: true, // Allow comments without a valid user
        },
      },
      {
        $project: {
          _id: 1,
          comment: 1,
          postId: 1,
          createdAt: 1,
          updatedAt: 1,
          "commenter._id": 1,
          "commenter.name": 1,
          "commenter.username": 1,
          "commenter.image": 1,
        },
      },
    ]);

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
