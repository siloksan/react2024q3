import { useState } from 'react';
import useStorage from 'shared/lib/useStorage/useStorage';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';

interface Props {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  setPageNumber: (page: number) => void;
}

export default function SearchBox({ setSearchTerm, searchTerm, setPageNumber }: Props) {
  const [value, setValue] = useState(searchTerm);
  const { setData } = useStorage();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setData('name', value.trim());
    setData('page', '1');
    setPageNumber(1);
    setSearchTerm(value.trim());
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
