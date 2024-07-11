import { useEffect, useRef, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import useStorageSearchParams from 'shared/lib/useCustomSearchParams/useCustomSearchParams';
import { SpacecraftsResponse } from 'entities/spacecraft/models';
import Payload from 'shared/api/types/apiTypes';
import { getSpaceCrafts } from 'shared/api/axiosMethods';

import Loader from 'shared/ui/loader/Loader';
import SearchBox from 'shared/ui/search/SearchBox';
import Pagination from 'widgets/pagination';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';
import CardDetails from '../components/cardDetails/cardDetails';

export default function Main() {
  const pageSize = 5;
  const { dataStorage, setStorageSearchParams } = useStorageSearchParams();

  const [data, setData] = useState<SpacecraftsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);

  const updateData = async (searchQuery: string = '', pageNumber?: number) => {
    setData(null);
    const options: AxiosRequestConfig = {
      params: {
        pageSize,
        ...(pageNumber ? { pageNumber: pageNumber - 1 } : {}),
      },
    };
    const payload: Payload = {
      name: searchQuery,
      registry: '',
      status: '',
    };
    try {
      const response = await getSpaceCrafts('spacecraft/search', payload, options);
      setData(response);
      setStorageSearchParams('page', (response.page.pageNumber + 1).toString());
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const closeDetails = () => {
    setStorageSearchParams('uid', '');
    setCardId(null);
  };

  const openDetails = (id: string) => {
    setCardId(id);
  };

  const firstLoad = () => {
    const page = dataStorage.page ? Number(dataStorage.page) : undefined;
    const searchTerm = dataStorage.name ? dataStorage.name : undefined;
    updateData(searchTerm, page);
    if (dataStorage.uid) openDetails(dataStorage.uid);
  };

  const savedCallback = useRef(firstLoad);

  // This trick is necessary to avoid re-render every time when search input is changed
  useEffect(() => {
    savedCallback.current();
  }, []);

  const pagination = data ? (
    <Pagination
      currentPage={dataStorage.page ? Number(dataStorage.page) : 1}
      itemPerPage={pageSize}
      totalItems={data.page.totalElements}
      searchTerm={dataStorage.name ? dataStorage.name : ''}
      updateData={updateData}
      closeDetails={closeDetails}
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
        searchTerm={dataStorage.name ? dataStorage.name : ''}
        setStorageSearchParams={setStorageSearchParams}
        closeDetails={closeDetails}
      />
      <div className={styles.content}>
        <div className={styles.list}>
          {data ? (
            <CardList spacecrafts={data.spacecrafts} openDetails={openDetails} dataStorage={dataStorage} />
          ) : (
            <Loader />
          )}
        </div>
        {cardId && (
          <CardDetails id={cardId} closeDetails={closeDetails} setStorageSearchParams={setStorageSearchParams} />
        )}
      </div>
    </>
  );
}
