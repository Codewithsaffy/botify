"use client";

import { useRouter } from "next/navigation";
import { AiOutlineWarning } from "react-icons/ai";

export default function GlobalError() {
  const router = useRouter();
  const handleReset = () => {
    router.push("/");
  };
  return (
    // global-error must include html and body tags
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="flex flex-col items-center">
            {/* Icon */}
            <AiOutlineWarning size={48} className="text-yellow-500" />

            {/* Heading */}
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              Something went wrong!
            </h2>

            {/* Error Description */}
            <p className="mt-2 text-gray-600 text-center">
              We encountered an unexpected error. Please try again or contact
              support if the issue persists.
            </p>

            {/* Try Again Button */}
            <button
              onClick={() => handleReset()}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
