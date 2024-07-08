import React from 'react';
import Header from 'widgets/header';
import { SpacecraftsResponse } from 'entities/spacecraft/models';
import getData from 'shared/api/axiosMethods';
import { AxiosRequestConfig } from 'axios';
import Payload from 'shared/api/types/apiTypes';
import Loader from 'shared/ui/loader/Loader';
import SpaceCraftDetails from '../components/SpaceCraftDetails/SpaceCraftDetails';

import styles from './Main.module.scss';

interface State {
  data: SpacecraftsResponse | null;
  error: string | null;
}

interface Props {}

export default class Main extends React.Component<Props, State> {
  public getData = getData;

  private pageSize = 10;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  public updateData = async (payload: Payload) => {
    this.setState({ data: null });
    const options: AxiosRequestConfig = {
      params: {
        pageSize: this.pageSize,
      },
    };
    try {
      const data = await this.getData('spacecraft/search', payload, options);
      this.setState({ data });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      }
    }
  };

  render() {
    const { data, error } = this.state;
    let spacecraftsList = data ? (
      data.spacecrafts.map((spacecraft) => {
        return <SpaceCraftDetails spacecraft={spacecraft} key={spacecraft.uid} />;
      })
    ) : (
      <Loader />
    );

    spacecraftsList =
      data && data.spacecrafts.length === 0 ? (
        <h3 className={styles.not_found}>No spacecrafts found</h3>
      ) : (
        spacecraftsList
      );

    if (error) {
      throw new Error(error);
    }
    return (
      <div>
        <Header updateData={this.updateData} />
        <main className={styles.main}>
          <h1>Spacecrafts</h1>
          <ul className={styles.list}>{spacecraftsList}</ul>
        </main>
      </div>
    );
  }
}
