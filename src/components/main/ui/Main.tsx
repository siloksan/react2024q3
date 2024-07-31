import { useRouter } from 'next/router';

import getStringParam from '@/shared/lib/getStringParam/getStringParam';

import { SpacecraftsResponse } from '@/entities/spacecraft/models';
import Pagination from '@/components/pagination';
import SearchBox from '@/shared/ui/search/SearchBox';
import Flyout from '@/shared/ui/flyout/Flyout';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';

interface Props {
  spacecraftsRes: SpacecraftsResponse;
  children?: React.ReactNode;
}

export default function Main({ spacecraftsRes, children = null }: Props) {
  const router = useRouter();

  const { page, spacecrafts } = spacecraftsRes;

  const { pageNumber, pageSize, totalElements } = page;

  const setPageNumber = (nextPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, pageNumber: nextPage },
    });
  };

  const setSearchTerm = (name: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, name, pageNumber: 1 },
    });
  };

  const searchTerm = getStringParam(router.query, 'name');

  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      <Pagination
        currentPage={pageNumber + 1}
        itemPerPage={pageSize}
        totalItems={totalElements}
        setPageNumber={setPageNumber}
      />
      <SearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className={styles.content}>
        <div className={styles.list}>
          <CardList spacecrafts={spacecrafts} />
        </div>
        {children}
      </div>
      <Flyout />
    </>
  );
}
