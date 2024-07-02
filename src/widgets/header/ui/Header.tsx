import React from 'react';
import styles from './Header.module.scss';
import logo from '../assets/startreck-logo.png';
import SearchBox from '../components/search/SearchBox';

export default class Header extends React.PureComponent {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Startreck logo" />
        </div>
        <SearchBox />
      </header>
    );
  }
}
