import { Outlet } from 'react-router-dom';
import Header from 'widgets/header';

import { useTheme } from 'app/providers/themeProvider';
import styles from './Layout.module.scss';

export default function Layout() {
  const dark = useTheme();

  let rootClass = styles.root;
  if (dark) {
    rootClass += ` ${styles.dark}`;
  }

  return (
    <div className={rootClass}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
