import { useRoutes } from 'react-router-dom';
import Layout from 'app/layout/Layout';
import Main from 'pages/main';
import NotFoundPage from 'pages/notFoundPage';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Main /> },
        { path: '/main', element: <Main /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
}
