import { SpacecraftsResponse } from '~/entities/spacecraft/models';

import Pagination from '~/components/pagination';
import SearchBox from '~/shared/ui/search/SearchBox';
import Flyout from '~/shared/ui/flyout/Flyout';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';

interface Props {
  children: React.ReactNode;
  spacecraftsRes: SpacecraftsResponse;
}

export default function Main({ spacecraftsRes, children }: Props) {
  const { page, spacecrafts } = spacecraftsRes;
  const { pageNumber, pageSize, totalElements } = page;

  return (
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      <Pagination currentPage={pageNumber + 1} itemPerPage={pageSize} totalItems={totalElements} />
      <SearchBox />
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
