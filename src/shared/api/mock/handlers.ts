import { http, HttpResponse } from 'msw';
import { DUMMY_SPACE_CRAFTS_RESPONSE } from './mocks/dummyData/dummySpaceCraftsResponse';

export const handlers = [
  http.post('https://stapi.co/api/v2/rest/spacecraft/search', ({ request }) => {
    const url = new URL(request.url);

    url.searchParams.set('pageNumber', '');
    url.searchParams.set('pageSize', '10');

    return HttpResponse.json(DUMMY_SPACE_CRAFTS_RESPONSE);
  }),
];
