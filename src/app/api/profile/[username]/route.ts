import { dbConnet } from "@/helper/dbConnection";
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
    await dbConnet();
    const userProfileData = await User.aggregate([
      { $match: { username: username } },

      // Look up posts created by the user
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "authorId",
          as: "posts",
        },
      },

      // Add a field for the number of posts
      {
        $addFields: {
          postCount: { $size: "$posts" },
        },
      },

      // Lookup followers for the user
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },

      // Lookup following users (users whom this user is following) with only `image` and `username` fields
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "followingId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            { $unwind: "$userDetails" },
            {
              $project: {
                _id: "$userDetails._id",
                image: "$userDetails.image",
                username: "$userDetails.username",
              },
            },
          ],
        },
      },

      // Add a field for the number of followers and following
      {
        $addFields: {
          followerCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
        },
      },

      // Unwind posts to process each post separately
      { $unwind: { path: "$posts", preserveNullAndEmptyArrays: true } },

      // Lookup likes on each post
      {
        $lookup: {
          from: "likes",
          localField: "posts._id",
          foreignField: "postId",
          as: "posts.likes",
        },
      },

      // Lookup comments on each post and count them
      {
        $lookup: {
          from: "comments",
          localField: "posts._id",
          foreignField: "postId",
          as: "posts.comments",
        },
      },
      {
        $addFields: {
          "posts.commentCount": { $size: "$posts.comments" },
        },
      },

      // Regroup posts back into an array
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          username: { $first: "$username" },
          email: { $first: "$email" },
          image: { $first: "$image" },
          postCount: { $first: "$postCount" },
          followerCount: { $first: "$followerCount" },
          followingCount: { $first: "$followingCount" },
          followers: { $first: "$followers" },
          following: { $first: "$following" },
          posts: {
            $push: {
              _id: "$posts._id",
              title: "$posts.title",
              image: "$posts.image",
              description: "$posts.description",
              slug: "$posts.slug",
              category: "$posts.category",
              createdAt: "$posts.createdAt",
              updatedAt: "$posts.updatedAt",
              likes: { $size: "$posts.likes" },
              commentCount: "$posts.commentCount",
            },
          },
        },
      },

      // Project final fields to include in the response
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          image: 1,
          postCount: 1,
          followerCount: 1,
          followingCount: 1,
          followers: 1,
          following: 1,
          posts: 1,
        },
      },
    ]);
    if (userProfileData) {
      return NextResponse.json(userProfileData, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {}
}
