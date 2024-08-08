import { render, screen } from '@testing-library/react';

import { SpacecraftClass } from '~/entities/spacecraft/models';
import { DUMMY_SPACECRAFTS_RESPONSE } from '~/shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { SelectedItemsProvider } from '~/features/providers/selectedItemsProvider';
import CardDetails from './CardDetails';

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

vi.mock('@remix-run/react', () => {
  const navigate = vi.fn();
  const params = { uid: 'test1' };
  const searchParams = new URLSearchParams();
  const setSearchParams = vi.fn();
  return {
    useNavigate: vi.fn().mockReturnValue(navigate),
    useParams: vi.fn().mockReturnValue(params),
    useSearchParams: vi.fn().mockReturnValue([searchParams, setSearchParams]),
  };
});

vi.mock('~/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
  };
});

describe('CardDetails', () => {
  function customRender() {
    render(
      <SelectedItemsProvider>
        <CardDetails {...props} />
      </SelectedItemsProvider>
    );
  }

  it('should renders CardDetails', async () => {
    customRender();

    const container = screen.getByTestId('card-details');

    expect(container).toBeInTheDocument();
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

  it('should be in dark mode', async () => {
    customRender();

    const container = screen.getByTestId('card-details');

    expect(container).toHaveClass(/dark/i);
  });
});
