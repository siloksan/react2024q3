import { useTheme } from '@/features/providers/themeProvider';
import Header from '../header';

import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const dark = useTheme();

  let rootClass = styles.root;
  if (dark) {
    rootClass += ` ${styles.dark}`;
  }

  return (
    <div className={rootClass}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
}
