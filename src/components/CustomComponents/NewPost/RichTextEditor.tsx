import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  setValue: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, setValue }) => {
  useEffect(() => {
    // Make Highlight.js globally available for syntax highlighting
    if (typeof window !== "undefined") {
      (window as any).hljs = hljs;
    }
  }, []);

  // Modules for React-Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header levels
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["code-block"], // Code blocks
      ["link"], // Hyperlinks
      ["clean"], // Clear formatting
    ],
    syntax: true, // Enable syntax highlighting
  };

  // Allowed formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "code-block",
  ];

  return (
    <div className="editor-container">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="Write your content here..."
        className="custom-quill-editor"
      />
    </div>
  );
};

export default RichTextEditor;
