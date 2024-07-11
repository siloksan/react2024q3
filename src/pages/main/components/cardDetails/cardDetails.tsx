import { Spacecraft } from 'entities/spacecraft/models';
import { useEffect, useRef, useState } from 'react';
import { getSpaceCraftDetails } from 'shared/api/axiosMethods';
import Loader from 'shared/ui/loader/Loader';

import { SetStorageSearchParams } from 'shared/lib/types/setStorageSearchParams';
import styles from './cardDetails.module.scss';

interface Props {
  id: string;
  closeDetails: () => void;
  setStorageSearchParams: SetStorageSearchParams;
}

export default function CardDetails({ id, closeDetails, setStorageSearchParams }: Props) {
  const [data, setData] = useState<Spacecraft | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getDetails = async (uid: string) => {
    setStorageSearchParams('uid', uid);
    try {
      const response = await getSpaceCraftDetails('spacecraft', { params: { uid } });
      setData(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const savedCallback = useRef(getDetails);

  useEffect(() => {
    savedCallback.current(id);
  }, [id]);

  if (error) {
    throw new Error(error);
  }

  if (!data) {
    return (
      <aside>
        <Loader />
      </aside>
    );
  }

  const { name, spacecraftClass } = data;

  const owner = data.owner ? data.owner.name : 'unknown';
  const registry = data.registry ? data.registry : 'unknown';
  const operator = data.operator ? data.operator.name : 'unknown';
  const dateStatus = data.dateStatus || 'unknown';
  const status = data.status || 'unknown';

  const leftSide = (
    <div>
      <p>
        <strong>Registry code:</strong> {registry}
      </p>
      <p>
        <strong>Date of creation:</strong> {dateStatus}
      </p>
      <p>
        <strong>Owner:</strong> {owner}
      </p>
      <p>
        <strong>Managed By:</strong> {operator}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );

  const rightSide = spacecraftClass ? (
    <div>
      <p>
        <strong>Class:</strong> {spacecraftClass.name}
      </p>
      <p>
        <strong>Crew:</strong> {spacecraftClass.crew || 'unknown'}
      </p>
      <p>
        <strong>activeFrom:</strong> {spacecraftClass.activeFrom}
      </p>
      <p>
        <strong>activeTo:</strong> {spacecraftClass.activeTo}
      </p>
    </div>
  ) : null;

  return (
    <aside className={styles.container}>
      <h3>
        <strong>Name:</strong> {name}
      </h3>
      <div className={styles.sides}>
        {leftSide}
        {rightSide}
      </div>
      <button className={styles.btn} onClick={closeDetails} type="button">
        Close details
      </button>
    </aside>
  );
}
