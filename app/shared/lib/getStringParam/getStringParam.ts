export default function getStringParam(searchParams: URLSearchParams, key: string): string {
  const value = searchParams.get(key);
  return value || '';
}
