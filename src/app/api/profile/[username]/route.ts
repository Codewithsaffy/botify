import { dbConnect } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const profileData = await User.aggregate([
      {
        $match: {
          username: username,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "authorId",
          as: "posts",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$posts" },
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "authorId",
          as: "followers",
        },
      },
      {
        $addFields: {
          followerCount: { $size: "$followers" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          image: 1,
          thumbnail: 1,
          about: 1,
          postCount: 1,
          followerCount: 1,
        },
      },
    ]);
    if (profileData) {
      return NextResponse.json({profileData}, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
