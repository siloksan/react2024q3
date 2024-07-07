import { useEffect, useMemo, useState } from 'react';
import StorageService from '../storage/StorageService';
import StorageKeys from './types/storageKeys';

export default function useStorage(key: StorageKeys) {
  const storageService = useMemo(() => new StorageService(key), [key]);

  const [dataStorage, setDataStorage] = useState(storageService.getData() || '');

  useEffect(() => {
    storageService.setData(dataStorage);
  }, [dataStorage, storageService]);
  return { dataStorage, setDataStorage };
}
