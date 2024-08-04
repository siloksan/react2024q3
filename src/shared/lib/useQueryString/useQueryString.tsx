import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface NewParams {
  [key: string]: string;
}

export function useQueryString() {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (newParams: NewParams) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([name, value]) => {
        params.set(name, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  return { searchParams, createQueryString };
}
