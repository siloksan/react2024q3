import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import CardDetails from '~/components/main/components/cardDetails/CardDetails';
import { getSpacecraft } from '~/shared/api/services';

export default function CardDetailsWrapper() {
  const { spacecraft } = useLoaderData<typeof loader>();
  return <CardDetails spacecraft={spacecraft} />;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { uid } = params;
  if (!uid) {
    throw new Error('Spacecraft id is required!');
  }
  const spacecraft = await getSpacecraft({ uid });
  if (!spacecraft) {
    throw new Error('Spacecraft not found');
  }
  return json({ spacecraft });
}
