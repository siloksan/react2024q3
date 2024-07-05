import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from 'pages/main';
import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';

import 'app/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </React.StrictMode>
);
