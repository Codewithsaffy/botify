import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import { dbConnet } from "@/helper/dbConnection";

export async function POST(req: NextRequest) {

   const insert = await User.aggregate([
    {
      $project: {
        _id: 1,
        username: 1,
      },
    }
   ])
   return NextResponse.json(insert, { status: 200 });
  // try {
  //   await dbConnet();
  //   const { username, email, image, name } = await req.json();
  //   if (!username || !email || !image || !name) {
  //     return new NextResponse("All fields are required", { status: 400 });
  //   }

  //   // Use findOne to check for an existing user by username or email
  //   const existingUser = await User.findOne({
  //     $or: [{ username: `@${username.trim().toLowerCase()}` }, { email }],
  //   });

  //   if (!existingUser) {
  //     const user = await User.create({
  //       name,
  //       username: `@${username.trim().toLowerCase()}`,
  //       email,
  //       image,
  //     });
  //     await user.save();

  //     if (!user) {
  //       return new NextResponse("Failed to create user", { status: 500 });
  //     }
  //     return NextResponse.json(user, { status: 201 });
  //   }

  //   return new NextResponse("User already exists", { status: 200 });
  // } catch (err) {
  //   console.log(err);
  //   return new NextResponse("Internal Server Error", { status: 500 });
  // }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnet();
    const users = await User.find();
    return NextResponse.json(
      { users, message: "Users fetched successfully" },
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
