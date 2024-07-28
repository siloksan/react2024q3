import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import StorageService from '../storage/StorageService';

export default function useStorage() {
  const storageService = useMemo(() => new StorageService(), []);

  const [storageData, setStorageData] = useState<string>(storageService.getData('searchParams') || '');
  const [searchParams, setSearchParams] = useSearchParams();

  const firstLoad = () => {
    if (searchParams.size > 0) {
      const paramsString = searchParams.toString();
      setStorageData(paramsString);
      storageService.setData('searchParams', paramsString);
    } else if (storageData) {
      const params = new URLSearchParams(storageData);
      setSearchParams(params);
    }
  };

  const savedCallback = useRef(firstLoad);

  useEffect(() => {
    savedCallback.current();
  }, []);

  useEffect(() => {
    storageService.setData('searchParams', storageData);
  }, [storageData, storageService]);

  const setData = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
    setStorageData(searchParams.toString());
  };

  return { searchParams, setData };
}
