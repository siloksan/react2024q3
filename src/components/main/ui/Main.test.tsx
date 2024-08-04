import { act, render, screen } from '@testing-library/react';

import Main from './Main';
import { SelectedItemsProvider } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';
import { server } from '@/shared/api/mock/mocks/node';
import { handlersError } from '@/shared/api/mock/handlersError';

vi.mock('next/navigation', () => {
  const router = {
    push: vi.fn(),
  };
  const pathName = '/test1';
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
    useTheme: vi.fn().mockReturnValue(true),
  };
});

describe('Main', () => {
  it('renders Main', async () => {
    const jsx = await Main({ searchParams: {} });
    render(<SelectedItemsProvider>{jsx}</SelectedItemsProvider>);

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
  });

  it('throws an error when spacecraft data fails to load', async () => {
    server.use(handlersError.spacecraftsPost);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      await act(async () => {
        await Main({ searchParams: {} });
      });
    } catch (error) {
      expect(error).toEqual(new Error('The spacecrafts failed to load!'));
    }

    consoleErrorSpy.mockRestore();
  });
});
