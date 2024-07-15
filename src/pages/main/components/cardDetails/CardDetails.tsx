import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from 'shared/ui/loader/Loader';

import { useGetItemQuery } from 'shared/api/services';
import { SpaceCraftRequestParams } from 'shared/api/types';
import styles from './CardDetails.module.scss';

export default function CardDetails() {
  const { spacecraftId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestParams: SpaceCraftRequestParams = { endpoint: 'spacecraft', params: { uid: spacecraftId || '' } };

  const closeDetails = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  const { data, error, isFetching } = useGetItemQuery(requestParams);

  if (error) {
    if (error) {
      throw new Error('Failed to fetch data details in CardDetails');
    }
  }

  if (isFetching || !data) {
    return (
      <aside className={styles.container} data-testid="card-details">
        <Loader />
      </aside>
    );
  }

  const { spacecraft } = data;

  const { name, spacecraftClass } = spacecraft;

  const owner = spacecraft.owner ? spacecraft.owner.name : 'unknown';
  const registry = spacecraft.registry ? spacecraft.registry : 'unknown';
  const operator = spacecraft.operator ? spacecraft.operator.name : 'unknown';
  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

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
      <button className={styles.btn} onClick={closeDetails} type="button">
        Close details
      </button>
    </aside>
  );
}
