import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      include: ['app/**/*.{ts,tsx}'],
      reporter: ['text', 'json', 'html'],
      exclude: ['.eslintrc.cjs', '.next/**/*.{js,jsx}'],
    },
  },
});
