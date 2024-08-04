'use client';

import { useEffect } from 'react';
import logger from '@/shared/lib/logger/logger';
import Button from '@/shared/ui/button/Button';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    logger.error(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
