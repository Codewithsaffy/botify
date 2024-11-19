import React, { useState } from "react";

const CopyCode = ({ codeString, node }: { codeString: string; node: any }) => {
  const [copyStatus, setCopyStatus] = useState<{ [key: number]: string }>({});

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopyStatus((prev) => ({ ...prev, [index]: "Copied!" }));
    setTimeout(() => setCopyStatus((prev) => ({ ...prev, [index]: "" })), 2000);
  };

  return (
    <button
      className="absolute top-2 right-2 bg-gray-700 text-white py-1 px-2 rounded text-xs hover:bg-gray-600"
      onClick={() => handleCopyCode(codeString, node.position.start.line)}
    >
      {copyStatus[node.position.start.line] || "Copy"}
    </button>
  );
};

export default CopyCode;
