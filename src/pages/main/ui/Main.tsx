import React from 'react';
import Header from 'widgets/header';
import { SpacecraftsResponse } from 'entities/spacecraft/models';
import getData from 'shared/api/axiosMethods';
import { AxiosRequestConfig } from 'axios';
import Payload from 'shared/api/types/apiTypes';
import Loader from 'shared/ui/loader/Loader';
import SpaceCraftDetails from '../components/SpaceCraftDetails/SpaceCraftDetails';

import styles from './Main.module.scss';

export default function Main() {
  const pageSize = 10;

  const [data, setData] = React.useState<SpacecraftsResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const updateData = async (payload: Payload) => {
    setData(null);
    const options: AxiosRequestConfig = {
      params: {
        pageSize,
      },
    };
    try {
      const response = await getData('spacecraft/search', payload, options);
      setData(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

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
      <Header updateData={updateData} />
      <main className={styles.main}>
        <h1>Spacecrafts</h1>
        <ul className={styles.list}>{spacecraftsList}</ul>
      </main>
    </div>
  );
}
