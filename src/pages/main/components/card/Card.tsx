import { Spacecraft } from 'entities/spacecraft/models';

import { useEffect, useState } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import styles from './Card.module.scss';

interface Props {
  spacecraft: Spacecraft;
}

export default function Card({ spacecraft }: Props) {
  const { name } = spacecraft;
  const { spacecraftId } = useParams();

  const [className, setClassName] = useState(`${styles.container}`);

  useEffect(() => {
    if (spacecraftId === spacecraft.uid) {
      setClassName(`${styles.container} ${styles.active}`);
    } else {
      setClassName(`${styles.container}`);
    }
  }, [spacecraftId, spacecraft.uid]);

  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

  const [searchParams] = useSearchParams();

  return (
    <li className={className}>
      <NavLink
        to={`spacecrafts/${spacecraft.uid}?${searchParams.toString()}`}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <h2>
          <strong>Name:</strong> {name}
        </h2>
        <p>
          <strong>Date of creation:</strong> {dateStatus}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </NavLink>
    </li>
  );
}
