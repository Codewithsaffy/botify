import { dbConnet } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params;
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    await dbConnet();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          user,
          message: "User found successfully",
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
