import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';
import Button from '../button/Button';
import { useTheme } from '@/features/providers/themeProvider';

interface Props {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  setPageNumber: (page: number) => void;
}

export default function SearchBox({
  setSearchTerm,
  searchTerm,
  setPageNumber,
}: Props) {
  const [value, setValue] = useState(searchTerm);

  const dark = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(value);
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={value}
          type="text"
          className={inputClassName}
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          aria-label="Search"
          type="submit"
          additionalStyles={buttonClassName}
        >
          <Image src={loupe} alt="loupe icon" />
        </Button>
      </form>
    </div>
  );
}
