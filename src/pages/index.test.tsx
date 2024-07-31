import { render, screen } from '@testing-library/react';
import { IncomingMessage, ServerResponse } from 'http';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Socket } from 'net';
import { DUMMY_SPACECRAFTS_RESPONSE } from '@/shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import Home, { getServerSideProps } from '.';
import { SelectedItemsProvider } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';
import { ThemeProvider } from '@/features/providers/themeProvider';

const props = {
  spacecraftsRes: DUMMY_SPACECRAFTS_RESPONSE,
};

const socket = new Socket();
const mockReq = Object.assign(new IncomingMessage(socket), {
  cookies: {},
});

const mockRes = new ServerResponse(mockReq);

const spacecraftsContext: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> = {
  query: {},
  req: mockReq,
  res: mockRes,
  resolvedUrl: '',
  params: {},
};

vi.mock('next/router', () => {
  const router = {
    push: vi.fn(),
    query: { uid: 'test1' },
  };
  return {
    useRouter: vi.fn().mockReturnValue(router),
  };
});

describe('Home', () => {
  it('should render Home', () => {
    render(
      <SelectedItemsProvider>
        <ThemeProvider>
          <Home {...props} />
        </ThemeProvider>
      </SelectedItemsProvider>
    );

    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });

  it('should return valid props', async () => {
    const result = await getServerSideProps(spacecraftsContext);

    expect(result).toEqual({ props: { spacecraftsRes: DUMMY_SPACECRAFTS_RESPONSE } });
  });
});
