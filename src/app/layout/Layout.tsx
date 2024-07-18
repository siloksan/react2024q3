import { Outlet } from 'react-router-dom';
import Header from 'widgets/header';

import { useTheme } from 'app/providers/themeProvider';
import styles from './Layout.module.scss';

export default function Layout() {
  const dark = useTheme();

  console.log('theme: ', dark);
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
