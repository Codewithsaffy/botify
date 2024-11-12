import mongoose, { Schema } from "mongoose";
import { TComment } from "../../types";

const CommentSchema = new Schema<TComment>(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      minlength: [1, "Comment must not be empty"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Associated post is required"],
    },
    commenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Commenter is required"],
    },
  },
  { timestamps: true }
);

export const Comment =
  (mongoose.models.Comment as mongoose.Model<TComment>) ??
  mongoose.model<TComment>("Comment", CommentSchema);
