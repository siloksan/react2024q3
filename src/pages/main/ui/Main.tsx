import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import getData from 'shared/api/axiosMethods';
import Loader from 'shared/ui/loader/Loader';

import SearchBox from 'shared/ui/search/SearchBox';

import Payload from 'shared/api/types/apiTypes';

import { SpacecraftsResponse } from 'entities/spacecraft/models';
import SpaceCraftDetails from '../components/SpaceCraftDetails/SpaceCraftDetails';
import styles from './Main.module.scss';

export default function Main() {
  const pageSize = 10;

  const [data, setData] = useState<SpacecraftsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    <>
      <h1 className={styles.title}>Spacecrafts</h1>
      <SearchBox updateData={updateData} />
      <ul className={styles.list}>{spacecraftsList}</ul>
    </>
  );
}
