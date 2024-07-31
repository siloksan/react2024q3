import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders Header', () => {
    render(<Header />);

    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });
});
