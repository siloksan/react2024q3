import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from 'shared/api/mock/mocks/node';

afterEach(() => {
  cleanup();
});

global.URL.createObjectURL = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
