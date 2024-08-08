import { render, screen } from '@testing-library/react';

import Header from './Header';

vi.mock('@remix-run/react', () => {
  const navigate = vi.fn();
  const params = { uid: 'test1' };
  const searchParams = new URLSearchParams();
  const setSearchParams = vi.fn();
  function Link({ to, children }: { to: string; children: React.ReactNode }) {
    return <a href={to}>{children}</a>;
  }
  return {
    useNavigate: vi.fn().mockReturnValue(navigate),
    useParams: vi.fn().mockReturnValue(params),
    useSearchParams: vi.fn().mockReturnValue([searchParams, setSearchParams]),
    Link,
  };
});

vi.mock('~/features/providers/themeProvider', () => {
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
