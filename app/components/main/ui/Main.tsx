import { useLoaderData } from '@remix-run/react';
import CardList from '../components/cardList/CardList';

import styles from './Main.module.scss';

interface Props {
  children?: React.ReactNode;
}

export default function Main({ children = null }: Props) {
  const router = useRouter();

  const { spacecraftsRes } = useLoaderData();

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
