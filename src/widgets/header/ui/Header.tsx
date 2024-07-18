import { Link, useSearchParams } from 'react-router-dom';

import { useTheme } from 'app/providers/themeProvider';
import { ThemeToggle } from '../components/themeToggle/ThemeToggle';
import logo from '../assets/startrek-logo.png';
import ErrorButton from '../components/errorButton/ErrorButton';

import styles from './Header.module.scss';

export default function Header() {
  const [searchParams] = useSearchParams();
  const dark = useTheme();

  let containerClass = styles.container;
  if (dark) {
    containerClass += ` ${styles.dark}`;
  }

  return (
    <header className={containerClass} data-testid="header">
      <Link to={`/?${searchParams.toString()}`}>
        <div className={styles.logo}>
          <img src={logo} alt="Star trek logo" />
        </div>
      </Link>
      <ThemeToggle />
      <ErrorButton />
    </header>
  );
}
