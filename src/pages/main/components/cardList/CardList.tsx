import { RootState } from 'app/store';
import { useSelector } from 'react-redux';
import Card from '../card/Card';

import styles from './CardList.module.scss';

export default function CardList() {
  const spacecrafts = useSelector((state: RootState) => state.spacecrafts.value);

  const spacecraftsView =
    spacecrafts.length === 0 ? (
      <p className={styles.not_found}>No spacecrafts found</p>
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
