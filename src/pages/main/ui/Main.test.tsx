import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { server } from 'shared/api/mock/mocks/node';
import { http, HttpResponse } from 'msw';
import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
import Main from './Main';

const customRender = () =>
  render(
    <ErrorBoundary>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ErrorBoundary>
  );

describe('Main', () => {
  it('renders Main', () => {
    customRender();

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
  });

  it('throws an error when the request fails', async () => {
    server.use(
      http.post('https://stapi.co/api/v2/rest/spacecraft/search', ({ request }) => {
        const url = new URL(request.url);

        url.searchParams.set('pageNumber', '');
        url.searchParams.set('pageSize', '10');
        return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      })
    );
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    customRender();

    await waitFor(() => {
      const errorMessage = screen.getByRole('heading', { level: 2 });
      expect(errorMessage).toHaveTextContent(/Something went wrong!/i);
    });

    consoleErrorSpy.mockRestore();
  });

  it('renders loader and fetches data successfully', async () => {
    customRender();

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      const cardList = screen.getByTestId('card-list');

      expect(cardList).toBeInTheDocument();
    });
  });
});
