import { Provider } from 'react-redux';
import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';

import { store } from '@/shared/store';
import { ThemeProvider } from '@/features/providers/themeProvider';

import '@/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}
