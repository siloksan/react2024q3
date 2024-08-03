import Main from '@/components/main';
import CardDetails from '@/components/main/components/cardDetails/CardDetails';
import { getSpacecraft } from '@/shared/api/services';
import { SearchParams } from '@/shared/types';

interface Props {
  searchParams: SearchParams;
  params: {
    spacecraftId: string;
  };
}

export default async function Page({ searchParams, params }: Props) {
  const spacecraft = await getSpacecraft({ uid: params.spacecraftId });

  if (!spacecraft) {
    throw new Error('The spacecraft failed to load!');
  }

  return (
    <Main searchParams={searchParams}>
      <CardDetails spacecraft={spacecraft} />
    </Main>
  );
}
