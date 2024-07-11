import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.container} data-testid="loader">
      <span className={styles.loader} />
    </div>
  );
}

export default Loader;
