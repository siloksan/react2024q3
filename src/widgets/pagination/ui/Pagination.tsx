import styles from './Pagination.module.scss';

interface Props {
  itemPerPage: number;
  totalItems: number;
  updateData: (searchQuery: string, pageNumber: number) => void;
  currentPage: number;
  searchTerm: string;
}

function getButtonsNameArray(currentPage: number, totalPages: number) {
  const maxButtons = 7;
  const array = [];
  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i += 1) {
      array.push(i);
    }
  } else if (currentPage < 5) {
    array.push(1, 2, 3, 4, 5, '...', totalPages);
  } else if (totalPages - currentPage < 4) {
    array.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    array.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
  }

  return array;
}

function Pagination({ itemPerPage, totalItems, currentPage, updateData, searchTerm }: Props) {
  const totalPages = Math.ceil(totalItems / itemPerPage);

  if (totalPages < 2) {
    return null;
  }

  const handler = (pageNumber: number) => {
    updateData(searchTerm, pageNumber);
  };

  const prevBtnDisabled = currentPage === 1;
  const nextBtnDisabled = currentPage === totalPages;

  const PAGINATION_ARRAY: (string | number)[] = getButtonsNameArray(currentPage, totalPages);

  let prevBtnClassName = `${styles.pagination__button}`;
  let nextBtnClassName = `${styles.pagination__button}`;

  if (currentPage === 1) {
    prevBtnClassName += ` ${styles.pagination__button_disabled}`;
  }

  if (totalPages === currentPage) {
    nextBtnClassName += ` ${styles.pagination__button_disabled}`;
  }
  let key = 0;
  const listButtons = PAGINATION_ARRAY.map((pageNumber: string | number) => {
    key += 1;
    let className = `${styles.pagination__button}`;
    const isCurrentButton = typeof pageNumber === 'number' && pageNumber === currentPage;
    const isDisabled = typeof pageNumber === 'string' || pageNumber === currentPage;
    if (isCurrentButton) {
      className += ` ${styles.pagination__button_current}`;
    }
    if (isDisabled) {
      className += ` ${styles.pagination__button_disabled}`;
    }
    const clickHandler = !isDisabled ? () => handler(pageNumber - 1) : () => {};
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
        onClick={() => handler(currentPage - 2)}
        disabled={prevBtnDisabled}
      >
        prev
      </button>
      {listButtons}
      <button
        className={nextBtnClassName}
        type="button"
        onClick={() => handler(currentPage)}
        disabled={nextBtnDisabled}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
