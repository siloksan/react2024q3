import { Spacecraft } from 'entities/spacecraft/models';

import styles from './Card.module.scss';

interface Props {
  spacecraft: Spacecraft;
  openDetails: (id: string) => void;
}

export default function SpaceCraftDetails({ spacecraft, openDetails }: Props) {
  const { name } = spacecraft;

  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

  return (
    <li
      className={styles.container}
      onClick={() => openDetails(spacecraft.uid)}
      onKeyDown={() => openDetails(spacecraft.uid)}
      aria-hidden="true"
    >
      <div className="ship-details">
        <h2>
          <strong>Name:</strong> {name}
        </h2>
        <p>
          <strong>Date of creation:</strong> {dateStatus}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>
    </li>
  );
}
