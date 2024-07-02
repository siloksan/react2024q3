import React from 'react';
import Header from 'widgets/header';
import { SpacecraftsResponse } from 'entities/spacecraft/models';

import getData from 'shared/api/axiosMethods';
import styles from './Main.module.scss';
import SpaceCraftDetails from '../components/SpaceCraftDetails/SpaceCraftDetails';

interface State {
  data: SpacecraftsResponse | null;
  error: string | null;
}
export default class Main extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  async componentDidMount() {
    const params = {
      pageNumber: 1,
      pageSize: 5,
    };
    try {
      const data = await getData('spacecraft/search', { params });
      this.setState({ data });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      }
    }
  }

  render() {
    const { data, error } = this.state;

    if (!data) {
      return <div>Loading...</div>;
    }

    const spacecraftsList = data.spacecrafts.map((spacecraft) => {
      return <SpaceCraftDetails spacecraft={spacecraft} key={spacecraft.uid} />;
    });

    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <div>
        <Header />
        <main className={styles.main}>
          <h1>Spacecrafts</h1>
          <ul className={styles.list}>{spacecraftsList}</ul>
        </main>
      </div>
    );
  }
}
