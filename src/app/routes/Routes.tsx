import { useRoutes } from 'react-router-dom';
import Layout from 'app/layout/Layot';
import Main from 'pages/main';
import NotFoundPage from 'pages/notFoundPage';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/main', element: <Main /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
}
