import { GetServerSidePropsContext, PreviewData } from 'next/types';
import { ParsedUrlQuery } from 'querystring';

import { Spacecraft, SpacecraftsResponse } from '@/entities/spacecraft/models';
import getStringParam from '@/shared/lib/getStringParam/getStringParam';
import logger from '@/shared/lib/logger/logger';

import { baseUrl } from '../const';
import { Payload, QueryParams } from '../types';

export async function getSpacecrafts(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<SpacecraftsResponse | undefined> {
  const basePayload: Payload = {
    name: '',
    registry: '',
    status: '',
  };

  const { query } = context;
  const name = getStringParam(query, 'name');
  const pageNumber = getStringParam(query, 'pageNumber') || '1';
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

export async function getSpacecraft(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<Spacecraft | undefined> {
  const { params } = context;
  if (!params) return;

  try {
    const response = await fetch(`${baseUrl}spacecraft?${new URLSearchParams(params as QueryParams)}`, {
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
