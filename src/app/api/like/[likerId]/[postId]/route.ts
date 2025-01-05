import { dbConnect } from "@/helper/dbConnection";
import { Like } from "@/models/Likes.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ likerId: string; postId: string }> }
) {
  const params = await props.params;
  const { likerId, postId } = params;

  if (!likerId || !postId) {
    return NextResponse.json(
      { message: "liker ID and post ID are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const likes = await Like.findOne({
     likerId,  postId 
    });
    const noOfLikes = await Like.countDocuments({ postId });
    if (!likes) {
      return NextResponse.json({ isLike: false, noOfLikes }, { status: 200 });
    }
    return NextResponse.json({ isLike: true, noOfLikes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
