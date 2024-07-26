import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store';
import Card from '../card/Card';

import styles from './CardList.module.scss';
import { Spacecraft } from '@/entities/spacecraft/models';

interface Props {
  spacecrafts: Spacecraft[];
}

export default function CardList({ spacecrafts }: Props) {

  const spacecraftsView =
    spacecrafts.length === 0 ? (
      <li className={styles.not_found}>No spacecrafts found</li>
    ) : (
      spacecrafts.map((spacecraft) => {
        return <Card spacecraft={spacecraft} key={spacecraft.uid} />;
      })
    );

  return (
    <ul className={styles.container} data-testid="card-list">
      {spacecraftsView}
    </ul>
  );
}
