import { render, screen } from '@testing-library/react';
import Layout from './Wrapper';

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
    useThemeUpdate: vi.fn(),
  };
});

describe('Layout', () => {
  const children = <div>test</div>;
  it('renders Layout', () => {
    render(<Layout>{children}</Layout>);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('should be in dark mode', () => {
    render(<Layout>{children}</Layout>);

    const container = screen.getByTestId('layout');
    expect(container).toHaveClass(/dark/i);
  });
});
