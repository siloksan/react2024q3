'use client';

import Image from 'next/image';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/features/providers/themeProvider';

import Button from '../button/Button';

import loupe from './assets/search-icon.svg';
import styles from './SearchBox.module.scss';
import useQueryString from '@/shared/lib/useQueryString/useQueryString';

interface Props {
  searchTerm: string;
}

export default function SearchBox({ searchTerm }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();

  const [value, setValue] = useState(searchTerm);

  const dark = useTheme();

  const setSearchTerm = (name: string) => {
    const newQueryParams = createQueryString({ name, pageNumber: '1' });
    router.push(`${pathname}?${newQueryParams}`);
  };

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
