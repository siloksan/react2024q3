import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';


import { ThemeProvider } from '@/features/providers/themeProvider';

import './styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
