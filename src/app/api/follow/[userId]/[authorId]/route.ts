import { dbConnect } from "@/helper/dbConnection";
import { Follow } from "@/models/Follow.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ userId: string; authorId: string }> }
) {
  const params = await props.params;
  const { userId, authorId } = params;

  if (!userId || !authorId) {
    return NextResponse.json(
      { message: "User ID and Author ID are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const follows = await Follow.findOne({
      userId,
      authorId,
    });
    if (!follows) {
      return NextResponse.json({ isFollow: false }, { status: 200 });
    }
    return NextResponse.json({ isFollow: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
