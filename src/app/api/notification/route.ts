import { dbConnect } from "@/helper/dbConnection";
import { Notification } from "@/models/Notificaion.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, message, url } = await req.json();

  if (!userId || !message || !url) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const existingNotification = await Notification.findOne({
      userId,
      message,
      url,
    });

    if (existingNotification) {
      return NextResponse.json(
        { message: "Notification already exists" },
        { status: 200 }
      );
    }
    const notification = await Notification.create({
      userId,
      message,
      url,
    });
    await notification.save();
    return NextResponse.json({ notification }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
