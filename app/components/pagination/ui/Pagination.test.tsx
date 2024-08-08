import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from '@remix-run/react';

import Pagination from './Pagination';

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

describe('Pagination', () => {
  const props = {
    currentPage: 1,
    itemPerPage: 10,
    totalItems: 100,
  };
  it('renders Pagination', () => {
    render(<Pagination {...props} />);

    const container = screen.getByTestId('pagination');
    expect(container).toBeInTheDocument();
  });
  it('button for current page should be disabled', () => {
    render(<Pagination {...props} />);
    const currentBtn = screen.getByRole('button', {
      name: props.currentPage.toString(),
    });
    expect(currentBtn).toHaveProperty('disabled', true);
  });
  it('should correctly renders last page', () => {
    const currentPage = 3;
    const itemPerPage = 5;
    const totalItems = 67;
    const lastPage = Math.ceil(totalItems / itemPerPage);

    render(<Pagination {...props} currentPage={currentPage} itemPerPage={itemPerPage} totalItems={totalItems} />);

    const paginationButtons = screen.getAllByTestId('pagination-button');

    expect(paginationButtons[paginationButtons.length - 1]).toHaveTextContent(lastPage.toString());
  });
  it('should correctly renders three middle buttons', () => {
    const currentPage = 7;
    const itemPerPage = 5;
    const totalItems = 67;
    render(<Pagination {...props} currentPage={currentPage} itemPerPage={itemPerPage} totalItems={totalItems} />);

    const paginationButtons = screen.getAllByTestId('pagination-button');
    const middleButtons = paginationButtons.slice(2, 5);

    middleButtons.forEach((btn, idx) => {
      expect(btn).toHaveTextContent((currentPage - 1 + idx).toString());
    });
  });

  it('should return null if totalPages < 2', () => {
    const { container } = render(<Pagination {...props} totalItems={1} />);

    expect(container.firstChild).toBeNull();
  });

  it('should call updateData when button is clicked', async () => {
    render(<Pagination {...props} />);

    const paginationButtons = screen.getAllByTestId('pagination-button');
    const user = userEvent.setup();
    await user.click(paginationButtons[2]);

    expect(useSearchParams()[1]).toHaveBeenCalled();
  });

  it('should disable next button if current page is equal to total pages', () => {
    const currentPage = 10;
    const itemPerPage = 5;
    const totalItems = 50;

    render(<Pagination {...props} currentPage={currentPage} itemPerPage={itemPerPage} totalItems={totalItems} />);

    const nextBtn = screen.getByRole('button', { name: /next/i });

    expect(nextBtn).toHaveProperty('disabled', true);
  });
});
