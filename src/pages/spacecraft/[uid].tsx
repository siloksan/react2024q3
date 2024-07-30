import { GetServerSideProps } from 'next';

import CardDetails from '@/components/main/components/cardDetails/CardDetails';
import Main from '@/components/main/ui/Main';
import { Spacecraft, SpacecraftsResponse } from '@/entities/spacecraft/models';
import { getSpacecraft, getSpacecrafts } from '@/shared/api/services';

import Layout from '@/components/layout/Layout';

interface Props {
  spacecraft: Spacecraft;
  spacecraftsRes: SpacecraftsResponse
}

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const spacecraftsRes = await getSpacecrafts(context)
  const spacecraft = await getSpacecraft(context)  

  return { props: { spacecraft, spacecraftsRes } }
})

export default function CardDetailsWrapper({ spacecraft }: Omit<Props, 'spacecraftsRes'>) {
  return (
    <>
      <CardDetails spacecraft={spacecraft} />
    </>
  );
}

CardDetailsWrapper.getLayout = (children: React.ReactNode, { spacecraftsRes }: Omit<Props, 'spacecraft'>) => (
  <Layout>
    <Main spacecraftsRes={spacecraftsRes}>{children}</Main>
  </Layout>
);
