import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Routes from './Routes';
// import Layout from './Layout';
// import Main from './Main';
// import NotFoundPage from './NotFoundPage';

// Mock the components
// vi.mock('./Layout', () => ({
//   default: () => <div>Layout Component</div>,
// }));
// vi.mock('./Main', () => ({
//   default: () => <div>Main Component</div>,
// }));
// vi.mock('./NotFoundPage', () => ({
//   default: () => <div>NotFound Page</div>,
// }));

describe('Routes component', () => {
  const renderWithRouter = (initialEntries: string[]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes />
      </MemoryRouter>
    );
  };

  it('should render Layout and Main component on root path', () => {
    renderWithRouter(['/']);

    const header = screen.getByTestId('header');
    const mainTitle = screen.getByRole('heading', { level: 1 });

    expect(header).toBeInTheDocument();
    expect(mainTitle).toHaveTextContent(/spacecrafts/i);
  });

  it('should render Layout and NotFoundPage component on unknown path', () => {
    renderWithRouter(['/unknown']);

    const header = screen.getByTestId('header');
    const notFoundPage = screen.getByRole('heading', { level: 1 });

    expect(header).toBeInTheDocument();
    expect(notFoundPage).toHaveTextContent(/404 Page Not Found/i);
  });
});
