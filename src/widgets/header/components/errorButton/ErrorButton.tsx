import React from 'react';

import styles from './ErrorButton.module.scss';

interface Props {}
interface State {
  hasError: boolean;
}
class ErrorButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;
    if (hasError) {
      throw new Error("It seems like you've broken something!");
    }
    return (
      <button type="button" onClick={this.throwError} className={styles.btn}>
        throw error
      </button>
    );
  }
}

export default ErrorButton;
