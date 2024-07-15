import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { routesConfig } from './Routes';

describe('Routes component', () => {
  it('should render Layout and Main component on root path', () => {
    const memoryRouter = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );

    const header = screen.getByTestId('header');
    const mainTitle = screen.getByRole('heading', { level: 1 });

    expect(header).toBeInTheDocument();
    expect(mainTitle).toHaveTextContent(/spacecrafts/i);
  });

  it('should render Layout and NotFoundPage component on unknown path', () => {
    const memoryRouter = createMemoryRouter(routesConfig, {
      initialEntries: ['/unknown'],
    });

    render(<RouterProvider router={memoryRouter} />);
    const header = screen.getByTestId('header');
    const notFoundPage = screen.getByRole('heading', { level: 1 });

    expect(header).toBeInTheDocument();
    expect(notFoundPage).toHaveTextContent(/404 Page Not Found/i);
  });
});
