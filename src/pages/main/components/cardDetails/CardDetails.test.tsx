import { render, screen, waitFor } from '@testing-library/react';
import { server } from 'shared/api/mock/mocks/node';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { handlersError } from 'shared/api/mock/handlersError';
import CardDetails from './CardDetails';

describe('CardDetails', () => {
  function customRender(id: string) {
    const routes = [
      {
        path: '/details/:spacecraftId',
        element: <CardDetails />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/details/${id}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);
  }

  it('should renders CardDetails', async () => {
    customRender('test');

    const container = screen.getByTestId('card-details');

    expect(container).toBeInTheDocument();
  });
  it('should renders loader', async () => {
    customRender('test');

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('should fetch data successfully', async () => {
    customRender('test');

    await waitFor(() => {
      const h3 = screen.getByRole('heading', { level: 3 });

      expect(h3).toBeInTheDocument();
    });
  });

  it('should throws an error when the request fails', async () => {
    server.use(handlersError.spaceCraftGetDetails);

    customRender('test');

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await waitFor(() => {
      const errorMessage = screen.getByText(/Hey developer/i);
      expect(errorMessage).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });
});
