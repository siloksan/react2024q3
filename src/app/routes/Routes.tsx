import { useRoutes } from 'react-router-dom';
import Layout from 'app/layout/Layot';
import Main from 'pages/main';

export default function Routes() {
  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/main', element: <Main /> },
        { path: '*', element: <div>404</div> },
      ],
    },
  ]);
  return element;
}
