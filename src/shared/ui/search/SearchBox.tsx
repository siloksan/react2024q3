import { useState } from 'react';
import useStorage from 'shared/lib/useStorage/useStorage';
import { useTheme } from 'app/providers/themeProvider';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';
import Button from '../button/Button';

interface Props {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  setPageNumber: (page: number) => void;
}

export default function SearchBox({ setSearchTerm, searchTerm, setPageNumber }: Props) {
  const [value, setValue] = useState(searchTerm);
  const { setData } = useStorage();
  const dark = useTheme();

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

  let containerClassName = styles.container;
  let inputClassName = styles.input;
  let buttonClassName = styles.button;
  if (dark) {
    containerClassName += ` ${styles.dark}`;
    inputClassName += ` ${styles.dark}`;
    buttonClassName += ` ${styles.dark}`;
  }

  return (
    <div className={containerClassName}>
      <div className={styles.form}>
        <input
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          className={inputClassName}
          placeholder="Search"
        />
        <Button onClick={handleSubmit} aria-label="Search" type="submit" additionalStyles={buttonClassName}>
          <img src={loupe} alt="loupe icon" />
        </Button>
      </div>
    </div>
  );
}
