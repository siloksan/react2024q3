'use client';

import { useTheme } from '@/features/providers/themeProvider';
import styles from './_wrapper.module.scss';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const dark = useTheme();

  let rootClass = styles.root;
  if (dark) {
    rootClass += ` ${styles.dark}`;
  }

  return (
    <div className={rootClass} data-testid="layout">
      <div className={styles.main}>{children}</div>
    </div>
  );
}
