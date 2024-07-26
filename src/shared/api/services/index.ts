import { Spacecraft, SpacecraftsResponse } from '@/entities/spacecraft/models';
import { baseUrl } from '../const';
import { Payload, QueryParams } from '../types';
import { GetServerSidePropsContext, PreviewData } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import getStringParam from '@/shared/lib/getStringParam/getStringParam';

export async function getSpacecrafts(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<SpacecraftsResponse | undefined> {
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
  }

  const newPayload: Record<string, string> = {...basePayload, ...{ name } };
  try {
    const response = await fetch(
      `${baseUrl}spacecraft/search?${new URLSearchParams(queryParams)}`,
      {
        method: 'POST',
        body: new URLSearchParams(newPayload).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching spacecrafts:', error);
  }
}

export async function getSpacecraft(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<Spacecraft | undefined> {
  const { params } = context
  console.log('params: ', params);
  if (!params) return;

  try {
    const response = await fetch(
      `${baseUrl}spacecraft?${new URLSearchParams(params as QueryParams)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('data: ', data);
    return data.spacecraft;
  } catch (error) {
    console.error('Error fetching spacecraft:', error);
  }
}
