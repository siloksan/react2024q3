import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

describe('Layout', () => {
  it('should render layout', async () => {
    render(
      <RootLayout>
        <h1>Content</h1>
      </RootLayout>
    );

    const children = screen.getByRole('heading', { level: 1 });

    expect(children).toBeInTheDocument();
  });
});
