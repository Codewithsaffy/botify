import { dbConnet } from "@/helper/dbConnection";
import { Post } from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnet();

  const post = await Post.aggregate(
    [
      {
        $project:{
          _id:1,
          title:1
        }
      }
    ]
    
    
    
    )
    return NextResponse.json(post);
  // try {
  //   // Connect to the database
  //   await dbConnet();

  //   // Parse JSON data from the request
  //   const { title, image, description, category, authorId, content, slug } =
  //     await req.json();

  //   // Check for required fields
  //   if (
  //     !title ||
  //     !image ||
  //     !description ||
  //     !category ||
  //     !authorId ||
  //     !content ||
  //     !slug
  //   ) {
  //     return NextResponse.json(
  //       { message: "All fields are required" },
  //       { status: 400 }
  //     );
  //   }

  //   // Create and save the post
  //   const post = await Post.create({
  //     title,
  //     image,
  //     description,
  //     category,
  //     authorId,
  //     content,
  //     slug,
  //   });

  //   // Return success response
  //   return NextResponse.json(
  //     { message: "Post created successfully", post },
  //     { status: 201 }
  //   );
  // } catch (error: any) {
  //   // Log and return error response
  //   console.error("Error creating post:", error);
  //   return NextResponse.json(
  //     { message: "Failed to create post", error: error.message },
  //     { status: 500 }
  //   );
  // }
}

// export async function GET(req: NextRequest) {
//   try {
//     await dbConnet();
//     const posts = await Post.find().populate("authorId");
//     return NextResponse.json({ posts }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }