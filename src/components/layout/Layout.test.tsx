import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
  it('renders Layout', () => {
    render(<Layout />, { wrapper: BrowserRouter });

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
