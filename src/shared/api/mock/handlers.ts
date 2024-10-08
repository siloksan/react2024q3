import { delay, http, HttpResponse } from 'msw';
import { DUMMY_SPACECRAFTS_RESPONSE } from './mocks/dummyData/dummySpaceCraftsResponse';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from './mocks/dummyData/dummySpaceCraftDetailsResponse';

export const handlers = [
  http.post('https://stapi.co/api/v2/rest/spacecraft/search', async ({ request }) => {
    const url = new URL(request.url);

    url.searchParams.set('pageNumber', '');
    url.searchParams.set('pageSize', '10');
    await delay(150);
    return HttpResponse.json(DUMMY_SPACECRAFTS_RESPONSE);
  }),

  http.get('https://stapi.co/api/v2/rest/spacecraft', async ({ request }) => {
    const url = new URL(request.url);

    url.searchParams.set('uid', 'test');
    await delay(150);
    return HttpResponse.json(DUMMY_SPACECRAFT_DETAILS_RESPONSE);
  }),
];
