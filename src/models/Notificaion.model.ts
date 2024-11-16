import mongoose, { Schema } from "mongoose";
import { TNotification } from "../../types";

const NotificationSchema = new Schema<TNotification>(
  {
    message: {
      type: String,
      required: [true, "Notification is required"],
      trim: true,
      minlength: [1, "Notification must not be empty"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Associated post is required"],
    },
    url: {
      type: String,
      required: [true, "Notificationer is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notification =
  (mongoose.models.Notification as mongoose.Model<TNotification>) ??
  mongoose.model<TNotification>("Notification", NotificationSchema);
