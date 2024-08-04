import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SearchBox from './SearchBox';

vi.mock('next/navigation', () => {
  const router = {
    push: vi.fn(),
  };
  const pathName = '/test';
  return {
    useRouter: vi.fn().mockReturnValue(router),
    usePathname: vi.fn().mockReturnValue(pathName),
    useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
  };
});

vi.mock('@/shared/lib/useQueryString/useQueryString', () => {
  return {
    useQueryString: vi.fn().mockReturnValue({
      createQueryString: vi.fn(),
    }),
  };
});

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(false),
  };
});

describe('SearchBox', () => {
  const props = {
    searchTerm: '',
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
    expect(useRouter().push).toHaveBeenCalledOnce();
  });
  it('should change value in input', async () => {
    render(<SearchBox {...props} />);
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });
});
