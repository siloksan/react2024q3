import { Spacecraft } from '~/entities/spacecraft/models';
import { useTheme } from '~/features/providers/themeProvider';
import { useSelectedItems, useSelectedItemsUpdate } from '~/features/providers/selectedItemsProvider';
import { useNavigate, useParams, useSearchParams } from '@remix-run/react';
import styles from './Card.module.scss';

interface Props {
  spacecraft: Spacecraft;
}

export default function Card({ spacecraft }: Props) {
  const dark = useTheme();
  const params = useParams();
  const selectedItems = useSelectedItems();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checked = selectedItems.some((item) => item.uid === spacecraft.uid);

  const { addSelectedItem, removeSelectedItem } = useSelectedItemsUpdate();

  const openDetails = () => {
    navigate({
      pathname: `/spacecraft/${spacecraft.uid}`,
      search: `${searchParams.toString()}`,
    });
  };

  const { name } = spacecraft;

  let containerClassName = styles.container;

  if (dark) {
    containerClassName += ` ${styles.dark}`;
  }

  if (params.uid === spacecraft.uid) {
    containerClassName += ` ${styles.active}`;
  }

  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

  const checkCard: React.ComponentProps<'input'>['onClick'] = (e) => {
    e.stopPropagation();
    if (checked) {
      removeSelectedItem(spacecraft);
    } else {
      addSelectedItem(spacecraft);
    }
  };

  return (
    <li className={containerClassName}>
      <div
        onClick={openDetails}
        className={styles.link}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        data-testid="card"
      >
        <input className={styles.checkbox} type="checkbox" onClick={checkCard} checked={checked} onChange={() => {}} />
        <div>
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
      </div>
    </li>
  );
}
