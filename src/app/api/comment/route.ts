import { dbConnect } from "@/helper/dbConnection";
import { Comment } from "@/models/Comments.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const { comment, postId, commenterId } = await req.json();
    if (!comment || !postId || !commenterId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const commentRecord = await Comment.create({
      comment,
      postId,
      commenterId,
    });
 const commentData =  await commentRecord.save();
    if (!commentRecord) {
      return NextResponse.json(
        { message: "Comment not created" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ commentData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
