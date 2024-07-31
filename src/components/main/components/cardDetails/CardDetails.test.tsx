import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { DUMMY_SPACECRAFTS_RESPONSE } from '@/shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import CardDetails from './CardDetails';
import { SelectedItemsProvider } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';
import { ThemeProvider } from '@/features/providers/themeProvider';
import { SpacecraftClass } from '@/entities/spacecraft/models';

const props = {
  spacecraft: DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0],
};

const spacecraftClass: SpacecraftClass = {
  activeFrom: '25th century',
  activeTo: '25th century',
  alternateReality: false,
  crew: '1',
  mirror: false,
  name: 'Space Transport',
  numberOfDecks: '1',
  species: 'Human',
  uid: 'SCMA0000278211',
  warpCapable: true,
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

describe('CardDetails', () => {
  function customRender() {
    render(
      <SelectedItemsProvider>
        <ThemeProvider>
          <CardDetails {...props} />
        </ThemeProvider>
      </SelectedItemsProvider>
    );
  }

  it('should renders CardDetails', async () => {
    customRender();

    const container = screen.getByTestId('card-details');

    expect(container).toBeInTheDocument();
  });

  it('should call closeDetails when close button is clicked', async () => {
    customRender();

    const button = screen.getByRole('button', { name: /close/i });
    const user = userEvent.setup();

    await user.click(button);

    expect(useRouter().push).toHaveBeenCalledTimes(1);
  });

  it("should't have right side when spacecraftClass is null", async () => {
    customRender();

    const rightSide = screen.queryByTestId('right-side');

    expect(rightSide).not.toBeInTheDocument();
  });

  it('should have right side when spacecraftClass is not null', async () => {
    props.spacecraft.spacecraftClass = spacecraftClass;
    customRender();

    const rightSide = screen.getByTestId('right-side');

    expect(rightSide).toBeInTheDocument();
  });
});
