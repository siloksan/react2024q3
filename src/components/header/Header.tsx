import { Link } from 'react-router-dom';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h2>Welcome to the React Form</h2>
      <Link to="/">Go Home</Link>
    </header>
  );
}
