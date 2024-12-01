'use client'; 

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const goBack = () => {
    window.history.back();  // Go back to the previous page
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {error.message}
        </h2>
        <p className="mt-4 text-center text-sm text-gray-600">
          We’re sorry, an unexpected error occurred. Please try refreshing the page.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Try Again
          </button>
          <button
            onClick={goBack}
            className="rounded-lg bg-gray-600 px-6 py-2 text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400">
          If the problem persists, please contact support.
        </div>
      </div>
    </div>
  );
}
