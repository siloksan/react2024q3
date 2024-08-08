import { render, screen } from '@testing-library/react';

import ThemeToggle from './ThemeToggle';

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
    useThemeUpdate: vi.fn(),
  };
});

describe('ThemeToggle', () => {
  it('renders ThemeToggle', () => {
    render(<ThemeToggle />);

    const container = screen.getByTestId('toggle');

    expect(container).toBeInTheDocument();
  });
  it('should be in the dark mode', () => {
    render(<ThemeToggle />);

    const container = screen.getByTestId('toggle');

    expect(container).toHaveClass(/dark/i);
  });
});
