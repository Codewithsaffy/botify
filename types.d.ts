// types.ts

import { Schema } from "mongoose";

// User type

export interface TUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  image: string;
  thumbnail?: string;
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
  category: string;
  authorId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TNotification{
  _id?: string;
  userId: Schema.Types.ObjectId;
  message: string;
  url: string;
  read?: boolean;
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


export interface PostType {
  _id: string; // Assuming MongoDB ObjectId is converted to a string
  title: string;
  image: string;
  description: string;
  slug: string;
  tags: string[];
  authorId: string; // Assuming the authorId is a string, e.g., an ObjectId
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: string; // Adjust the type if `author` has more detailed data (e.g., an object)
  likes: number;
  commentCount: number;
}

