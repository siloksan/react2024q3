import getStringParam from '@/shared/lib/getStringParam/getStringParam';

import SearchBox from '@/shared/ui/search/SearchBox';
import Flyout from '@/shared/ui/flyout/Flyout';
import CardList from '../components/cardList/CardList';

import { getSpacecrafts } from '@/shared/api/services';
import { SearchParams } from '@/shared/types';
import Pagination from '@/shared/ui/pagination';

import styles from './Main.module.scss';

interface Props {
  searchParams: SearchParams;
  children?: React.ReactNode;
}

export default async function Main({ searchParams, children }: Props) {
  const spacecraftsRes = await getSpacecrafts(searchParams);
  if (!spacecraftsRes) {
    throw new Error('The spacecrafts failed to load!');
  }

  const { page, spacecrafts } = spacecraftsRes;

  const { pageNumber, pageSize, totalElements } = page;

  const searchTerm = getStringParam(searchParams, 'name');

  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      <Pagination currentPage={pageNumber + 1} itemPerPage={pageSize} totalItems={totalElements} />
      <SearchBox searchTerm={searchTerm} />
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
