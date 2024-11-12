import mongoose, { Schema } from "mongoose";
import { TLike } from "../../types";

const LikeSchema = new Schema<TLike>(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    likerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Liker is required"],
    },
  },
  { timestamps: true }
);

export const Like =
  (mongoose.models.Like as mongoose.Model<TLike>) ??
  mongoose.model<TLike>("Like", LikeSchema);
