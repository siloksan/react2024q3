import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Pagination, { PropsPagination } from './Pagination';

const customRender = (props: PropsPagination) =>
  render(
    <BrowserRouter>
      <Pagination {...props} />
    </BrowserRouter>
  );

describe('Pagination', () => {
  const props = {
    currentPage: 1,
    itemPerPage: 10,
    setPageNumber: vi.fn(),
    totalItems: 100,
  };
  it('renders Pagination', () => {
    customRender(props);

    const container = screen.getByTestId('pagination');
    expect(container).toBeInTheDocument();
  });
  it('button for current page should be disabled', () => {
    customRender(props);
    const currentBtn = screen.getByRole('button', { name: props.currentPage.toString() });
    expect(currentBtn).toHaveProperty('disabled', true);
  });
  it('should correctly renders last page', () => {
    const currentPage = 3;
    const itemPerPage = 5;
    const totalItems = 67;
    const lastPage = Math.ceil(totalItems / itemPerPage);

    customRender({ ...props, currentPage, itemPerPage, totalItems });

    const paginationButtons = screen.getAllByTestId('pagination-button');

    expect(paginationButtons[paginationButtons.length - 1]).toHaveTextContent(lastPage.toString());
  });
  it('should correctly renders three middle buttons', () => {
    const currentPage = 7;
    const itemPerPage = 5;
    const totalItems = 67;
    customRender({ ...props, currentPage, itemPerPage, totalItems });

    const paginationButtons = screen.getAllByTestId('pagination-button');
    const middleButtons = paginationButtons.slice(2, 5);

    middleButtons.forEach((btn, idx) => {
      expect(btn).toHaveTextContent((currentPage - 1 + idx).toString());
    });
  });

  it('should return null if totalPages < 2', () => {
    const { container } = customRender({ ...props, totalItems: 1 });

    expect(container.firstChild).toBeNull();
  });

  it('should call updateData when button is clicked', async () => {
    customRender(props);

    const paginationButtons = screen.getAllByTestId('pagination-button');
    const user = userEvent.setup();
    await user.click(paginationButtons[2]);

    expect(props.setPageNumber).toHaveBeenCalled();
  });

  it('should disable next button if current page is equal to total pages', () => {
    const currentPage = 10;
    const itemPerPage = 5;
    const totalItems = 50;

    customRender({ ...props, currentPage, itemPerPage, totalItems });

    const nextBtn = screen.getByRole('button', { name: /next/i });

    expect(nextBtn).toHaveProperty('disabled', true);
  });
});
