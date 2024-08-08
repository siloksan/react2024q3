import { render, screen } from '@testing-library/react';

import { DUMMY_SPACECRAFTS_RESPONSE } from '~/shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import Provider from '~/features/providers';
import Main from './Main';

const props = {
  spacecraftsRes: DUMMY_SPACECRAFTS_RESPONSE,
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
    useNavigation: vi.fn().mockReturnValue({ state: 'idle' }),
  };
});

describe('Main', () => {
  function customRender() {
    render(
      <Provider>
        <Main {...props}>
          <div>child</div>
        </Main>
      </Provider>
    );
  }
  it('renders Main', () => {
    customRender();

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
  });
});
