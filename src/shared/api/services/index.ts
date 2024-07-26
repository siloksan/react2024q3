import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Spacecraft, SpacecraftsResponse } from '@/entities/spacecraft/models';
import { HYDRATE } from 'next-redux-wrapper';

import { SpaceCraftRequestParams, SpaceCraftsRequestParams } from '../types';
import { RootState } from '@/shared/store';
import { baseUrl } from '../const';
import { Action, PayloadAction } from '@reduxjs/toolkit/react';

const baseQuery = fetchBaseQuery({
  baseUrl,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 7777,
  method: 'POST',
});

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const starTrekApi = createApi({
  reducerPath: 'starTrekApi',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getItems: builder.query<SpacecraftsResponse, SpaceCraftsRequestParams>({
      query: ({ endpoint, payload, params }) => ({
        url: endpoint,
        body: new URLSearchParams(payload).toString(),
        params,
      }),
    }),
    getItem: builder.query<{ spacecraft: Spacecraft }, SpaceCraftRequestParams>(
      {
        query: ({ endpoint, params }) => ({
          url: endpoint,
          params,
          method: 'GET',
        }),
      }
    ),
  }),
});

export const { useGetItemsQuery, useGetItemQuery, util: { getRunningQueriesThunk }, } = starTrekApi;

export const { getItems, getItem } = starTrekApi.endpoints;