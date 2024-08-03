import { Suspense } from 'react';
import Main from '@/components/main';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: Props) {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Main searchParams={searchParams} />
    </Suspense>
  );
}
