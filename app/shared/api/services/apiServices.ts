import getStringParam from '~/shared/lib/getStringParam/getStringParam';
import { Spacecraft, SpacecraftsResponse } from '~/entities/spacecraft/models';
import logger from '~/shared/lib/logger/logger';
import { baseUrl } from '../const';
import { Payload } from '../types';

export async function getSpacecrafts(searchParams: URLSearchParams): Promise<SpacecraftsResponse | undefined> {
  const basePayload: Payload = {
    name: '',
    registry: '',
    status: '',
  };

  const name = getStringParam(searchParams, 'name');
  const pageNumber = getStringParam(searchParams, 'pageNumber') || '1';
  const queryParams = {
    pageNumber: (Number(pageNumber) - 1).toString(),
    pageSize: '5',
  };

  const newPayload: Record<string, string> = { ...basePayload, ...{ name } };
  try {
    const response = await fetch(`${baseUrl}spacecraft/search?${new URLSearchParams(queryParams)}`, {
      method: 'POST',
      body: new URLSearchParams(newPayload).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) logger.error(error.message);
  }
}

export async function getSpacecraft({ uid }: { uid: string }): Promise<Spacecraft | undefined> {
  try {
    const response = await fetch(`${baseUrl}spacecraft?uid=${uid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.spacecraft;
  } catch (error) {
    if (error instanceof Error) logger.error(error.message);
  }
}
