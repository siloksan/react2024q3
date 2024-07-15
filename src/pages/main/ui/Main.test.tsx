import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// import { server } from 'shared/api/mock/mocks/node';
import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
// import { handlersError } from 'shared/api/mock/handlersError';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import Main from './Main';

const customRender = () =>
  render(
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );

describe('Main', () => {
  it('renders Main', () => {
    customRender();

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
  });

  // it('throws an error when the request fails', async () => {
  //   server.use(handlersError.spacecraftsPost);

  //   const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  //   customRender();

  //   await waitFor(() => {
  //     const errorMessage = screen.getByRole('heading', { level: 2 });
  //     expect(errorMessage).toHaveTextContent(/Something went wrong!/i);
  //   });

  //   consoleErrorSpy.mockRestore();
  // });

  // it('renders loader and fetches data successfully', async () => {
  //   customRender();

  //   const loader = screen.getByTestId('loader');
  //   expect(loader).toBeInTheDocument();

  //   await waitFor(() => {
  //     const cardList = screen.getByTestId('card-list');

  //     expect(cardList).toBeInTheDocument();
  //   });
  // });
});
