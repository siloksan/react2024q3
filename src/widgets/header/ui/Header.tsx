import React from 'react';
import styles from './Header.module.scss';

export default class Header extends React.PureComponent {
  render() {
    return <header className={styles.container}>Search</header>;
  }
}
