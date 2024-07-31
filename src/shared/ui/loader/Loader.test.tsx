import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('should be render', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });
});
