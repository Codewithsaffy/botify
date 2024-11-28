// types.ts

import { Schema } from "mongoose";


export interface TUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  image: string;
  thumbnail?: string;
  about?: string;
}

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
  category: string;
  authorId: Schema.Types.ObjectId | string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TNotification {
  _id?: string;
  userId: Schema.Types.ObjectId;
  message: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CardData {
  _id: string;
  title: string;
  image: string;
  description: string;
  content?: string;
  slug: string;
  author: {
    _id?: string;
    image: string;
    username: string;
    name: string;
  };
  publishDate: string;
  createdAt?: string; // ISO date format
  likes: number;
  comments: number;
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

// Define the type for a user result
type UserResult = {
  type: "user";
  name: string;
  username: string;
  image: string;
};

// Define the type for a post result
type PostResult = {
  type: "post";
  title: string;
  slug: string;
  image: string;
};

// Union type for the results array
type SearchResult = UserResult | PostResult;

// Array type
export type SearchResults = SearchResult[];

interface Author {
  _id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  image: string;
  description: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  likes: number;
  commentCount: number;
}

interface Commenter {
  _id: string;
  name: string;
  username: string;
  image: string;
}

export interface Comment {
  _id: string;
  comment: string;
  commenter: Commenter;
  createdAt: string;
  updatedAt: string;
  postId: string;
}
