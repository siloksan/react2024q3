import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';

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

describe('SearchBox', () => {
  it('should renders SearchBox', () => {
    render(<SearchBox />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
  it('should change value in input', async () => {
    render(<SearchBox />);
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });
});
