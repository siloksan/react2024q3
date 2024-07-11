import { Spacecraft } from 'entities/spacecraft/models';

import { useEffect, useState } from 'react';
import { StorageData } from 'shared/lib/types/storage';
import styles from './Card.module.scss';

interface Props {
  spacecraft: Spacecraft;
  openDetails: (id: string) => void;
  dataStorage: StorageData;
}

export default function Card({ spacecraft, openDetails, dataStorage }: Props) {
  const [active, setActive] = useState(false);
  const { name } = spacecraft;

  const [className, setClassName] = useState(`${styles.container}`);

  useEffect(() => {
    if (dataStorage.uid === spacecraft.uid) {
      setClassName(`${styles.container} ${styles.active}`);
    } else {
      setClassName(`${styles.container}`);
    }
  }, [dataStorage.uid, spacecraft.uid]);

  const openDetailsHandler = () => {
    openDetails(spacecraft.uid);
    setActive(!active);
  };

  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

  return (
    <li className={className} onClick={openDetailsHandler} onKeyDown={openDetailsHandler} aria-hidden="true">
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
