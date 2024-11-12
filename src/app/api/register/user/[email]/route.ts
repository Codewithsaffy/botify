import { dbConnet } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, about } = await req.json();
    await dbConnet();
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { about },
      { new: true }
    );
    await user?.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params;
    const deCodedEmail = decodeURIComponent(email);
    await dbConnet();
    const user = await User.findOne({ email: deCodedEmail });
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
