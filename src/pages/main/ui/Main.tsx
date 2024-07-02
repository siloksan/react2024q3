import React from 'react';
import Header from 'widgets/header';

import styles from './Main.module.scss';

export default class Main extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <main className={styles.main}>LIST</main>
      </div>
    );
  }
}
