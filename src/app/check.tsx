"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically load ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Quill styles
import "prismjs/themes/prism.css"; // Prism.js styles for syntax highlighting
import Prism from "prismjs"; // Import Prism.js

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState(""); // Stores HTML content

  // Custom ReactQuill Toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Heading options
      ["bold", "italic", "underline", "blockquote"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link", "image", "code-block"], // Links, images, and code block
    ],
    syntax: true, // Enable syntax highlighting
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Submit the blog data
      const response = await axios.post("/api/blogs", {
        title,
        author,
        content,
      });
      console.log("Blog submitted:", response.data);
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a Blog
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-600"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600"
            >
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              modules={modules}
              className="bg-white rounded-md border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
