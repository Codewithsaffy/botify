import { dbConnect } from "@/helper/dbConnection";
import { Comment } from "@/models/Comments.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // await dbConnect();
  // const comment = await Comment.insertMany( 
  //   [
  //     {
  //       "comment": "Great insights!",
  //       "postId": "6732966b8fafad51f1dd7301",
  //       "commenterId": "673293e08fafad51f1dd72eb"
  //     },
  //     {
  //       "comment": "I learned something new here.",
  //       "postId": "6732966b8fafad51f1dd7302",
  //       "commenterId": "673293e08fafad51f1dd72ec"
  //     },
  //     {
  //       "comment": "How do you think this affects us?",
  //       "postId": "6732966b8fafad51f1dd7303",
  //       "commenterId": "673293e08fafad51f1dd72ed"
  //     },
  //     {
  //       "comment": "Fascinating trend.",
  //       "postId": "6732966b8fafad51f1dd7304",
  //       "commenterId": "673293e08fafad51f1dd72ee"
  //     },
  //     {
  //       "comment": "A well-written piece.",
  //       "postId": "6732966b8fafad51f1dd7305",
  //       "commenterId": "673293e08fafad51f1dd72ef"
  //     },
  //     {
  //       "comment": "Thought-provoking article.",
  //       "postId": "673297818fafad51f1dd7307",
  //       "commenterId": "673293e08fafad51f1dd72f0"
  //     },
  //     {
  //       "comment": "Could we see examples?",
  //       "postId": "673297818fafad51f1dd7308",
  //       "commenterId": "673293e08fafad51f1dd72f1"
  //     },
  //     {
  //       "comment": "This is eye-opening!",
  //       "postId": "673297818fafad51f1dd7309",
  //       "commenterId": "673293e08fafad51f1dd72f2"
  //     },
  //     {
  //       "comment": "Super relevant today.",
  //       "postId": "673297818fafad51f1dd730a",
  //       "commenterId": "673293e08fafad51f1dd72f3"
  //     },
  //     {
  //       "comment": "Thanks for this deep dive.",
  //       "postId": "673297818fafad51f1dd730b",
  //       "commenterId": "673293e08fafad51f1dd72f4"
  //     },
  //     {
  //       "comment": "Does anyone disagree?",
  //       "postId": "673297818fafad51f1dd730c",
  //       "commenterId": "673293e08fafad51f1dd72f5"
  //     },
  //     {
  //       "comment": "Good overview of the topic.",
  //       "postId": "673297818fafad51f1dd730d",
  //       "commenterId": "673293e08fafad51f1dd72f6"
  //     },
  //     {
  //       "comment": "I’d like more context here.",
  //       "postId": "673297818fafad51f1dd730e",
  //       "commenterId": "673293e08fafad51f1dd72f7"
  //     },
  //     {
  //       "comment": "Very useful breakdown.",
  //       "postId": "673297818fafad51f1dd730f",
  //       "commenterId": "673293e08fafad51f1dd72f8"
  //     },
  //     {
  //       "comment": "Can we expand on this?",
  //       "postId": "673297818fafad51f1dd7310",
  //       "commenterId": "673293e08fafad51f1dd72f9"
  //     },
  //     {
  //       "comment": "Great compilation of facts.",
  //       "postId": "673297818fafad51f1dd7311",
  //       "commenterId": "673293e08fafad51f1dd72fa"
  //     },
  //     {
  //       "comment": "I’d like to add my opinion.",
  //       "postId": "673297818fafad51f1dd7312",
  //       "commenterId": "673293e08fafad51f1dd72fb"
  //     },
  //     {
  //       "comment": "Is this still accurate?",
  //       "postId": "673297818fafad51f1dd7313",
  //       "commenterId": "673293e08fafad51f1dd72fc"
  //     },
  //     {
  //       "comment": "I had a different experience.",
  //       "postId": "673297818fafad51f1dd7314",
  //       "commenterId": "673293e08fafad51f1dd72fd"
  //     },
  //     {
  //       "comment": "This makes so much sense.",
  //       "postId": "673297818fafad51f1dd7315",
  //       "commenterId": "673293e08fafad51f1dd72fe"
  //     },
  //     {
  //       "comment": "Does it apply in practice?",
  //       "postId": "673297818fafad51f1dd7316",
  //       "commenterId": "673293e08fafad51f1dd72eb"
  //     },
  //     {
  //       "comment": "I feel this perspective is key.",
  //       "postId": "67329a968fafad51f1dd7325",
  //       "commenterId": "673293e08fafad51f1dd72ec"
  //     },
  //     {
  //       "comment": "Let’s discuss more deeply.",
  //       "postId": "67329a968fafad51f1dd7326",
  //       "commenterId": "673293e08fafad51f1dd72ed"
  //     },
  //     {
  //       "comment": "Good case studies included.",
  //       "postId": "67329a968fafad51f1dd7327",
  //       "commenterId": "673293e08fafad51f1dd72ee"
  //     },
  //     {
  //       "comment": "Is this widely accepted?",
  //       "postId": "67329a968fafad51f1dd7328",
  //       "commenterId": "673293e08fafad51f1dd72ef"
  //     }
  //   ]
        
  //     )
  try {
    const { comment, postId, commenterId } = await req.json();
    if (!comment || !postId || !commenterId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const commentRecord = await Comment.create({
      comment,
      postId,
      commenterId,
    });
    
    return NextResponse.json(commentRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
