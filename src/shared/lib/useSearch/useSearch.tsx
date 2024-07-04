import { useEffect, useMemo, useState } from 'react';
import StorageService from '../storage/StorageService';

export default function useSearch() {
  const storageService = useMemo(() => new StorageService('searchTerm'), []);

  const [searchTerm, setSearchTerm] = useState(storageService.getData() || '');

  useEffect(() => {
    storageService.setData(searchTerm);
  }, [searchTerm, storageService]);
  return { searchTerm, setSearchTerm };
}
