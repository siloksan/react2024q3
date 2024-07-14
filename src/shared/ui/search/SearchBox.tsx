import { useState } from 'react';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';

interface Props {
  updateData: (searchTerm: string, pageNumber?: number) => void;
  searchTerm: string;
  setStorageSearchParams: (key: string, value: string) => void;
}

export default function SearchBox({ updateData, searchTerm, setStorageSearchParams }: Props) {
  const [value, setValue] = useState(searchTerm);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setStorageSearchParams('name', value.trim());
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
