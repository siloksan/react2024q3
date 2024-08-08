import { useState } from 'react';

import { useTheme } from '~/features/providers/themeProvider';
import { useSearchParams } from '@remix-run/react';
import loupe from './assets/search-icon.svg';

import styles from './SearchBox.module.scss';
import Button from '../button/Button';

export default function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('name') || '');

  const dark = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ ...searchParams, name: value, pageNumber: '1' });
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
          <img src={loupe} alt="loupe icon" />
        </Button>
      </form>
    </div>
  );
}
