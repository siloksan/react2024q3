import { createBrowserRouter } from 'react-router-dom';

import ControlledForm from '@/components/controlled-form/controlled-form';
import Home from '@/components/home/home';
import NotFoundPage from '@/components/not-found-page/not-found-page';
import UncontrolledForm from '@/components/uncontrolled-form/uncontrolled-form';
import Layout from '@/components/root-layout/root-layout';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/controlled-form',
        element: <ControlledForm />,
      },
      {
        path: '/uncontrolled-form',
        element: <UncontrolledForm />,
      },
    ],
  },
];

const routes = createBrowserRouter(routesConfig);
export default routes;
