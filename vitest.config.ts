import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    css: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, './e2e'],
    coverage: {
      provider: 'v8',
      exclude: [
        ...configDefaults.coverage.exclude,
        '*.config.js',
        'server.js',
        'playwright*',
      ],
    },
  },
});
