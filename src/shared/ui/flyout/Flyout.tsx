import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'app/store';

import { removeAll } from 'features/reduxSlices/selectedItems';
import { useEffect, useState } from 'react';
import spacecrafts from 'features/reduxSlices/spacecrafts';
import formatData from 'shared/lib/formatData/formatData';
import { useTheme } from 'app/providers/themeProvider';
import styles from './Flyout.module.scss';
import Button from '../button/Button';

export default function Flyout() {
  const selectedItems = useSelector((state: RootState) => state.selectedItems.value);
  const dispatch = useDispatch();
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

  const unselectAll = () => {
    dispatch(removeAll());
  };

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
        <Button onClick={unselectAll}>Unselect all</Button>
        <Button>
          <a href={url} download={`${spacecrafts.length}_spacecrafts.csv`}>
            Download
          </a>
        </Button>
      </div>
    </div>
  );
}
