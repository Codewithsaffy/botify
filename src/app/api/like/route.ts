import { dbConnect } from "@/helper/dbConnection";
import { Like } from "@/models/Likes.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // await dbConnect();
  // const like = await Like.insertMany([
  //   { postId: "6732966b8fafad51f1dd7302", likerId: "673293e08fafad51f1dd72eb" },
  //   { postId: "6732966b8fafad51f1dd7303", likerId: "673293e08fafad51f1dd72ec" },
  //   { postId: "6732966b8fafad51f1dd7304", likerId: "673293e08fafad51f1dd72ed" },
  //   { postId: "6732966b8fafad51f1dd7305", likerId: "673293e08fafad51f1dd72ee" },
  //   { postId: "673297818fafad51f1dd7307", likerId: "673293e08fafad51f1dd72ef" },
  //   { postId: "673297818fafad51f1dd7308", likerId: "673293e08fafad51f1dd72f0" },
  //   { postId: "673297818fafad51f1dd7309", likerId: "673293e08fafad51f1dd72f1" },
  //   { postId: "673297818fafad51f1dd730a", likerId: "673293e08fafad51f1dd72f2" },
  //   { postId: "673297818fafad51f1dd730b", likerId: "673293e08fafad51f1dd72f3" },
  //   { postId: "673297818fafad51f1dd730c", likerId: "673293e08fafad51f1dd72f4" },
  //   { postId: "673297818fafad51f1dd730d", likerId: "673293e08fafad51f1dd72f5" },
  //   { postId: "673297818fafad51f1dd730e", likerId: "673293e08fafad51f1dd72f6" },
  //   { postId: "673297818fafad51f1dd730f", likerId: "673293e08fafad51f1dd72f7" },
  //   { postId: "673297818fafad51f1dd7310", likerId: "673293e08fafad51f1dd72f8" },
  //   { postId: "673297818fafad51f1dd7311", likerId: "673293e08fafad51f1dd72f9" },
  //   { postId: "673297818fafad51f1dd7312", likerId: "673293e08fafad51f1dd72fa" },
  //   { postId: "673297818fafad51f1dd7313", likerId: "673293e08fafad51f1dd72fb" },
  //   { postId: "673297818fafad51f1dd7314", likerId: "673293e08fafad51f1dd72fc" },
  //   { postId: "673297818fafad51f1dd7315", likerId: "673293e08fafad51f1dd72fd" },
  //   { postId: "673297818fafad51f1dd7316", likerId: "673293e08fafad51f1dd72fe" },
  //   { postId: "673297818fafad51f1dd7317", likerId: "67328c388fafad51f1dd72d6" },
  //   { postId: "67329a968fafad51f1dd7325", likerId: "673293e08fafad51f1dd72eb" },
  //   { postId: "67329a968fafad51f1dd7326", likerId: "673293e08fafad51f1dd72ec" },
  //   { postId: "67329a968fafad51f1dd7327", likerId: "673293e08fafad51f1dd72ed" },
  //   { postId: "67329a968fafad51f1dd7328", likerId: "673293e08fafad51f1dd72ee" },
  //   { postId: "67329a968fafad51f1dd7329", likerId: "673293e08fafad51f1dd72ef" },
  //   { postId: "67329a968fafad51f1dd732a", likerId: "673293e08fafad51f1dd72f0" },
  //   { postId: "67329a968fafad51f1dd732b", likerId: "673293e08fafad51f1dd72f1" },
  //   { postId: "67329a968fafad51f1dd732c", likerId: "673293e08fafad51f1dd72f2" },
  //   { postId: "67329a968fafad51f1dd732d", likerId: "673293e08fafad51f1dd72f3" },
  //   { postId: "67329a968fafad51f1dd732e", likerId: "673293e08fafad51f1dd72f4" },
  //   { postId: "67329a968fafad51f1dd732f", likerId: "673293e08fafad51f1dd72f5" },
  //   { postId: "67329b888fafad51f1dd7331", likerId: "673293e08fafad51f1dd72f6" },
  //   { postId: "67329b888fafad51f1dd7332", likerId: "673293e08fafad51f1dd72f7" },
  //   { postId: "67329b888fafad51f1dd7333", likerId: "673293e08fafad51f1dd72f8" },
  //   { postId: "673297818fafad51f1dd7315", likerId: "673293e08fafad51f1dd72f9" },
  //   { postId: "67329b888fafad51f1dd7329", likerId: "673293e08fafad51f1dd72fa" },
  //   { postId: "673297818fafad51f1dd7310", likerId: "673293e08fafad51f1dd72fb" },
  //   { postId: "6732966b8fafad51f1dd7301", likerId: "673293e08fafad51f1dd72fc" },
  //   { postId: "67329a968fafad51f1dd7325", likerId: "673293e08fafad51f1dd72fd" },
  //   { postId: "67329b888fafad51f1dd7331", likerId: "673293e08fafad51f1dd72fe" },
  //   { postId: "673297818fafad51f1dd7317", likerId: "67328c388fafad51f1dd72d6" },
  //   { postId: "67329a968fafad51f1dd7326", likerId: "673293e08fafad51f1dd72eb" },
  //   { postId: "673297818fafad51f1dd730f", likerId: "673293e08fafad51f1dd72ec" },
  //   { postId: "67329a968fafad51f1dd732c", likerId: "673293e08fafad51f1dd72ed" },
  //   { postId: "673297818fafad51f1dd7307", likerId: "673293e08fafad51f1dd72ee" },
  //   { postId: "67329b888fafad51f1dd7328", likerId: "673293e08fafad51f1dd72ef" },
  //   { postId: "673297818fafad51f1dd7309", likerId: "673293e08fafad51f1dd72f0" },
  // ]);
  try {
    const { postId, likerId } = await req.json();
    if (!postId || !likerId) {
      return NextResponse.json(
        { message: "Both postId and likerId are required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const existingLike = await Like.findOne({ $or: [{ postId }, { likerId }] });

    if (existingLike) {
      const removeLike = await Like.findByIdAndDelete(existingLike._id);
      return NextResponse.json(
        {isLike: false , message: "Like removed" },
        { status: 200 }
      );
    }

    const likeRecord = await Like.create({ postId, likerId });
    await likeRecord.save();
    return NextResponse.json(
      { isLike: true , message: "Like created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in like request:", error);
    return NextResponse.json(
      { message: "Internal Server Error",  },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    //  const { _id } = await req.json();
    await dbConnect();
    const likes = await Like.find();
    if (!likes) {
      return NextResponse.json(
        { message: "Like relationship not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ likes }, { status: 200 });
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
    const { _id } = await req.json();
    if (!_id) {
      return NextResponse.json(
        { message: "Both postId and likerId are required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const like = await Like.findByIdAndDelete(_id);
    if (!like) {
      return NextResponse.json(
        { message: "Like relationship not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(like, { status: 200 });
  } catch (error) {
    console.error("Error in unlike request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
