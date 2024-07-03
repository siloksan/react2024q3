import React from 'react';
import StorageService from 'shared/api/utils/StorageService';
import Payload from 'shared/api/types/apiTypes';
import styles from './SearchBox.module.scss';
import loupe from './assets/search-icon.svg';

interface State {
  searchTerm: string;
}

interface Props {
  updateData: (payload: Payload) => void;
}

export default class SearchBox extends React.Component<Props, State> {
  private storageService = new StorageService('searchTerm');

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: this.storageService.getData() || '',
    };
  }

  componentDidMount(): void {
    const { searchTerm } = this.state;
    const { updateData } = this.props;
    updateData({ name: searchTerm });
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const trimString = value.trim();
    this.storageService.setData(trimString);
    this.setState({ searchTerm: trimString });
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    const { updateData } = this.props;
    updateData({ name: searchTerm });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <input
            value={searchTerm || ''}
            onChange={this.handleInput}
            onKeyDown={this.handleKeyDown}
            type="text"
            className={styles.input}
            placeholder="Search"
          />
          <button className={styles.button} aria-label="Search" type="submit" onClick={this.handleSubmit}>
            <img src={loupe} alt="loupe icon" />
          </button>
        </div>
      </div>
    );
  }
}
