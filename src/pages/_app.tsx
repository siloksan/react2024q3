import { Provider } from 'react-redux';
import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@/features/providers/themeProvider';

import '@/styles/index.scss';
import { wrapper } from '@/shared/store';

const { default: fetch, Headers, Request, Response } = require("node-fetch");
const { default: AbortController } = require("abort-controller");

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

function App({ Component, pageProps }: AppProps) {

  return (
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
