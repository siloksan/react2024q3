import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SpacecraftsResponse } from 'entities/spacecraft/models';
import { baseUrl } from '../const';
import { SpaceCraftsRequestParams } from '../types';

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
    getItem: builder.query({
      query: ({ endpoint, params }) => ({
        url: endpoint,
        params,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetItemsQuery, useGetItemQuery } = starTrekApi;
