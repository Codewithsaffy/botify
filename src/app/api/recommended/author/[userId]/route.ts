import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { Follow } from "@/models/Follow.model";
import { Post } from "@/models/Post.model";
import { User } from "@/models/User.model";
import { dbConnect } from "@/helper/dbConnection";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ userId?: string | null | undefined}> }
) {
  const params = await props.params;
  const userId = params?.userId;

  try {
    await dbConnect();

    // If the user is not authenticated or no userId is provided, return top authors
    if (!userId) {
      const topAuthors = await User.find({})
        .sort({ followersCount: -1 }) // Sort by followers or any relevant metric
        .limit(5)
        .select("name image username about")
        .exec();
      return NextResponse.json({ recommendedAuthors: topAuthors });
    }

    // Fetch user-specific data if a userId is provided
    const userFollows = await Follow.find({ userId }).exec();
    const followedAuthorsIds = userFollows.map((follow) => follow.authorId);

    const userLikes = await Post.aggregate([
      { $match: { likerId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$authorId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const popularCategories = userLikes.map((like) => like._id);

    // If no followed authors or popular categories, return top authors
    if (followedAuthorsIds.length === 0 && popularCategories.length === 0) {
      const topAuthors = await User.find({})
        .sort({ followersCount: -1 })
        .limit(5)
        .select("name image username about")
        .exec();
      return NextResponse.json({ recommendedAuthors: topAuthors });
    }

    // Build the query to exclude followed authors and recommend based on popular categories
    const query = {
      $and: [
        { _id: { $nin: followedAuthorsIds } },
        {
          _id: {
            $in:
              popularCategories.length > 0
                ? popularCategories
                : followedAuthorsIds,
          },
        },
      ],
    };

    // Fetch recommended authors based on the query
    let recommendedAuthors = await User.find(query)
      .select("name image username about")
      .exec();

    // If no recommended authors found, fall back to top authors
    if (recommendedAuthors.length === 0) {
      recommendedAuthors = await User.find({})
        .sort({ followersCount: -1 })
        .limit(5)
        .select("name image username about")
        .exec();
    }

    return NextResponse.json({ recommendedAuthors });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
