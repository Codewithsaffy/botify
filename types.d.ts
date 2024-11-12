// types.ts

import { Schema } from "mongoose";

// User type

export interface TUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  image: string;
  about?: string;
}

// Follow type
export interface TFollow {
  _id?: string;
  userId: Schema.Types.ObjectId;
  authorId: Schema.Types.ObjectId;
}

// Post type
export interface TPost {
  _id?: string;
  title: string;
  image: string;
  description: string;
  slug: string;
  category: String;
  authorId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Comment type
export interface TComment {
  _id?: string;
  comment: string;
  postId: Schema.Types.ObjectId;
  commenterId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Like type
export interface TLike {
  _id?: string;
  postId: Schema.Types.ObjectId;
  likerId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
