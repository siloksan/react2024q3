// import SearchBox from 'shared/ui/search/SearchBox';
// import Pagination from 'widgets/pagination';
// import useStorage from 'shared/lib/useStorage/useStorage';
// import { useGetItemsQuery } from 'shared/api/services';
// import { SpaceCraftsRequestParams } from 'shared/api/types';
// import { setSpacecrafts } from 'features/reduxSlices/spacecrafts';
// import Flyout from 'shared/ui/flyout/Flyout';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';
import { SpacecraftsResponse } from '@/entities/spacecraft/models';
import { RootState, useAppSelector, wrapper } from '@/shared/store';
import { useRouter } from 'next/dist/client/router';
import Pagination from '@/components/pagination';
import SearchBox from '@/shared/ui/search/SearchBox';
import getStringParam from '@/shared/lib/getStringParam/getStringParam';
import Flyout from '@/shared/ui/flyout/Flyout';
import CardDetailsWrapper from '@/pages/spacecraft/[uid]';

interface Props {
  spacecraftsRes: SpacecraftsResponse;
  children?: React.ReactNode;
}

export default function Main({ spacecraftsRes, children = null }: Props) {
  const router = useRouter();

  const { page, spacecrafts } = spacecraftsRes;

  const { pageNumber, pageSize, totalElements } = page;
  
  function setPageNumber(pageNumber: number) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, pageNumber },
    });
  }

  function setSearchTerm(name: string) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, name, pageNumber: 1 },
    });
  }

  const searchTerm = getStringParam(router.query, 'name');

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

  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      <Pagination
        currentPage={pageNumber + 1}
        itemPerPage={pageSize}
        totalItems={totalElements}
        setPageNumber={setPageNumber}
      />
      <SearchBox
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setPageNumber={setPageNumber}
      />
      <div className={styles.content}>
        <div className={styles.list}>
          <CardList spacecrafts={spacecrafts} />
        </div>
        {children}
      </div>
      {/* <Flyout /> */}
    </>
  );
}
