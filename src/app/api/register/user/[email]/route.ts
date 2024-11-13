import { dbConnect } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const deCodedusername = decodeURIComponent(username);
    await dbConnect();
    const user = await User.findOne({ username: deCodedusername });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
