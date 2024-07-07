import { useEffect, useRef, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import getData from 'shared/api/axiosMethods';
import Loader from 'shared/ui/loader/Loader';
import StorageKeys from 'shared/lib/useSearch/types/storageKeys';

import SearchBox from 'shared/ui/search/SearchBox';

import Payload from 'shared/api/types/apiTypes';

import { SpacecraftsResponse } from 'entities/spacecraft/models';
import Pagination from 'widgets/pagination';
import useSearch from 'shared/lib/useSearch';
import SpaceCraftDetails from '../components/SpaceCraftDetails/SpaceCraftDetails';
import styles from './Main.module.scss';

export default function Main() {
  const pageSize = 10;
  const { dataStorage: searchTerm, setDataStorage: setSearchTerm } = useSearch(StorageKeys.searchTerm);
  const { dataStorage: currentPage, setDataStorage: setCurrentPage } = useSearch(StorageKeys.currentPage);

  const [data, setData] = useState<SpacecraftsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (searchQuery: string, pageNumber: number | string = '') => {
    setSearchTerm(searchQuery);
    setData(null);
    const options: AxiosRequestConfig = {
      params: {
        pageSize,
        pageNumber,
      },
    };
    const payload: Payload = {
      name: searchQuery,
      registry: '',
      status: '',
    };
    try {
      const response = await getData('spacecraft/search', payload, options);
      setData(response);
      setCurrentPage(response.page.pageNumber.toString());
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const firstLoad = () => {
    const page = currentPage !== '' ? Number(currentPage) : '';
    updateData(searchTerm, page);
  };

  const savedCallback = useRef(firstLoad);

  // This trick is necessary to avoid re-render every time when search input is changed
  useEffect(() => {
    savedCallback.current();
  }, []);

  let spacecraftsList = data ? (
    data.spacecrafts.map((spacecraft) => {
      return <SpaceCraftDetails spacecraft={spacecraft} key={spacecraft.uid} />;
    })
  ) : (
    <Loader />
  );

  spacecraftsList =
    data && data.spacecrafts.length === 0 ? (
      <h3 className={styles.not_found}>No spacecrafts found</h3>
    ) : (
      spacecraftsList
    );

  const pagination = data ? (
    <Pagination
      currentPage={Number(currentPage) + 1}
      itemPerPage={pageSize}
      totalItems={data.page.totalElements}
      searchTerm={searchTerm}
      updateData={updateData}
    />
  ) : null;

  if (error) {
    throw new Error(error);
  }
  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      <div className={styles.pagination}>{pagination}</div>
      <SearchBox
        updateData={updateData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={(p) => setCurrentPage(p.toString())}
      />
      <ul className={styles.list}>{spacecraftsList}</ul>
    </>
  );
}
