import { Link } from '@remix-run/react';
import backHole from '../assets/black-hole.jpg';

import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <>
      <h1 className={styles.title}>404 Page Not Found</h1>
      <p className={styles.description}>Sorry, this page does not exist</p>
      <Link to="/" className={styles.link}>
        Return to the Main page
      </Link>
      <div className={styles.img}>
        <img src={backHole} alt="back hole" />
      </div>
    </>
  );
}
