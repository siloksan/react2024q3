import { Spacecraft } from 'entities/spacecraft/models';
import { StorageData } from 'shared/lib/types/storage';
import Card from '../card/Card';

import styles from './CardList.module.scss';

interface Props {
  spacecrafts: Spacecraft[];
  openDetails: (id: string) => void;
  dataStorage: StorageData;
}
export default function CardList({ spacecrafts, openDetails, dataStorage }: Props) {
  const spacecraftsView =
    spacecrafts.length === 0 ? (
      <p className={styles.not_found}>No spacecrafts found</p>
    ) : (
      spacecrafts.map((spacecraft) => {
        return (
          <Card spacecraft={spacecraft} key={spacecraft.uid} openDetails={openDetails} dataStorage={dataStorage} />
        );
      })
    );

  return (
    <ul className={styles.container} data-testid="card-list">
      {spacecraftsView}
    </ul>
  );
}
