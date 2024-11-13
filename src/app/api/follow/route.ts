import { dbConnect } from "@/helper/dbConnection";
import { Follow } from "@/models/Follow.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // await dbConnect();
  // const follow = await Follow.insertMany([
  //   {
  //     userId: "67328c388fafad51f1dd72d6",
  //     authorId: "673293e08fafad51f1dd72eb",
  //   },
  //   {
  //     userId: "67328c388fafad51f1dd72d6",
  //     authorId: "673293e08fafad51f1dd72ec",
  //   },
  //   {
  //     userId: "67328c388fafad51f1dd72d6",
  //     authorId: "673293e08fafad51f1dd72ed",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72eb",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72eb",
  //     authorId: "673293e08fafad51f1dd72ec",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72eb",
  //     authorId: "673293e08fafad51f1dd72ee",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ec",
  //     authorId: "673293e08fafad51f1dd72ed",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ec",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ec",
  //     authorId: "673293e08fafad51f1dd72ef",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ed",
  //     authorId: "673293e08fafad51f1dd72f0",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ed",
  //     authorId: "673293e08fafad51f1dd72f1",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ed",
  //     authorId: "673293e08fafad51f1dd72eb",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ee",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ee",
  //     authorId: "673293e08fafad51f1dd72ec",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ee",
  //     authorId: "673293e08fafad51f1dd72ed",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ef",
  //     authorId: "673293e08fafad51f1dd72eb",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ef",
  //     authorId: "673293e08fafad51f1dd72f2",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72ef",
  //     authorId: "673293e08fafad51f1dd72f3",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f0",
  //     authorId: "673293e08fafad51f1dd72ec",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f0",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f0",
  //     authorId: "673293e08fafad51f1dd72f1",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f1",
  //     authorId: "673293e08fafad51f1dd72ee",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f1",
  //     authorId: "673293e08fafad51f1dd72f3",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f1",
  //     authorId: "673293e08fafad51f1dd72f2",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f2",
  //     authorId: "673293e08fafad51f1dd72f0",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f2",
  //     authorId: "673293e08fafad51f1dd72f1",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f2",
  //     authorId: "673293e08fafad51f1dd72f5",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f3",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f3",
  //     authorId: "673293e08fafad51f1dd72f6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f3",
  //     authorId: "673293e08fafad51f1dd72f7",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f4",
  //     authorId: "673293e08fafad51f1dd72f8",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f4",
  //     authorId: "673293e08fafad51f1dd72f9",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f4",
  //     authorId: "673293e08fafad51f1dd72fa",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f5",
  //     authorId: "673293e08fafad51f1dd72fc",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f5",
  //     authorId: "673293e08fafad51f1dd72fd",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f5",
  //     authorId: "673293e08fafad51f1dd72fe",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f6",
  //     authorId: "673293e08fafad51f1dd72eb",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f6",
  //     authorId: "673293e08fafad51f1dd72f7",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f6",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f7",
  //     authorId: "673293e08fafad51f1dd72fc",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f7",
  //     authorId: "673293e08fafad51f1dd72fe",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f7",
  //     authorId: "673293e08fafad51f1dd72f1",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f8",
  //     authorId: "673293e08fafad51f1dd72fd",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f8",
  //     authorId: "673293e08fafad51f1dd72f4",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f8",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f9",
  //     authorId: "673293e08fafad51f1dd72ec",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f9",
  //     authorId: "673293e08fafad51f1dd72fd",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72f9",
  //     authorId: "673293e08fafad51f1dd72fc",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72fa",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72fa",
  //     authorId: "673293e08fafad51f1dd72eb",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72fa",
  //     authorId: "673293e08fafad51f1dd72f4",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72fb",
  //     authorId: "673293e08fafad51f1dd72f2",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72fb",
  //     authorId: "67328c388fafad51f1dd72d6",
  //   },
  //   {
  //     userId: "673293e08fafad51f1dd72fb",
  //     authorId: "673293e08fafad51f1dd72f5",
  //   },
  // ]);
  try {
    const { userId, authorId } = await req.json();

    // Validate required fields
    if (!userId || !authorId) {
      return NextResponse.json(
        { message: "Both authorId and authorId are required" },
        { status: 400 }
      );
    }

    // Ensure connection to the database
    await dbConnect();

    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      $or: [{ userId }, { authorId }],
    });
    if (existingFollow) {
      const deleteFollow = await Follow.findByIdAndDelete(existingFollow._id);
      if (!deleteFollow) {
        return NextResponse.json(
          { message: "Failed to delete follow record" },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Follow relationship deleted", isFollow: false },
        { status: 200 }
      );
    }
    // Create a new follow record
    const followRecord = await Follow.create({ userId, authorId });
    if (!followRecord) {
      return NextResponse.json(
        { message: "Failed to create follow record" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Follow relationship created", isFollow: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in follow request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function  GET(req: NextRequest) {
  try {
    await dbConnect();
    const follows = await Follow.find();
    return NextResponse.json({ follows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}