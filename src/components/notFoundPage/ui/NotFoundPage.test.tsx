import { render, screen } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should be render', () => {
    render(<NotFoundPage />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent(/404/i);
  });
});
