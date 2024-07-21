import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import { ThemeProvider } from './providers/themeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}
