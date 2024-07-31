import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { GetServerSidePropsContext, PreviewData } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { getSpacecraft, getSpacecrafts } from './apiServices';
import { DUMMY_SPACECRAFTS_RESPONSE } from '../mock/mocks/dummyData/dummySpaceCraftsResponse';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../mock/mocks/dummyData/dummySpaceCraftDetailsResponse';

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
    console.log('result: ', result);

    expect(result).toEqual(DUMMY_SPACECRAFTS_RESPONSE);
  });

  it('should fetch spacecraft details by id', async () => {
    const result = await getSpacecraft(spacecraftContext);
    console.log('result: ', result);

    expect(result).toEqual(DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft);
  });
});
