import { getSpacecraft } from '@/shared/api/services';
import CardDetails from './CardDetails';

interface Props {
  spacecraftId: string;
}

export default async function CardDetailsWrapper({ spacecraftId }: Props) {
  const spacecraft = await getSpacecraft({ uid: spacecraftId });

  if (!spacecraft) {
    throw new Error('The spacecraft failed to load!');
  }

  return <CardDetails spacecraft={spacecraft} />;
}
