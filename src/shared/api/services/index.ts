import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SpacecraftsResponse } from 'entities/spacecraft/models';
import { baseUrl } from '../const';
import { SpaceCraftsRequestParams } from '../types';

// interface SpaceCraftsRequestParams {
//   endpoint: string;
//   payload: Record<string, string>;
//   params: Record<string, string | number>;
// }

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
        method: 'POST',
        body: new URLSearchParams(payload).toString(),
        params,
      }),
    }),
  }),
});

export const { useGetItemsQuery } = starTrekApi;
