import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  const children = <div>test</div>;
  it('renders Layout', () => {
    render(<Layout>{children}</Layout>);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
