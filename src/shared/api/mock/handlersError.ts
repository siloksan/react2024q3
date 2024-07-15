import { delay, http, HttpResponse } from 'msw';

export const handlersError = {
  spacecraftsPost: http.post('https://stapi.co/api/v2/rest/spacecraft/search?', async ({ request }) => {
    const url = new URL(request.url);

    url.searchParams.set('pageNumber', '0');
    url.searchParams.set('pageSize', '5');
    await delay(150);
    return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }),
  spaceCraftGetDetails: http.get('https://stapi.co/api/v2/rest/spacecraft', async ({ request }) => {
    const url = new URL(request.url);

    url.searchParams.set('uid', 'error');

    await delay(150);
    return HttpResponse.json({ message: 'Internal Server Error' }, { status: 404 });
  }),
};
