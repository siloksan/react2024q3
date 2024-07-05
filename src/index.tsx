import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'app/App';
import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
import 'app/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
