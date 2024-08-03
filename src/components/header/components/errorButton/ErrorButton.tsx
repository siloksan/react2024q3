'use client';

import { useState } from 'react';

import Button from '@/shared/ui/button/Button';

function ErrorButton() {
  const [error, setError] = useState(false);
  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error("It seems like you've broken something!");
  }
  return <Button onClick={throwError}>throw error</Button>;
}

export default ErrorButton;
