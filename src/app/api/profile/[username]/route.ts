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

    const userProfilyeData = await User.aggregate([
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

      // Count followers of the user
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

      // Count users this user is following
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "userId",
          as: "following",
        },
      },
      {
        $addFields: {
          followingCount: { $size: "$following" },
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
          followingCount: 1,
        },
      },
    ]);
    if (userProfilyeData) {
      return NextResponse.json(userProfilyeData, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {}
}
