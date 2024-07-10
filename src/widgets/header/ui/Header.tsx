import { Link } from 'react-router-dom';

import logo from '../assets/startrek-logo.png';
import ErrorButton from '../components/errorButton/ErrorButton';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.container} data-testid="header">
      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} alt="Star trek logo" />
        </div>
      </Link>
      <ErrorButton />
    </header>
  );
}
