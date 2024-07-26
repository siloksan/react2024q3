// import { useDispatch, useSelector } from 'react-redux';

import { Spacecraft } from '@/entities/spacecraft/models';
import { useTheme } from '@/features/providers/themeProvider';

import styles from './Card.module.scss';
import { useRouter } from 'next/router';

interface Props {
  spacecraft: Spacecraft;
}

export default function Card({ spacecraft }: Props) {
  const router = useRouter();
  
  const openDetails = () => {
    const { query } = router;
    const { uid, ...newQuery } = query;
    router.push({ pathname: `/spacecraft/${spacecraft.uid}`, query: { ...newQuery } });
  };

  const { name } = spacecraft;
  // const { spacecraftId } = useParams();
  // const selectedItems = useSelector(
  //   (state: RootState) => state.selectedItems.value
  // );
  // const dispatch = useDispatch();
  const dark = useTheme();

  let containerClassName = styles.container;

  if (dark) {
    containerClassName += ` ${styles.dark}`;
  }

  // if (spacecraftId === spacecraft.uid) {
  //   containerClassName += ` ${styles.active}`;
  // }

  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

  // const [searchParams] = useSearchParams();

  const checkCard: React.ComponentProps<'input'>['onClick'] = (e) => {
    e.stopPropagation();
    // if (e.target instanceof HTMLInputElement) {
    //   const { checked } = e.target;
    //   if (checked) {
    //     dispatch({ type: 'selectedItems/selectItem', payload: spacecraft });
    //   } else {
    //     dispatch({ type: 'selectedItems/removeItem', payload: spacecraft });
    //   }
    // }
  };

  // const isChecked = selectedItems.some((item) => item.uid === spacecraft.uid);

  return (
    <li className={containerClassName}>
      <div 
        onClick={openDetails}
        className={styles.link}
      >
        <input
          className={styles.checkbox}
          type="checkbox"
          onClick={checkCard}
          // checked={isChecked}
          onChange={() => {}}
        />
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
