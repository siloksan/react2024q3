import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelectedItemsUpdate } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';
import Flyout from './Flyout';

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
  };
});

vi.mock('@/features/providers/selectedItemsProvider/SelectedItemsProvider', () => {
  return {
    useSelectedItemsUpdate: vi.fn().mockReturnValue({
      clearSelectedItems: vi.fn(),
    }),
    useSelectedItems: vi.fn().mockReturnValue([]),
  };
});

describe('Flyout', () => {
  it('should render Flyout', () => {
    render(<Flyout />);

    const flyout = screen.getByTestId('flyout');

    expect(flyout).toBeInTheDocument();
  });

  it('should unselected all items when button clicked', async () => {
    render(<Flyout />);

    const button = screen.getByRole('button', { name: /unselect/i });
    const user = userEvent.setup();
    await user.click(button);

    expect(useSelectedItemsUpdate().clearSelectedItems).toHaveBeenCalledOnce();
  });
});
