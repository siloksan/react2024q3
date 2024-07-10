import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import useStorage from '../useStorage/useStorage';
import { SetStorageSearchParams } from '../types/setStorageSearchParams';

export default function useStorageSearchParams() {
  const { dataStorage, setItem } = useStorage();

  const initialSearchParams = useMemo(() => new URLSearchParams(), []);
  Object.entries(dataStorage).forEach(([key, value]) => {
    if (value) {
      initialSearchParams.set(key, value);
    }
  });

  useEffect(() => {
    Object.entries(dataStorage).forEach(([key, value]) => {
      if (value) {
        initialSearchParams.set(key, value);
      }
    });
  }, [dataStorage, initialSearchParams]);

  const [searchParams, setSearchParams] = useSearchParams(initialSearchParams);
  const setStorageSearchParams: SetStorageSearchParams = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
    setItem(key, value);
  };

  return { dataStorage, setStorageSearchParams };
}
