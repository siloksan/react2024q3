import { GetServerSidePropsContext, PreviewData } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { ParsedUrlQuery } from 'querystring';
import { getSpacecraft, getSpacecrafts } from './apiServices';
import { DUMMY_SPACECRAFTS_RESPONSE } from '../mock/mocks/dummyData/dummySpaceCraftsResponse';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { server } from '../mock/mocks/node';
import { handlersError } from '../mock/handlersError';

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

const spacecraftContext: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> = {
  query: { uid: 'test' },
  req: mockReq,
  res: mockRes,
  resolvedUrl: '',
  params: {},
};

describe('apiServices', () => {
  it('should fetch spacecrafts with default parameters', async () => {
    const result = await getSpacecrafts(spacecraftsContext);

    expect(result).toEqual(DUMMY_SPACECRAFTS_RESPONSE);
  });

  it('should throw an error when the request spacecrafts fails', async () => {
    server.use(handlersError.spacecraftsPost);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await getSpacecrafts(spacecraftsContext);

    expect(result).toBeUndefined();
    consoleErrorSpy.mockRestore();
  });

  it('should fetch spacecraft details by id', async () => {
    const result = await getSpacecraft(spacecraftContext);

    expect(result).toEqual(DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft);
  });

  it('should throw an error when the request spacecraft details fails', async () => {
    server.use(handlersError.spaceCraftGetDetails);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await getSpacecraft(spacecraftsContext);

    expect(result).toBeUndefined();
    consoleErrorSpy.mockRestore();
  });
});
