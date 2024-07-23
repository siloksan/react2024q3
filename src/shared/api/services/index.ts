import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Spacecraft, SpacecraftsResponse } from '@/entities/spacecraft/models';
import { SpaceCraftRequestParams, SpaceCraftsRequestParams } from '../types';

import { baseUrl } from '../const';

const baseQuery = fetchBaseQuery({
  baseUrl,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 7777,
  method: 'POST',
});

export const starTrekApi = createApi({
  reducerPath: 'starTrekApi',
  baseQuery,
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

starTrekApi.endpoints.getItems.select = () => ({});

export const { useGetItemsQuery, useGetItemQuery } = starTrekApi;
