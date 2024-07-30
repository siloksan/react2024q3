import { useState } from 'react';
import { useRouter } from 'next/router';

import { useTheme } from '@/features/providers/themeProvider';
import { useSelectedItems, useSelectedItemsUpdate } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';
import { Spacecraft } from '@/entities/spacecraft/models';

import styles from './Card.module.scss';

interface Props {
  spacecraft: Spacecraft;
}

export default function Card({ spacecraft }: Props) {
  const router = useRouter();
  const dark = useTheme();
  const selectedItems = useSelectedItems();
  const [checked, setChecked] = useState(() => {
    return selectedItems.some((item) => item.uid === spacecraft.uid);
  });

  const update = useSelectedItemsUpdate();
  if (update === null) {
    return null;
  }

  const { addSelectedItem, removeSelectedItem } = update;

  const openDetails = () => {
    const { query } = router;
    const { uid, ...newQuery } = query;
    router.push({
      pathname: `/spacecraft/${spacecraft.uid}`,
      query: { ...newQuery },
    });
  };

  const { name } = spacecraft;

  let containerClassName = styles.container;

  if (dark) {
    containerClassName += ` ${styles.dark}`;
  }

  if (router.query.uid === spacecraft.uid) {
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
    setChecked(!checked);
  };

  return (
    <li className={containerClassName}>
      <div onClick={openDetails} className={styles.link}>
        <input
          className={styles.checkbox}
          type="checkbox"
          onClick={checkCard}
          checked={checked}
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
