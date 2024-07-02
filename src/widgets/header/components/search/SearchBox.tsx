import React from 'react';
import styles from './SearchBox.module.scss';
import loupe from './assets/search-icon.svg';

export default class SearchBox extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <form className={styles.form}>
          <input type="text" className={styles.input} placeholder="Search" />
          <button className={styles.button} aria-label="Search" type="submit">
            <img src={loupe} alt="loupe icon" />
          </button>
        </form>
      </div>
    );
  }
}
