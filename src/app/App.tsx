import { BrowserRouter } from 'react-router-dom';
import Routes from 'app/routes/Routes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
