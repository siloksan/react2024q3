import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import styles from './home.module.scss';
import Card from '../card/card';

export default function Home() {
  const usersData = useSelector((state: RootState) => state.usersData);

  const users = () => {
    return usersData.map((user, idx) => {
      const isNewUser = idx === 0;
      return (
        <li className={`${styles.item} ${isNewUser ? styles.last : ''}`} key={user.id}>
          <Card {...user} />
        </li>
      );
    });
  };
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
      <ul className={styles.users}>{users()}</ul>
    </section>
  );
}
