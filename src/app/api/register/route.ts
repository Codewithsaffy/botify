import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/helper/dbConnection";

// Function to handle user creation (unchanged)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { username, email, image, name } = await req.json();
    if (!username || !email || !image || !name) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const existingUser = await User.findOne({
      $or: [{ username: `@${username.trim().toLowerCase()}` }, { email }],
    });

    if (!existingUser) {
      const user = await User.create({
        name,
        username: `@${username.trim().toLowerCase()}`,
        email,
        image,
      });
      await user.save();

      if (!user) {
        return new NextResponse("Failed to create user", { status: 500 });
      }
      return NextResponse.json(user, { status: 201 });
    }

    return new NextResponse("User already exists", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Function to fetch all users (unchanged)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(
      { users, message: "Users fetched successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH function for dynamic updates
export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    // Parse the request data, which could contain any fields
    const data = await req.json();
    const { email, ...updateFields } = data;

    // Ensure an email is provided for locating the user
    if (!email) {
      return NextResponse.json(
        { message: "Email is required for user identification" },
        { status: 400 }
      );
    }

    // Use findOneAndUpdate to apply the dynamic fields
    const user = await User.findOneAndUpdate(
      { email },
      { ...updateFields },
      { new: true }
    );

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
