import { useTheme } from '~/features/providers/themeProvider';
import { Link } from '@remix-run/react';

import ErrorButton from '../components/errorButton/ErrorButton';
import logo from '../assets/startrek-logo.png';
import ThemeToggle from '../components/themeToggle/ThemeToggle';

import styles from './Header.module.scss';

export default function Header() {
  const dark = useTheme();

  let containerClass = styles.container;
  if (dark) {
    containerClass += ` ${styles.dark}`;
  }

  return (
    <header className={containerClass} data-testid="header">
      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} alt="Star Trek logo" />
        </div>
      </Link>
      <ThemeToggle />
      <ErrorButton />
    </header>
  );
}
