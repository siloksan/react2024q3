import { useTheme, useThemeUpdate } from '~/features/providers/themeProvider';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  const toggleTheme = useThemeUpdate();
  const dark = useTheme();
  let { container } = styles;

  if (dark) {
    container += ` ${styles.dark}`;
  }

  return (
    <div className={container} data-testid="toggle">
      Light
      <div>
        <input type="checkbox" className={styles.checkbox} id="themeToggle" onClick={toggleTheme} />
        <label className={styles.label} htmlFor="themeToggle">
          <div className={styles.ball} />
        </label>
      </div>
      Dark
    </div>
  );
}
