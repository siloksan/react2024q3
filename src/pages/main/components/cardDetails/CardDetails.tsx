import { Spacecraft } from 'entities/spacecraft/models';
import { useEffect, useRef, useState } from 'react';
import { getSpaceCraftDetails } from 'shared/api/axiosMethods';
import Loader from 'shared/ui/loader/Loader';

import { NavLink, useParams } from 'react-router-dom';
import styles from './CardDetails.module.scss';

export default function CardDetails() {
  const { spacecraftId } = useParams();
  const [data, setData] = useState<Spacecraft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getDetails = async (uid: string) => {
    setData(null);
    try {
      const response = await getSpaceCraftDetails('spacecraft', { params: { uid } });
      setData(response);
    } catch (err) {
      if (err instanceof Error) {
        setError('err.message');
      }
    }
  };

  const savedCallback = useRef(getDetails);

  useEffect(() => {
    if (spacecraftId) {
      savedCallback.current(spacecraftId);
    }
  }, [spacecraftId]);

  if (error) {
    throw new Error(error);
  }

  if (!data) {
    return (
      <aside className={styles.container} data-testid="card-details">
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
    <aside className={styles.container} data-testid="card-details">
      <h3>
        <strong>Name:</strong> {name}
      </h3>
      <div className={styles.sides}>
        {leftSide}
        {rightSide}
      </div>
      <NavLink to="/" className={styles.btn}>
        Close details
      </NavLink>
    </aside>
  );
}
