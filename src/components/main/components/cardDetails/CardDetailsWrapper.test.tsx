import { act, render, screen } from '@testing-library/react';
import { server } from '@/shared/api/mock/mocks/node';
import { handlersError } from '@/shared/api/mock/handlersError';
import CardDetailsWrapper from './CardDetailsWrapper';

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

describe('CardDetailsWrapper', () => {
  it('renders CardDetailsWrapper', async () => {
    const jsx = await CardDetailsWrapper({ spacecraftId: 'test' });
    render(jsx);

    const cardDetails = screen.getByTestId('card-details');

    expect(cardDetails).toBeInTheDocument();
  });

  it('throws an error when spacecraft data fails to load', async () => {
    server.use(handlersError.spaceCraftGetDetails);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      await act(async () => {
        await CardDetailsWrapper({ spacecraftId: 'test' });
      });
    } catch (error) {
      expect(error).toEqual(new Error('The spacecraft failed to load!'));
    }

    consoleErrorSpy.mockRestore();
  });
});
