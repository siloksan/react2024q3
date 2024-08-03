'use client';

import { ReactNode } from 'react';

import { ThemeProvider } from '@/features/providers/themeProvider';
import { SelectedItemsProvider } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <SelectedItemsProvider>{children}</SelectedItemsProvider>
    </ThemeProvider>
  );
}
