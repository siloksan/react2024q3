import { useEffect, useMemo, useState } from 'react';
import StorageService from '../storage/StorageService';
import { StorageData, storageKeys } from '../types/storage';
import { SetStorageSearchParams } from '../types/setStorageSearchParams';

export default function useStorage() {
  const storageService = useMemo(() => new StorageService(), []);

  const [dataStorage, setDataStorage] = useState<StorageData>(() => {
    const initialData: StorageData = {
      page: storageService.getData(storageKeys.page),
      name: storageService.getData(storageKeys.name),
      uid: storageService.getData(storageKeys.uid),
    };
    return initialData;
  });

  useEffect(() => {
    Object.keys(dataStorage).forEach((key) => {
      const storageKey = key as keyof StorageData;
      if (dataStorage[storageKey] !== null) {
        storageService.setData(storageKeys[storageKey], dataStorage[storageKey]);
      }
    });
  }, [dataStorage, storageService]);

  const setItem: SetStorageSearchParams = (key, value) => {
    setDataStorage((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return { dataStorage, setItem };
}
