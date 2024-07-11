import { SetStorageSearchParams } from 'shared/lib/types/setStorageSearchParams';
import { useState } from 'react';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';

interface Props {
  updateData: (searchTerm: string, pageNumber?: number) => void;
  searchTerm: string;
  setStorageSearchParams: SetStorageSearchParams;
  closeDetails: () => void;
}

export default function SearchBox({ updateData, searchTerm, setStorageSearchParams, closeDetails }: Props) {
  const [value, setValue] = useState(searchTerm);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setStorageSearchParams('name', value.trim());
    closeDetails();
    updateData(value.trim());
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
          value={value}
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
