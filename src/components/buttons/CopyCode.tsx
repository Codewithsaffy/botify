"use client";

import React, { useState } from "react";

interface CopyCodeProps {
  codeString: string;
  node: any;
}

const CopyCode: React.FC<CopyCodeProps> = ({ codeString, node }) => {
  const [copyStatus, setCopyStatus] = useState<string>("");

  // Extract a unique identifier for copy status (fallback to default if not available)
  const uniqueKey = node?.position?.start?.line || Math.random();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopyStatus("Copied!");

    // Reset copy status after 2 seconds
    setTimeout(() => setCopyStatus(""), 2000);
  };

  return (
    <button
      className="absolute top-2 right-2 bg-gray-700 text-white py-1 px-3 rounded text-xs hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
      onClick={handleCopyCode}
      aria-label="Copy code"
    >
      {copyStatus || "Copy"}
    </button>
  );
};

export default CopyCode;
