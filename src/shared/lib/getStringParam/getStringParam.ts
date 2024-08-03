import { SearchParams } from '@/shared/types';

export default function getStringParam(searchParams: SearchParams, key: string): string {
  return searchParams && key in searchParams && typeof searchParams[key] === 'string' ? searchParams[key] : '';
}
