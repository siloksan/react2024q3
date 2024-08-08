import { Spacecraft } from '~/entities/spacecraft/models';
import { useNavigation, useParams } from '@remix-run/react';
import Loader from '~/shared/ui/loader/Loader';
import Card from '../card/Card';

import styles from './CardList.module.scss';

interface Props {
  spacecrafts: Spacecraft[];
}

export default function CardList({ spacecrafts }: Props) {
  const { state } = useNavigation();
  const params = useParams();

  if (state === 'loading' && !params.uid) return <Loader />;

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
