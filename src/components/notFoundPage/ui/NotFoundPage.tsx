import Image from 'next/image';
import Link from 'next/link';

import backHole from '../assets/black-hole.jpg';

import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <>
      <h1 className={styles.title}>404 Page Not Found</h1>
      <p className={styles.description}>Sorry, this page does not exist</p>
      <Link href="/" className={styles.link}>
        Return to the Main page
      </Link>
      <div className={styles.img}>
        <Image src={backHole} alt="back hole" priority width={600} height={600} />
      </div>
    </>
  );
}
