import { getSpacecraft, getSpacecrafts } from './apiServices';
import { DUMMY_SPACECRAFTS_RESPONSE } from '../mock/mocks/dummyData/dummySpaceCraftsResponse';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { server } from '../mock/mocks/node';
import { handlersError } from '../mock/handlersError';

describe('apiServices', () => {
  it('should fetch spacecrafts with default parameters', async () => {
    const result = await getSpacecrafts({});

    expect(result).toEqual(DUMMY_SPACECRAFTS_RESPONSE);
  });

  it('should throw an error when the request spacecrafts fails', async () => {
    server.use(handlersError.spacecraftsPost);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await getSpacecrafts({});

    expect(result).toBeUndefined();
    consoleErrorSpy.mockRestore();
  });

  it('should fetch spacecraft details by id', async () => {
    const result = await getSpacecraft({ uid: 'test' });

    expect(result).toEqual(DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft);
  });

  it('should throw an error when the request spacecraft details fails', async () => {
    server.use(handlersError.spaceCraftGetDetails);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await getSpacecraft({ uid: 'test' });

    expect(result).toBeUndefined();
    consoleErrorSpy.mockRestore();
  });
});
