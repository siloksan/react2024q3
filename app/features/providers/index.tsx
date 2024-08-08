import { ReactNode } from 'react';
import { ThemeProvider } from './themeProvider';
import { SelectedItemsProvider } from './selectedItemsProvider';

interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <SelectedItemsProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SelectedItemsProvider>
  );
}
