import { cleanup } from '@testing-library/react';
import { server } from '@/shared/api/mock/mocks/node';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

global.URL.createObjectURL = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
