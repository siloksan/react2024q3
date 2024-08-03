import { Suspense } from 'react';
import Main from '@/components/main';
import { SearchParams } from '@/shared/types';
import CardDetailsWrapper from '@/components/main/components/cardDetails/CardDetailsWrapper';
import Loader from '@/shared/ui/loader/Loader';

interface Props {
  searchParams: SearchParams;
  params: {
    spacecraftId: string;
  };
}

export default function Page({ searchParams, params }: Props) {
  return (
    <Main searchParams={searchParams}>
      <Suspense fallback={<Loader />}>
        <CardDetailsWrapper spacecraftId={params.spacecraftId} />
      </Suspense>
    </Main>
  );
}
