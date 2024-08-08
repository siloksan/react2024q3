import { render, screen } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';

vi.mock('@remix-run/react', () => {
  function Link({ to, children }: { to: string; children: React.ReactNode }) {
    return <a href={to}>{children}</a>;
  }
  return {
    Link,
  };
});

describe('NotFoundPage', () => {
  it('should be render', () => {
    render(<NotFoundPage />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent(/404/i);
  });
});
