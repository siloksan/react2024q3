import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  const props = {
    setSearchTerm: vi.fn(),
    searchTerm: '',
    setPageNumber: vi.fn(),
  };

  const customRender = () =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchBox {...props} />
        </Provider>
      </BrowserRouter>
    );
  it('should renders SearchBox', () => {
    customRender();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
  it('should call updateData when button is clicked', async () => {
    customRender();
    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);
    expect(props.setSearchTerm).toHaveBeenCalledOnce();
  });
  it('should change value in input', async () => {
    customRender();
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });
});
