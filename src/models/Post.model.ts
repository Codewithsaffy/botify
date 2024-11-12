import mongoose, { Schema } from "mongoose";
import {  TPost } from "../../types";

const PostSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      // enum: Categories,
      required: [true, "Category is required"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
  },
  { timestamps: true }
);

export const Post =
  (mongoose.models.Post as mongoose.Model<TPost>) ??
  mongoose.model<TPost>("Post", PostSchema);
