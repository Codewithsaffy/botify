import mongoose, { Schema } from "mongoose";
import { TFollow } from "../../types";

const FollowSchema = new Schema<TFollow>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Follower is required"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Following is required"],
    },
  },
  { timestamps: true }
);

export const Follow =
  (mongoose.models.Follow as mongoose.Model<TFollow>) ??
  mongoose.model<TFollow>("Follow", FollowSchema);
