import { dbConnect } from "@/helper/dbConnection";
import { Notification } from "@/models/Notificaion.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  await dbConnect();
  const { userId } = params;

  if (!userId) {
    return NextResponse.json(
      { message: "userId is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const notifications = await Notification.find({ userId: userId })
      .sort({
        createdAt: -1,
      })
      .limit(10);
    if (!notifications) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 200 }
      );
    }

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  try {
    const { userId } = params;
    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const notifications = await Notification.deleteMany({ userId });

    if (!notifications) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
