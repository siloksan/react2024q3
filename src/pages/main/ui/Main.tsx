import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
import Loader from 'shared/ui/loader/Loader';
import SearchBox from 'shared/ui/search/SearchBox';
import Pagination from 'widgets/pagination';
import useStorage from 'shared/lib/useStorage/useStorage';
import { useGetItemsQuery } from 'shared/api/services';
import { SpaceCraftsRequestParams } from 'shared/api/types';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';

export default function Main() {
  const pageSize = 5;
  const { searchParams } = useStorage();

  const [pageNumber, setPageNumber] = useState<number>(() => {
    const currentPage = searchParams.get('page');
    return currentPage ? Number(currentPage) : 1;
  });

  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('name') || '');

  const requestParams: SpaceCraftsRequestParams = {
    endpoint: 'spacecraft/search',
    payload: {
      name: searchTerm,
      registry: '',
      status: '',
    },
    params: { pageNumber: pageNumber - 1, pageSize },
  };

  const { data, error, isLoading } = useGetItemsQuery(requestParams);

  const pagination = data ? (
    <Pagination
      currentPage={pageNumber}
      itemPerPage={pageSize}
      totalItems={data.page.totalElements}
      setPageNumber={setPageNumber}
    />
  ) : null;

  if (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      <div className={styles.pagination}>{pagination}</div>
      <SearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm} setPageNumber={setPageNumber} />
      <div className={styles.content}>
        <div className={styles.list}>
          {!isLoading && data ? <CardList spacecrafts={data.spacecrafts} /> : <Loader />}
        </div>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}
