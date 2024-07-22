import { createContext, useCallback, useContext, useState } from 'react';

const defaultTheme = false;
const ThemeContext = createContext(defaultTheme);
const ThemeContextUpdate = createContext<() => void>(() => {});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeContextUpdate);
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setTheme] = useState(false);

  const changeTheme = useCallback(() => {
    setTheme(!dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={dark}>
      <ThemeContextUpdate.Provider value={changeTheme}>{children}</ThemeContextUpdate.Provider>
    </ThemeContext.Provider>
  );
}
