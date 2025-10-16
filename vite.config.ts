import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { federation } from '@module-federation/vite';

import { dependencies as deps } from './package.json';
// const deps = require('./package.json').dependencies;


// const env = loadEnv(mode, process.cwd(), '');
// const REACT_APP_ENV = env.REACT_APP_ENV || 'lcl';

const config = {
  lcl: {
    port: 3000,
    base: 'http://localhost:3000',
  },
  dev: {
    port: 8080,
    base: 'https://your-dev-url.run.app/',
  },
  prd: {
    port: 8080,
    base: 'https://your-prod-url.run.app/',
  },
}['lcl'];

// https://vite.dev/config/
export default defineConfig({
  // server: { port: 3000 }, // use a different port than Next.js
  base: config.base,
  server: {
    port: config.port,
    strictPort: true,
  },
  // preview: {
  //   port: config.port,
  //   strictPort: true,
  // },
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './access/protect/widgets': './src/exposed/widgets.tsx',
        // expose more components as needed
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
      // Generate a manifest that the runtime can use
      manifest: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@app': path.resolve(__dirname, './src/app'),
    },
  },
  // server: {
  //   origin: config.base,
  // },
});
