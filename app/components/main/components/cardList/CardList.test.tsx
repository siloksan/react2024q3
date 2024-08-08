import { render, screen } from '@testing-library/react';

import CardList from './CardList';

vi.mock('@remix-run/react', () => {
  const params = { uid: 'test1' };
  return {
    useNavigation: vi.fn().mockReturnValue({ state: 'idle' }),
    useParams: vi.fn().mockReturnValue(params),
  };
});

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
