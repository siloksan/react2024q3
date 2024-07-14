import { useState } from 'react';
import styles from './ErrorButton.module.scss';

function ErrorButton() {
  const [error, setError] = useState(false);
  function throwError() {
    setError(true);
  }

  if (error) {
    throw new Error("It seems like you've broken something!");
  }
  return (
    <button type="button" onClick={throwError} className={styles.btn}>
      throw error
    </button>
  );
}

export default ErrorButton;
