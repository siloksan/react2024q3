import { renderHook } from '@testing-library/react';
import { useQueryString } from './useQueryString';

vi.mock('next/navigation', () => {
  const queryParams = new URLSearchParams('name=value&page=1');
  return {
    useSearchParams: vi.fn().mockReturnValue(queryParams),
  };
});

describe('useQueryString', () => {
  const initialParams = new URLSearchParams('name=value&page=1');
  it('should return initial searchParams', () => {
    const { result } = renderHook(() => useQueryString());

    expect(result.current.searchParams.toString()).toBe(initialParams.toString());
  });

  it('should create query string with new parameters', () => {
    const { result } = renderHook(() => useQueryString());
    const newParams = { key: 'value' };

    const queryString = result.current.createQueryString(newParams);

    expect(queryString).toBe('name=value&page=1&key=value');
  });
});
