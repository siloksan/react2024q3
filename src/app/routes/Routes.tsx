import { createBrowserRouter } from 'react-router-dom';
import Layout from 'app/layout/Layout';
import Main from 'pages/main';
import NotFoundPage from 'pages/notFoundPage';
import CardDetails from 'pages/main/components/cardDetails/CardDetails';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [{ path: 'spacecrafts/:spacecraftId', element: <CardDetails /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

const routes = createBrowserRouter(routesConfig);
export default routes;
