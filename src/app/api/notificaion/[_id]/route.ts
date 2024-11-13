import { dbConnect } from "@/helper/dbConnection";
import { Notification } from "@/models/Notificaion.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    const { _id } = params;
    if (!_id) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const notifications = await Notification.findByIdAndDelete(_id);

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
