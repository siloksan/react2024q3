import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  const props = {
    setSearchTerm: vi.fn(),
    searchTerm: '',
    setPageNumber: vi.fn(),
  };

  it('should renders SearchBox', () => {
    render(<SearchBox {...props} />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should call updateData when button is clicked', async () => {
    render(<SearchBox {...props} />);

    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(button);

    expect(props.setSearchTerm).toHaveBeenCalledOnce();
  });

  it('should change value in input', async () => {
    render(<SearchBox {...props} />);

    const input = screen.getByRole('textbox');

    const user = userEvent.setup();
    await user.type(input, 'test');

    expect(input).toHaveValue('test');
  });
});
