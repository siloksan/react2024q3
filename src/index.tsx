import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from "app/layout/Layot";

import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
import 'app/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  </React.StrictMode>
);
