import { render, screen } from '@testing-library/react';

import Header from './Header';

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
    useThemeUpdate: vi.fn(),
  };
});

describe('Header', () => {
  it('renders Header', () => {
    render(<Header />);

    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });
  it('should be in the dark mode', () => {
    render(<Header />);

    const header = screen.getByTestId('header');

    expect(header).toHaveClass(/dark/i);
  });
});
