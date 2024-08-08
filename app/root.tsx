import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import './styles/index.scss';
import Header from './components/header';
import Main from './components/main';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getSpacecrafts } from './shared/api/services/apiServices';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Main>{children}</Main>
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
}