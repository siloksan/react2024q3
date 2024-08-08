import { ParsedUrlQuery } from 'querystring';

export default function getStringParam(query: ParsedUrlQuery | undefined, key: string): string {
  return query && key in query && typeof query[key] === 'string' ? query[key] : '';
}
