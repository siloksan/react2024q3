import { useThemeUpdate } from 'app/providers/themeProvider';

import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
  const toggleTheme = useThemeUpdate();

  return (
    <div>
      <input type="checkbox" className={styles.checkbox} id="themeToggle" onClick={toggleTheme} />
      <label className={styles.label} htmlFor="themeToggle">
        <div className={styles.ball} />
      </label>
    </div>
  );
}
