// import { render, screen } from '@testing-library/react';
// import { Socket } from 'net';
// import { IncomingMessage, ServerResponse } from 'http';
// import { GetServerSidePropsContext, PreviewData } from 'next';
// import { ParsedUrlQuery } from 'querystring';
// import { SelectedItemsProvider } from '@/features/providers/selectedItemsProvider/SelectedItemsProvider';
// import { ThemeProvider } from '@/features/providers/themeProvider';
// import CardDetailsWrapper, { getServerSideProps } from './page';
// import { DUMMY_SPACECRAFTS_RESPONSE } from '@/shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
// import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '@/shared/api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';

// vi.mock('next/router', () => {
//   const router = {
//     push: vi.fn(),
//     query: { uid: 'test1' },
//   };
//   return {
//     useRouter: vi.fn().mockReturnValue(router),
//   };
// });

// const socket = new Socket();
// const mockReq = Object.assign(new IncomingMessage(socket), {
//   cookies: {},
// });

// const mockRes = new ServerResponse(mockReq);

// const spacecraftContext: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> = {
//   query: { uid: 'test' },
//   req: mockReq,
//   res: mockRes,
//   resolvedUrl: '',
//   params: {},
// };

describe('Home', () => {
  it.todo('renders Home');
  // it('should render Home', () => {
  //   render(
  //     <SelectedItemsProvider>
  //       <ThemeProvider>
  //         <CardDetailsWrapper spacecraft={DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0]} />
  //       </ThemeProvider>
  //     </SelectedItemsProvider>
  //   );

  //   const cardDetails = screen.getByTestId('card-details');

  //   expect(cardDetails).toBeInTheDocument();
  // });

  // it('should return valid props', async () => {
  //   const result = await getServerSideProps(spacecraftContext);

  //   expect(result).toEqual({
  //     props: { spacecraftsRes: DUMMY_SPACECRAFTS_RESPONSE, spacecraft: DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft },
  //   });
  // });
});
