import Layout from '@/components/layout/Layout';
import CardDetails from '@/components/main/components/cardDetails/CardDetails';
import Main from '@/components/main/ui/Main';
import { Spacecraft, SpacecraftsResponse } from '@/entities/spacecraft/models';
import { getSpacecraft, getSpacecrafts } from '@/shared/api/services';
import getStringParam from '@/shared/lib/getStringParam/getStringParam';
import { GetServerSideProps } from 'next';

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
  console.log('spacecraft: ', spacecraft);
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params!;
//   const res = await fetch(`https://api.example.com/spacecraft/${id}`);
//   const spacecraft = await res.json();

//   if (!spacecraft) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { spacecraft },
//   };
// };
