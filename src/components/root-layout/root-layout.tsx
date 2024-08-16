import { Outlet } from 'react-router-dom';
import Header from '@/components/header/header';

import styles from './root-layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
