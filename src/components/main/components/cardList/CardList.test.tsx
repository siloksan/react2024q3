import { render, screen } from '@testing-library/react';

import CardList from './CardList';

describe('CardList', () => {
  it('should renders CardList', () => {
    render(<CardList spacecrafts={[]} />);

    const container = screen.getByTestId('card-list');

    expect(container).toBeInTheDocument();
  });

  it('should have not found when no spacecrafts', () => {
    render(<CardList spacecrafts={[]} />);

    const item = screen.getByRole('listitem');

    expect(item).toHaveTextContent(/no spacecrafts found/i);
  });
});
