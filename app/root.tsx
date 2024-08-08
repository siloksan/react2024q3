import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import Main from './components/main';
import { getSpacecrafts } from './shared/api/services/apiServices';
import Provider from './features/providers';

import './styles/index.scss';
import Wrapper from './components/layout/Wrapper';

export function Layout({ children }: { children: React.ReactNode }) {
  const { spacecraftsRes } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider>
          <Wrapper>
            <Main spacecraftsRes={spacecraftsRes}>{children}</Main>
          </Wrapper>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const spacecraftsRes = await getSpacecrafts(url.searchParams);
  if (!spacecraftsRes) {
    throw new Error('Spacecraft not found');
  }
  return json({ spacecraftsRes });
}
