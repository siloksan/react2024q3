import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
import Loader from 'shared/ui/loader/Loader';
import SearchBox from 'shared/ui/search/SearchBox';
import Pagination from 'widgets/pagination';
import useStorage from 'shared/lib/useStorage/useStorage';
import { useGetItemsQuery } from 'shared/api/services';
import { SpaceCraftsRequestParams } from 'shared/api/types';
import { setSpacecrafts } from 'features/reduxSlices/spacecrafts';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';

export default function Main() {
  const pageSize = 5;
  const { searchParams } = useStorage();
  const dispatch = useDispatch();

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

  const { data, error, isFetching } = useGetItemsQuery(requestParams);

  useEffect(() => {
    if (data) {
      dispatch(setSpacecrafts(data.spacecrafts));
    }
  }, [data, dispatch]);

  const pagination = data ? (
    <Pagination
      currentPage={pageNumber}
      itemPerPage={pageSize}
      totalItems={data.page.totalElements}
      setPageNumber={setPageNumber}
    />
  ) : null;

  if (error) {
    throw new Error('Failed to fetch data in Main');
  }

  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      {isFetching && !data ? <Loader /> : <div className={styles.pagination}>{pagination}</div>}
      <SearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm} setPageNumber={setPageNumber} />
      <div className={styles.content}>
        <div className={styles.list}>{!isFetching ? <CardList /> : <Loader />}</div>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}
