import { render, screen } from '@testing-library/react';
import Page from './page';

vi.mock('@/components/main', () => ({
  default: vi.fn().mockReturnValue(<main>main</main>),
}));

vi.mock('@/components/main/components/cardDetails/CardDetailsWrapper', () => ({
  default: vi.fn(),
}));

describe('spacecraft page', () => {
  it('should render spacecraft page', async () => {
    render(<Page params={{ spacecraftId: 'test' }} searchParams={{}} />);

    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });
});
