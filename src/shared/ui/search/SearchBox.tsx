import React from 'react';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';

interface Props {
  updateData: (searchTerm: string, pageNumber?: number) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setCurrentPage: (page: string) => void;
}

export default function SearchBox({ updateData, searchTerm, setSearchTerm, setCurrentPage }: Props) {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSubmit = () => {
    setCurrentPage('');
    updateData(searchTerm.trim());
  };

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
        <button className={styles.button} aria-label="Search" type="submit" onClick={() => handleSubmit()}>
          <img src={loupe} alt="loupe icon" />
        </button>
      </div>
    </div>
  );
}
