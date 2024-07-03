import React from 'react';
import Payload from 'shared/api/types/apiTypes';
import styles from './Header.module.scss';
import logo from '../assets/startreck-logo.png';
import SearchBox from '../components/search/SearchBox';

interface State {}
interface Props {
  updateData: (payload: Payload) => void;
}

export default class Header extends React.PureComponent<Props, State> {
  render() {
    const { updateData } = this.props;
    return (
      <header className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Startreck logo" />
        </div>
        <SearchBox updateData={updateData} />
      </header>
    );
  }
}
