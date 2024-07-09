import { Outlet } from 'react-router-dom';
import Header from 'widgets/header';

import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
