import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/controlled-form">Controlled Form</Link>
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
    </div>
  );
}
