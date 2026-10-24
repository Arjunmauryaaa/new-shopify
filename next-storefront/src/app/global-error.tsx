"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ed] px-6 text-center text-[#0e0e0f]">
        <p className="text-2xl font-medium">Something went wrong.</p>
        <p className="mt-3 max-w-sm text-sm text-[#4a4944]">
          The application hit an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex h-12 items-center justify-center bg-[#0e0e0f] px-6 text-xs font-medium tracking-wide text-[#f7f4ed] uppercase"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
