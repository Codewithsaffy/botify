import { dbConnect } from "@/helper/dbConnection";
import { Notification } from "@/models/Notificaion.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const insertManyNot = await Notification.insertMany(
    [
      {
        "message": "Welcome to the platform!",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/home"
      },
      {
        "message": "Your profile has been updated successfully.",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/profile"
      },
      {
        "message": "You have 3 new notifications.",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/notifications"
      },
      {
        "message": "Check out our latest blog posts!",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/blog"
      },
      {
        "message": "Your settings have been saved.",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/settings"
      },
      {
        "message": "A new friend request is waiting for you.",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/friends"
      },
      {
        "message": "Your subscription has been renewed successfully.",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/subscription"
      },
      {
        "message": "An error occurred while processing your request.",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/error"
      },
      {
        "message": "Your payment was successful. Thank you!",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/payments"
      },
      {
        "message": "Don't miss our upcoming events!",
        "userId": "67365a1e75b94da7e3b2592f",
        "url": "/events"
      }
    ]

  )

  return NextResponse.json({ insertManyNot }, { status: 200 });
  // const { userId, message, url } = await req.json();

  // if (!userId || !message || !url) {
  //   return NextResponse.json(
  //     { message: "All fields are required" },
  //     { status: 400 }
  //   );
  // }

  // try {
  //   await dbConnect();
  //   const existingNotification = await Notification.findOne({
  //     $or: [{ userId }, { message }, { url }],
  //   });

  //   if (existingNotification) {
  //     return NextResponse.json(
  //       { message: "Notification already exists" },
  //       { status: 400 }
  //     );
  //   }
  //   const notification = await Notification.create({
  //     userId,
  //     message,
  //     url,
  //     read: false,
  //   });
  //   await notification.save();
  //   return NextResponse.json({ notification }, { status: 201 });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(
  //     { message: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const notifications = await Notification.find();
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
