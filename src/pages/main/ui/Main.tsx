import { useEffect, useRef, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { Outlet } from 'react-router-dom';

import Payload from 'shared/api/types/apiTypes';
import { SpacecraftsResponse } from 'entities/spacecraft/models';
import { getSpaceCrafts } from 'shared/api/axiosMethods';

import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
import Loader from 'shared/ui/loader/Loader';
import SearchBox from 'shared/ui/search/SearchBox';
import Pagination from 'widgets/pagination';
import useStorage from 'shared/lib/useStorage/useStorage';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';

export default function Main() {
  const pageSize = 5;
  const { searchParams, setKeyAndValue } = useStorage();

  const [data, setData] = useState<SpacecraftsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pageDataString = searchParams.get('page');
  const nameDataString = searchParams.get('name');
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
      setKeyAndValue('page', (response.page.pageNumber + 1).toString());
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const firstLoad = () => {
    const page = pageDataString ? Number(pageDataString) : undefined;
    const searchTerm = nameDataString || undefined;
    updateData(searchTerm, page);
  };

  const savedCallback = useRef(firstLoad);

  // This trick is necessary to avoid re-render every time when search input is changed
  useEffect(() => {
    savedCallback.current();
  }, []);

  const pagination = data ? (
    <Pagination
      currentPage={pageDataString ? Number(pageDataString) : 1}
      itemPerPage={pageSize}
      totalItems={data.page.totalElements}
      searchTerm={nameDataString || ''}
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
      <SearchBox updateData={updateData} searchTerm={nameDataString || ''} setStorageSearchParams={setKeyAndValue} />
      <div className={styles.content}>
        <div className={styles.list}>{data ? <CardList spacecrafts={data.spacecrafts} /> : <Loader />}</div>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}
