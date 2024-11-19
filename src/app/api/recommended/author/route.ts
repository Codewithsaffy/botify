import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { dbConnect } from "@/helper/dbConnection";

export async function GET(
  req: NextRequest
) {

  try {
    await dbConnect();

      const topAuthors = await User.find({})
        .sort({ followersCount: -1 }) 
        .limit(5)
        .select("name image username about")
        .exec();
      return NextResponse.json({ recommendedAuthors: topAuthors })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
