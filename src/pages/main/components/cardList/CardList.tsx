import { Spacecraft } from 'entities/spacecraft/models';
import Card from '../card/Card';

import styles from './CardList.module.scss';

interface Props {
  spacecrafts: Spacecraft[];
  openDetails: (id: string) => void;
}
export default function CardList({ spacecrafts, openDetails }: Props) {
  const spacecraftsView =
    spacecrafts.length === 0 ? (
      <p className={styles.not_found}>No spacecrafts found</p>
    ) : (
      spacecrafts.map((spacecraft) => {
        return <Card spacecraft={spacecraft} key={spacecraft.uid} openDetails={openDetails} />;
      })
    );

  return (
    <ul className={styles.container} data-testid="card-list">
      {spacecraftsView}
    </ul>
  );
}
