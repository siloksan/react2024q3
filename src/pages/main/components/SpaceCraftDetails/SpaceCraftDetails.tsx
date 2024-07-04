import { Spacecraft } from 'entities/spacecraft/models';

import styles from './SpaceCraftDetails.module.scss';

interface Props {
  spacecraft: Spacecraft;
}

export default function SpaceCraftDetails({ spacecraft }: Props) {
  const { name } = spacecraft;

  const owner = spacecraft.owner ? spacecraft.owner.name : 'unknown';
  const operator = spacecraft.operator ? spacecraft.operator.name : 'unknown';
  const dateStatus = spacecraft.dateStatus || 'unknown';
  const spacecraftClass = spacecraft.spacecraftClass ? spacecraft.spacecraftClass.name : 'unknown';
  const status = spacecraft.status || 'unknown';

  return (
    <li className={styles.container}>
      <div className="ship-details">
        <h2>
          <strong>Name:</strong> {name}
        </h2>
        <p>
          <strong>Owner:</strong> {owner}
        </p>
        <p>
          <strong>Date of creation:</strong> {dateStatus}
        </p>
        <p>
          <strong>Class:</strong> {spacecraftClass}
        </p>
        <p>
          <strong>Managed By:</strong> {operator}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>
    </li>
  );
}
