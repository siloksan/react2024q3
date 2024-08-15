import { Link } from 'react-router-dom';

import styles from './home.module.scss';

export default function Home() {
  return (
    <section className={styles.container}>
      <h1>Home Page</h1>
      <ul className={styles.links}>
        <li>
          <Link to="/controlled-form">Controlled Form</Link>
        </li>
        <li>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </li>
      </ul>
    </section>
  );
}
