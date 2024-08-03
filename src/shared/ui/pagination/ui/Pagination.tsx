'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/features/providers/themeProvider';
import getButtonsNameArray from '../lib/getButtonsNameArray';

import styles from './Pagination.module.scss';
import useQueryString from '@/shared/lib/useQueryString/useQueryString';

export interface PropsPagination {
  itemPerPage: number;
  totalItems: number;
  currentPage: number;
}

function Pagination({ itemPerPage, totalItems, currentPage }: PropsPagination) {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();
  const totalPages = Math.ceil(totalItems / itemPerPage);
  const dark = useTheme();

  const setPageNumber = (nextPage: number) => {
    const newQueryParams = createQueryString({ pageNumber: `${nextPage}` });
    router.push(`${pathname}?${newQueryParams}`);
  };

  let buttonClass = styles.button;
  let { disabled } = styles;
  let { current } = styles;

  if (dark) {
    buttonClass += ` ${styles.dark}`;
    disabled += ` ${styles.dark}`;
    current += ` ${styles.dark}`;
  }

  if (totalPages < 2) {
    return null;
  }

  const handler = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const prevBtnDisabled = currentPage === 1;
  const nextBtnDisabled = currentPage === totalPages;

  const PAGINATION_ARRAY: (string | number)[] = getButtonsNameArray(currentPage, totalPages);

  let prevBtnClassName = buttonClass;
  let nextBtnClassName = buttonClass;

  if (currentPage === 1) {
    prevBtnClassName += ` ${disabled}`;
  }

  if (totalPages === currentPage) {
    nextBtnClassName += ` ${disabled}`;
  }
  let key = 0;
  const listButtons = PAGINATION_ARRAY.map((pageNumber: string | number) => {
    key += 1;
    let className = buttonClass;
    const isCurrentButton = typeof pageNumber === 'number' && pageNumber === currentPage;
    const isDisabled = typeof pageNumber === 'string' || pageNumber === currentPage;
    if (isCurrentButton) {
      className += ` ${current}`;
    }
    if (isDisabled) {
      className += ` ${disabled}`;
    }
    const clickHandler = !isDisabled ? () => handler(pageNumber) : () => {};
    return (
      <button
        className={className}
        type="button"
        key={key}
        onClick={clickHandler}
        data-testid="pagination-button"
        disabled={isDisabled}
      >
        {pageNumber}
      </button>
    );
  });

  return (
    <div className={styles.container} data-testid="pagination">
      <button
        className={prevBtnClassName}
        type="button"
        onClick={() => handler(currentPage - 1)}
        disabled={prevBtnDisabled}
      >
        prev
      </button>
      {listButtons}
      <button
        className={nextBtnClassName}
        type="button"
        onClick={() => handler(currentPage + 1)}
        disabled={nextBtnDisabled}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
