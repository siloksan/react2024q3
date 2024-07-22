// import { Link, useSearchParams } from 'react-router-dom';
import Image from 'next/image'
import Link from 'next/link';

// import { useTheme } from 'app/providers/themeProvider';
// import { ThemeToggle } from '../components/themeToggle/ThemeToggle';
import logo from '../assets/startrek-logo.png';
// import ErrorButton from '../components/errorButton/ErrorButton';

import styles from './Header.module.scss';

export default function Header() {
  // const [searchParams] = useSearchParams();
  // const dark = useTheme();

  let containerClass = styles.container;
  // if (dark) {
  //   containerClass += ` ${styles.dark}`;
  // }

  return (
    <header className={containerClass} data-testid="header">
      <Link href="/">
        {/* <Link to={`/?${searchParams.toString()}`}> */}
        <div className={styles.logo}>
          <Image src={logo} alt="Star Trek logo" />
          {/* <img src={logo} alt="Star trek logo" /> */}
        </div>
      </Link>
      {/* <ThemeToggle />
      <ErrorButton /> */}
    </header>
  );
}
