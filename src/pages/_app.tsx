import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next/types';

import { ThemeProvider } from '@/features/providers/themeProvider';
import { SpacecraftsResponse } from '@/entities/spacecraft/models';

import '@/styles/index.scss';
import { SelectedItemsProvider } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';

export interface GetLayoutProps {
  spacecraftsRes: SpacecraftsResponse;
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: GetLayoutProps) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SelectedItemsProvider>
      <ThemeProvider>{getLayout(<Component {...pageProps} />, pageProps)}</ThemeProvider>
    </SelectedItemsProvider>
  );
}
