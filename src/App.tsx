import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './app/routes/routes';

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
