import { dbConnect } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ email: string }> }) {
  const params = await props.params;
  try {
    const { email } = params;
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          isRegistered: true,
          user,
          message: "User found successfully",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { isRegistered: false, message: "User not found" },
      { status: 404 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
