import mongoose, { Schema } from "mongoose";
import { TUser } from "../../types";

const UserSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    image: {
      type: String,
      required: [true, "User image is required"],
      trim: true,
    },
    about: {
      type: String,
      maxlength: [200, "About section must not exceed 200 characters"],
      min: [0, "About section cannot be negative"],
    },
  },
  { timestamps: true }
);

export const User =
  (mongoose.models.User as mongoose.Model<TUser>) ??
  mongoose.model<TUser>("User", UserSchema);
