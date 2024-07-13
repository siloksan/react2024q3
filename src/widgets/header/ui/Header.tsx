import { Link, useSearchParams } from 'react-router-dom';

import logo from '../assets/startrek-logo.png';
import ErrorButton from '../components/errorButton/ErrorButton';

import styles from './Header.module.scss';

export default function Header() {
  const [searchParams] = useSearchParams();

  return (
    <header className={styles.container} data-testid="header">
      <Link to={`/?${searchParams.toString()}`}>
        <div className={styles.logo}>
          <img src={logo} alt="Star trek logo" />
        </div>
      </Link>
      <ErrorButton />
    </header>
  );
}
