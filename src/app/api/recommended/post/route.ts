import { NextRequest, NextResponse } from "next/server";
import { Schema } from "mongoose";
import { Follow } from "@/models/Follow.model";
import { Post } from "@/models/Post.model";
import { User } from "@/models/User.model";

// Define the recommendation logic
export async function GET(req: NextRequest) {
  try {
    // Extract userId from the query parameters
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Step 1: Get the posts liked by the user and calculate the most interacted authors
    const userLikes = await Post.aggregate([
      { $match: { likerId: new Schema.Types.ObjectId(userId) } },
      { $group: { _id: "$authorId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Fetch top 5 authors/posts they interacted with
    ]);

    const popularAuthors = userLikes.map((like) => like._id); // Most liked authors' IDs

    let recommendedPosts = [];

    if (popularAuthors.length > 0) {
      // If the user has liked posts, fetch posts from popular authors
      recommendedPosts = await Post.aggregate([
        { $match: { authorId: { $in: popularAuthors } } }, // Filter by popular authors
        { $sort: { createdAt: -1 } }, // Sort by most recent
        { $limit: 5 }, // Limit to 5 recommendations
        {
          $lookup: {
            from: "users", // Reference to the User collection
            localField: "authorId", // Field in the Post collection
            foreignField: "_id", // Field in the User collection
            as: "authorDetails", // Name of the new field containing author details
          },
        },
        {
          $unwind: "$authorDetails", // Flatten the array returned by $lookup
        },
        {
          $project: {
            title: 1,
            slug: 1,
            "authorDetails.name": 1,
            "authorDetails.username": 1,
            "authorDetails.image": 1,
          },
        },
      ]);
    } else {
      // Step 2: If no posts have been liked, show trending posts or posts from followed authors
      const userFollows = await Follow.find({ userId }).exec();
      const followedAuthorsIds = userFollows.map((follow) => follow.authorId);

      if (followedAuthorsIds.length > 0) {
        // Show posts from followed authors if the user follows any
        recommendedPosts = await Post.aggregate([
          { $match: { authorId: { $in: followedAuthorsIds } } }, // Posts from followed authors
          { $sort: { createdAt: -1 } }, // Sort by most recent
          { $limit: 5 }, // Limit to 5 recommendations
          {
            $lookup: {
              from: "users", // Reference to the User collection
              localField: "authorId", // Field in the Post collection
              foreignField: "_id", // Field in the User collection
              as: "authorDetails", // Name of the new field containing author details
            },
          },
          {
            $unwind: "$authorDetails", // Flatten the array returned by $lookup
          },
          {
            $project: {
              title: 1,
              slug: 1,
              "authorDetails.name": 1,
              "authorDetails.username": 1,
              "authorDetails.image": 1,
            },
          },
        ]);
      } else {
        // If the user doesn't follow any authors, show trending posts (most liked posts)
        recommendedPosts = await Post.aggregate([
          { $sort: { likes: -1 } }, // Sort by most liked posts
          { $limit: 5 }, // Limit to 5 trending posts
          {
            $lookup: {
              from: "users", // Reference to the User collection
              localField: "authorId", // Field in the Post collection
              foreignField: "_id", // Field in the User collection
              as: "authorDetails", // Name of the new field containing author details
            },
          },
          {
            $unwind: "$authorDetails", // Flatten the array returned by $lookup
          },
          {
            $project: {
              title: 1,
              slug: 1,
              "authorDetails.name": 1,
              "authorDetails.username": 1,
              "authorDetails.image": 1,
            },
          },
        ]);
      }
    }

    // Step 3: Format the response
    const recommendations = recommendedPosts.map((post) => ({
      title: post.title,
      slug: post.slug,
      author: {
        name: post.authorDetails.name,
        username: post.authorDetails.username,
        image: post.authorDetails.image,
      },
    }));

    return NextResponse.json({ recommendedPosts: recommendations });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
