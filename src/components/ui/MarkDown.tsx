"use client"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';


export default function MarkdownRenderer({markdown}:{markdown:string}) {
  const [copyStatus, setCopyStatus] = useState<{ [key: number]: string }>({});

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopyStatus((prev) => ({ ...prev, [index]: 'Copied!' }));
    setTimeout(() => setCopyStatus((prev) => ({ ...prev, [index]: '' })), 2000);
  };

  return (
    <div className="markdown-content prose max-w-none w-[80vw] mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            return !inline && match ? (
              <div className="relative">
                <button
                  className="absolute top-2 right-2 bg-gray-700 text-white py-1 px-2 rounded text-xs hover:bg-gray-600"
                  onClick={() => handleCopyCode(codeString, node.position.start.line)}
                >
                  {copyStatus[node.position.start.line] || 'Copy'}
                </button>
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}