import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';

import '../styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
