import { dbConnect } from "@/helper/dbConnection";
import { Notification } from "@/models/Notificaion.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


  // const insertManyNot = await Notification.insertMany(
  //   [
  //     { "userId": "67328c388fafad51f1dd72d6", "message": "Welcome to the platform!", "url": "/home" },
  //     { "userId": "673293e08fafad51f1dd72eb", "message": "You have a new follower.", "url": "/profile" },
  //     { "userId": "673293e08fafad51f1dd72f3", "message": "Your post received a new like.", "url": "/posts/123" },
  //     { "userId": "673293e08fafad51f1dd72ee", "message": "New comment on your post.", "url": "/posts/456" },
  //     { "userId": "673293e08fafad51f1dd72fe", "message": "You have a new notification.", "url": "/notifications" },
  //     { "userId": "673293e08fafad51f1dd72f0", "message": "Someone mentioned you.", "url": "/mentions" },
  //     { "userId": "673293e08fafad51f1dd72ed", "message": "Your profile was viewed.", "url": "/profile" },
  //     { "userId": "673293e08fafad51f1dd72ef", "message": "Weekly summary is ready.", "url": "/summary" },
  //     { "userId": "673293e08fafad51f1dd72ec", "message": "System update completed.", "url": "/updates" },
  //     { "userId": "673293e08fafad51f1dd72f8", "message": "Friend request received.", "url": "/requests" },
  //     { "userId": "673293e08fafad51f1dd72f5", "message": "Password change successful.", "url": "/settings" },
  //     { "userId": "673293e08fafad51f1dd72f9", "message": "Your feedback is valued.", "url": "/feedback" },
  //     { "userId": "673293e08fafad51f1dd72f4", "message": "Upcoming event reminder.", "url": "/events" },
  //     { "userId": "673293e08fafad51f1dd72fb", "message": "New message received.", "url": "/messages" },
  //     { "userId": "673293e08fafad51f1dd72f1", "message": "Access granted to beta feature.", "url": "/beta" },
  //     { "userId": "673293e08fafad51f1dd72f2", "message": "You earned a new badge!", "url": "/achievements" },
  //     { "userId": "673293e08fafad51f1dd72fa", "message": "Maintenance notice.", "url": "/maintenance" },
  //     { "userId": "673293e08fafad51f1dd72fd", "message": "Check out our new tutorial.", "url": "/tutorials" },
  //     { "userId": "673293e08fafad51f1dd72f6", "message": "Your trial period is ending soon.", "url": "/billing" },
  //     { "userId": "673293e08fafad51f1dd72f7", "message": "New comment reply.", "url": "/posts/789" },
  //     { "userId": "673293e08fafad51f1dd72fc", "message": "Upgrade available.", "url": "/settings" },
  //     { "userId": "67328c388fafad51f1dd72d6", "message": "Daily tip for you.", "url": "/tips" },
  //     { "userId": "673293e08fafad51f1dd72eb", "message": "Security alert detected.", "url": "/security" },
  //     { "userId": "673293e08fafad51f1dd72f3", "message": "Account activity report.", "url": "/account" },
  //     { "userId": "673293e08fafad51f1dd72ee", "message": "New story posted by a friend.", "url": "/stories" },
  //     { "userId": "673293e08fafad51f1dd72fe", "message": "Scheduled downtime announced.", "url": "/status" },
  //     { "userId": "673293e08fafad51f1dd72f0", "message": "You were tagged in a post.", "url": "/tags" },
  //     { "userId": "673293e08fafad51f1dd72ed", "message": "Profile customization tips.", "url": "/profile/customize" },
  //     { "userId": "673293e08fafad51f1dd72ef", "message": "Connection request accepted.", "url": "/connections" },
  //     { "userId": "673293e08fafad51f1dd72ec", "message": "Leaderboard update.", "url": "/leaderboard" },
  //     { "userId": "673293e08fafad51f1dd72f8", "message": "Content flagged.", "url": "/moderation" },
  //     { "userId": "673293e08fafad51f1dd72f5", "message": "New topic created.", "url": "/topics" },
  //     { "userId": "673293e08fafad51f1dd72f9", "message": "Weekly insights available.", "url": "/insights" },
  //     { "userId": "673293e08fafad51f1dd72f4", "message": "System maintenance scheduled.", "url": "/maintenance" },
  //     { "userId": "673293e08fafad51f1dd72fb", "message": "Content suggestion based on activity.", "url": "/recommendations" },
  //     { "userId": "673293e08fafad51f1dd72f1", "message": "You unlocked a new feature!", "url": "/features" },
  //     { "userId": "673293e08fafad51f1dd72f2", "message": "Subscription renewal reminder.", "url": "/billing/renew" },
  //     { "userId": "673293e08fafad51f1dd72fa", "message": "Shared article from a friend.", "url": "/articles/shared" },
  //     { "userId": "673293e08fafad51f1dd72fd", "message": "Survey invitation.", "url": "/surveys" },
  //     { "userId": "673293e08fafad51f1dd72f6", "message": "Maintenance complete.", "url": "/status" },
  //     { "userId": "673293e08fafad51f1dd72f7", "message": "Top picks for you.", "url": "/top-picks" },
  //     { "userId": "673293e08fafad51f1dd72fc", "message": "See who viewed your post.", "url": "/analytics" },
  //     { "userId": "67328c388fafad51f1dd72d6", "message": "User feedback request.", "url": "/feedback" },
  //     { "userId": "673293e08fafad51f1dd72eb", "message": "New app version available.", "url": "/updates" },
  //     { "userId": "673293e08fafad51f1dd72f3", "message": "Share your latest thoughts!", "url": "/create" },
  //     { "userId": "673293e08fafad51f1dd72ee", "message": "Bug report received.", "url": "/support" },
  //     { "userId": "673293e08fafad51f1dd72fe", "message": "Discover trending content.", "url": "/trending" },
  //     { "userId": "673293e08fafad51f1dd72f0", "message": "Profile milestone reached.", "url": "/milestones" }
  //   ]
    
  // )

  // return NextResponse.json({ insertManyNot }, { status: 200 });
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
      $or: [{ userId }, { message }, { url }],
    });

    if (existingNotification) {
      return NextResponse.json(
        { message: "Notification already exists" },
        { status: 400 }
      );
    }
    const notification = await Notification.create({ userId, message, url });
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { message: "userId is required" },
      { status: 400 }
    );
  }
  const decodeduserId = decodeURIComponent(userId);
  try {
    await dbConnect();
    const notifications = await Notification.findOne({ userId: decodeduserId });
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
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
