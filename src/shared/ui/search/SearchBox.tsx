import React, { useCallback, useEffect, useRef } from 'react';
import Payload from 'shared/api/types/apiTypes';
import useSearch from 'shared/lib/useSearch';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';

interface Props {
  updateData: (payload: Payload) => void;
}

export default function SearchBox({ updateData }: Props) {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSubmit = useCallback(() => {
    updateData({ name: searchTerm });
  }, [searchTerm, updateData]);

  const savedCallback = useRef(handleSubmit);

  // This trick is necessary to avoid re-render every time when search input is changed
  useEffect(() => {
    savedCallback.current();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          value={searchTerm}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          className={styles.input}
          placeholder="Search"
        />
        <button className={styles.button} aria-label="Search" type="submit" onClick={handleSubmit}>
          <img src={loupe} alt="loupe icon" />
        </button>
      </div>
    </div>
  );
}
