import { render, screen } from '@testing-library/react';

import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders Pagination', () => {
    render(<Pagination currentPage={1} itemPerPage={10} updateData={() => {}} totalItems={100} searchTerm="" />);

    const header = screen.getByTestId('pagination');

    expect(header).toBeInTheDocument();
  });

  it('button for current page should be disabled', () => {
    const currentPage = 3;
    render(
      <Pagination currentPage={currentPage} itemPerPage={10} updateData={() => {}} totalItems={100} searchTerm="" />
    );

    const currentBtn = screen.getByRole('button', { name: currentPage.toString() });

    expect(currentBtn).toHaveProperty('disabled', true);
  });
  it('should correctly renders last page', () => {
    const currentPage = 3;
    const itemPerPage = 5;
    const totalItems = 67;
    const lastPage = Math.ceil(totalItems / itemPerPage);
    render(
      <Pagination
        currentPage={currentPage}
        itemPerPage={itemPerPage}
        updateData={() => {}}
        totalItems={totalItems}
        searchTerm=""
      />
    );

    const paginationButtons = screen.getAllByTestId('pagination-button');

    expect(paginationButtons[paginationButtons.length - 1]).toHaveTextContent(lastPage.toString());
  });
  it('should correctly renders three middle buttons', () => {
    const currentPage = 7;
    const itemPerPage = 5;
    const totalItems = 67;
    render(
      <Pagination
        currentPage={currentPage}
        itemPerPage={itemPerPage}
        updateData={() => {}}
        totalItems={totalItems}
        searchTerm=""
      />
    );

    const paginationButtons = screen.getAllByTestId('pagination-button');
    const middleButtons = paginationButtons.slice(2, 5);
    middleButtons.forEach((btn, idx) => {
      expect(btn).toHaveTextContent((currentPage - 1 + idx).toString());
    });
  });
});
