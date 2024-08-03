import Main from '@/components/main';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: Props) {
  return <Main searchParams={searchParams} />;
}
