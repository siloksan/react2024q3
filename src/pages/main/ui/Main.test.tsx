import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import Main from './Main';

const customRender = () =>
  render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );

describe('Main', () => {
  beforeEach(() => {
    vi.mock('shared/api/axiosMethods', () => ({
      getData: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Main', () => {
    customRender();

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
  });
});
