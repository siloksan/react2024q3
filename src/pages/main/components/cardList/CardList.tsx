import { Spacecraft } from 'entities/spacecraft/models';
import Card from '../card/Card';

import styles from './CardList.module.scss';

interface Props {
  spacecrafts: Spacecraft[];
}
export default function CardList({ spacecrafts }: Props) {
  if (spacecrafts.length === 0) {
    return <p className={styles.not_found}>No spacecrafts found</p>;
  }

  return (
    <ul className={styles.container}>
      {spacecrafts.map((spacecraft) => {
        return <Card spacecraft={spacecraft} key={spacecraft.uid} />;
      })}
    </ul>
  );
}
