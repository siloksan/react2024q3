import { render, screen, waitFor } from '@testing-library/react';
import { server } from 'shared/api/mock/mocks/node';
import userEvent from '@testing-library/user-event';

import { handlersError } from 'shared/api/mock/handlersError';
import ErrorBoundary from 'shared/ui/errorBoundary/ErrorBoundary';
import CardDetails from './CardDetails';

describe('CardDetails', () => {
  const props = {
    id: 'test',
    closeDetails: () => {},
    setStorageSearchParams: () => {},
  };

  it('should renders CardDetails', async () => {
    render(<CardDetails {...props} />);

    const container = screen.getByTestId('card-details');

    expect(container).toBeInTheDocument();
  });
  it('should renders loader', async () => {
    render(<CardDetails {...props} />);

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('should fetch data successfully', async () => {
    render(<CardDetails {...props} />);

    await waitFor(() => {
      const h3 = screen.getByRole('heading', { level: 3 });

      expect(h3).toBeInTheDocument();
    });
  });

  it('should throws an error when the request fails', async () => {
    server.use(handlersError.spaceCraftGetDetails);

    render(
      <ErrorBoundary>
        <CardDetails {...props} />
      </ErrorBoundary>
    );

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await waitFor(() => {
      const errorMessage = screen.getByRole('heading', { level: 2 });
      expect(errorMessage).toHaveTextContent(/Something went wrong!/i);
    });

    consoleErrorSpy.mockRestore();
  });

  it('should call closeDetails when the button is clicked', async () => {
    const closeDetails = vi.fn();

    render(<CardDetails {...props} closeDetails={closeDetails} />);

    await waitFor(async () => {
      const button = screen.getByRole('button', { name: /close details/i });
      const user = userEvent.setup();
      await user.click(button);

      expect(closeDetails).toHaveBeenCalledOnce();
    });
  });
});
