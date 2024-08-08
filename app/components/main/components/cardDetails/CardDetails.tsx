import { Spacecraft } from '~/entities/spacecraft/models';
import { useTheme } from '~/features/providers/themeProvider';

import { useNavigate, useNavigation, useSearchParams } from '@remix-run/react';
import Button from '~/shared/ui/button/Button';

import Loader from '~/shared/ui/loader/Loader';
import styles from './CardDetails.module.scss';

interface Props {
  spacecraft: Spacecraft;
}

export default function CardDetails({ spacecraft }: Props) {
  const dark = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state } = useNavigation();

  if (state === 'loading') return <Loader />;

  const closeDetails = () => {
    navigate({
      pathname: '/',
      search: `${searchParams.toString()}`,
    });
  };

  const { name, spacecraftClass } = spacecraft;

  const owner = spacecraft.owner ? spacecraft.owner.name : 'unknown';
  const registry = spacecraft.registry ? spacecraft.registry : 'unknown';
  const operator = spacecraft.operator ? spacecraft.operator.name : 'unknown';
  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

  let containerClass = styles.container;
  if (dark) {
    containerClass += ` ${styles.dark}`;
  }

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
    <div data-testid="right-side">
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
    <aside className={containerClass} data-testid="card-details">
      <h3>
        <strong>Name:</strong> {name}
      </h3>
      <div className={styles.sides}>
        {leftSide}
        {rightSide}
      </div>
      <Button onClick={closeDetails}>Close details</Button>
    </aside>
  );
}
