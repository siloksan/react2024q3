import { render, screen } from '@testing-library/react';
import ErrorPage from './error';

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
  };
});

describe('Error', () => {
  it('should render Wrapper', async () => {
    render(<ErrorPage error={new Error()} reset={() => {}} />);

    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2).toBeInTheDocument();
  });
});
