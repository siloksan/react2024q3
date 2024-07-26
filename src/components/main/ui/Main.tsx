// import SearchBox from 'shared/ui/search/SearchBox';
// import Pagination from 'widgets/pagination';
// import useStorage from 'shared/lib/useStorage/useStorage';
// import { useGetItemsQuery } from 'shared/api/services';
// import { SpaceCraftsRequestParams } from 'shared/api/types';
// import { setSpacecrafts } from 'features/reduxSlices/spacecrafts';
// import Flyout from 'shared/ui/flyout/Flyout';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';
import { GetServerSidePropsContext } from 'next/types';
import { SpaceCraftsRequestParams } from '@/shared/api/types';
import {
  getItems,
  getRunningQueriesThunk,
  starTrekApi,
  useGetItemsQuery,
} from '@/shared/api/services';
// import { store } from '@/shared/store';
import { SpacecraftsResponse } from '@/entities/spacecraft/models';
import { RootState, useAppSelector, wrapper } from '@/shared/store';
import { useRouter } from 'next/dist/client/router';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageSize = 5;
    let name = '';
    if (typeof context.query.name === 'string') {
      name = context.query.name;
    }

    let pageNumber = 1;
    if (typeof context.query.page === 'string') {
      pageNumber = Number(context.query.page);
    }

    const requestParams: SpaceCraftsRequestParams = {
      endpoint: 'spacecraft/search',
      payload: {
        name,
        registry: '',
        status: '',
      },
      params: { pageNumber: pageNumber - 1, pageSize },
    };
    store.dispatch(getItems.initiate(requestParams));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default function Main() {
  // const router = useRouter();

  // const pageSize = 5;

  // const requestParams: SpaceCraftsRequestParams = {
  //   endpoint: 'spacecraft/search',
  //   payload: {
  //     name: router.query.name as string,
  //     registry: '',
  //     status: '',
  //   },
  //   params: { pageNumber: Number(router.query.page) - 1, pageSize },
  // };

  // const result = useGetItemsQuery(requestParams);
  // const { isLoading, error, data } = result;

  // const data = useAppSelector((state: RootState) => state.starTrekApi.queries['getItems(null)']?.data.spacecrafts);

  // console.log('data: ', data);
  // const pageSize = 5;
  // const { searchParams } = useStorage();
  // const dispatch = useDispatch();

  // const [pageNumber, setPageNumber] = useState<number>(() => {
  //   const currentPage = searchParams.get('page');
  //   return currentPage ? Number(currentPage) : 1;
  // });

  // const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('name') || '');

  // const requestParams: SpaceCraftsRequestParams = {
  //   endpoint: 'spacecraft/search',
  //   payload: {
  //     name: searchTerm,
  //     registry: '',
  //     status: '',
  //   },
  //   params: { pageNumber: pageNumber - 1, pageSize },
  // };

  // const { data, error, isFetching } = useGetItemsQuery(requestParams);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setSpacecrafts(data.spacecrafts));
  //   }
  // }, [data, dispatch]);

  // const pagination = data ? (
  //   <Pagination
  //     currentPage={pageNumber}
  //     itemPerPage={pageSize}
  //     totalItems={data.page.totalElements}
  //     setPageNumber={setPageNumber}
  //   />
  // ) : null;

  // if (error) {
  //   throw new Error('Failed to fetch data in Main');
  // }

  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      {/* {isFetching && !data ? <Loader /> : <div className={styles.pagination}>{pagination}</div>} */}
      {/* <SearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm} setPageNumber={setPageNumber} /> */}
      <div className={styles.content}>
        {/* <div className={styles.list}>
          <CardList />
        </div> */}
        {/* <ErrorBoundary>
          <Outlet />
        </ErrorBoundary> */}
      </div>
      {/* <Flyout /> */}
    </>
  );
}
