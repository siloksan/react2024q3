import Image from 'next/image';

import { useState } from 'react';
import { useTheme } from '@/features/providers/themeProvider';

import Button from '../button/Button';

import loupe from './assets/search-icon.svg';
import styles from './SearchBox.module.scss';

interface Props {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
}

export default function SearchBox({ setSearchTerm, searchTerm }: Props) {
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
        <Button aria-label="Search" type="submit" additionalStyles={buttonClassName}>
          <Image src={loupe} alt="loupe icon" width={24} height={24} />
        </Button>
      </form>
    </div>
  );
}
