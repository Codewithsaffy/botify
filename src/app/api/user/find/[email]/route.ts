import { dbConnect } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ email: string }> }) {
  const params = await props.params;
  await dbConnect();
  const { email } = params;
  if (!email) {
    return NextResponse.json(
      { message: "Email is required for user identification" },
      { status: 400 }
    );
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
