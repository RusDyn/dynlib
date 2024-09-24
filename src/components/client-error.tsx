'use client';

import { useEffect } from 'react';

export default function ClientError({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-lg font-semibold md:text-2xl">Error occurred.</h1>
      </div>
    </main>
  );
}