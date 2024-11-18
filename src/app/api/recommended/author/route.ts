import { NextRequest, NextResponse } from "next/server";
import { Schema } from "mongoose";
import { Follow } from "@/models/Follow.model";
import { Post } from "@/models/Post.model";
import { User } from "@/models/User.model";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const userFollows = await Follow.find({ userId }).exec();
    const followedAuthorsIds = userFollows.map((follow) => follow.authorId);

    const userLikes = await Post.aggregate([
      { $match: { likerId: new Schema.Types.ObjectId(userId) } },
      { $group: { _id: "$authorId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const popularCategories = userLikes.map((like) => like._id); 

    if (followedAuthorsIds.length === 0 && popularCategories.length === 0) {
      const recommendedAuthors = await User.find({}).limit(5).select('name image username about').exec();
      return NextResponse.json({ recommendedAuthors });
    }

    // Build the query to exclude followed authors and recommend based on popular categories
    const query = {
      $and: [
        { _id: { $nin: followedAuthorsIds } }, 
        { _id: { $in: popularCategories.length > 0 ? popularCategories : followedAuthorsIds } },
      ],
    };

    // Fetch recommended authors with specific fields
    const recommendedAuthors = await User.find(query).select('name image username about').exec();

    return NextResponse.json({ recommendedAuthors });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
