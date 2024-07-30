import { useEffect, useState } from 'react';

import formatData from '@/shared/lib/formatData/formatData';
import { useSelectedItems, useSelectedItemsUpdate } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';
import { useTheme } from '@/features/providers/themeProvider';
import Button from '../button/Button';

import styles from './Flyout.module.scss';

export default function Flyout() {
  const selectedItems = useSelectedItems();
  const numberOfSelectedItems = selectedItems.length;
  const [isUnmount, setIsUnmount] = useState(false);
  const dark = useTheme();

  useEffect(() => {
    if (numberOfSelectedItems > 0) {
      setIsUnmount(false);
    } else {
      setIsUnmount(true);
      const timeoutId = setTimeout(() => setIsUnmount(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [numberOfSelectedItems]);

  const update = useSelectedItemsUpdate();
  if (update === null) {
    return null;
  }

  const { clearSelectedItems } = update;

  const file = new Blob([formatData(selectedItems)], { type: 'text/csv' });
  const url = selectedItems.length > 0 ? URL.createObjectURL(file) : undefined;

  if (numberOfSelectedItems === 0 && !isUnmount) {
    return null;
  }

  let containerClassName = styles.container;
  if (numberOfSelectedItems === 0) {
    containerClassName += ` ${styles.hidden}`;
  }

  if (dark) {
    containerClassName += ` ${styles.dark}`;
  }

  return (
    <div className={containerClassName} data-testid="flyout">
      <p className={styles.info}>
        The number of selected items - <strong>{numberOfSelectedItems}</strong>
      </p>
      <div className={styles.buttons}>
        <Button onClick={clearSelectedItems}>Unselect all</Button>
        <Button>
          <a href={url} download={`${selectedItems.length}_spacecrafts.csv`}>
            Download
          </a>
        </Button>
      </div>
    </div>
  );
}
