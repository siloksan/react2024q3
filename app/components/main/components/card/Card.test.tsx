import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import { DUMMY_SPACECRAFTS_RESPONSE } from '@/shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import Card from './Card';
import { SelectedItemsProvider } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';

const props = {
  spacecraft: DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0],
};

vi.mock('next/router', () => {
  const router = {
    push: vi.fn(),
    query: { uid: 'test1' },
  };
  return {
    useRouter: vi.fn().mockReturnValue(router),
  };
});

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
  };
});

function customRender() {
  render(
    <SelectedItemsProvider>
      <Card {...props} />
    </SelectedItemsProvider>
  );
}

describe('Card', () => {
  it('should renders Card', () => {
    customRender();

    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
  });

  it('should call openDetails when link is clicked', async () => {
    customRender();

    const link = screen.getByTestId('card');
    const user = userEvent.setup();

    await user.click(link);

    expect(useRouter().push).toHaveBeenCalledTimes(1);
  });

  it("should add class active when uid don't match with spacecraft.uid", async () => {
    customRender();

    const item = screen.getByRole('listitem');

    expect(item).toHaveClass(/active/i);
  });

  it('should be checked when checkbox is clicked', async () => {
    customRender();

    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("shouldn't be checked when checkbox is clicked twice", async () => {
    customRender();

    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(checkbox);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('should be in dark mode', async () => {
    customRender();

    const item = screen.getByRole('listitem');

    expect(item).toHaveClass(/dark/i);
  });
});
