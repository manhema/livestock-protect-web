### Short answer
- This project is a Vite + React app and does not have Module Federation configured.
- `package.json` shows Vite scripts, and `vite.config.ts` only includes the React plugin and path aliases — no federation plugin is present.

```
// package.json (relevant)
"scripts": {
  "dev": "vite --port 3000",
  "build": "tsc -b && vite build"
},
"devDependencies": {
  "vite": "^7.0.3",
  "@vitejs/plugin-react-swc": "^3.10.2"
}

// vite.config.ts (relevant)
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': './src', /* ... */ } }
});
```

### How to render components from this Vite app in a Next.js app
You have two main paths:

1) Add Module Federation and consume from Next.js (cross-bundler: Vite remote → Next/webpack host)
2) Package the UI as a library and import it as a normal npm dependency

Below are both approaches. If you specifically want runtime composition without publishing packages, use option 1.

---

### Option 1: Add Module Federation

#### 1) Configure this project (Vite) as a remote
- Install the official MF plugin for Vite:

```
npm i -D @module-federation/vite
```

- Update `vite.config.ts` to expose components (example shows `PropertyDrillDownFilter`):

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import federation from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'livestock_protect',
      filename: 'remoteEntry.js',
      exposes: {
        './PropertyDrillDownFilter':
          './src/features/access-protect/components/visits/forms/property-drill-down-filter.tsx',
        // expose more components as needed
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        '@mui/material': { singleton: true, requiredVersion: false },
        '@emotion/react': { singleton: true, requiredVersion: false },
        '@emotion/styled': { singleton: true, requiredVersion: false }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@app': path.resolve(__dirname, './src/app')
    }
  },
  server: { port: 3001 }, // use a different port than Next.js
});
```

- Run the remote during development:

```
npm run dev
# Remote entry will be at http://localhost:3001/assets/remoteEntry.js (Vite 7 default)
```

Note: Depending on Vite version and the MF plugin, the remote entry path may be `/assets/remoteEntry.js` or `/remoteEntry.js`. If needed, set `build.rollupOptions.output.assetFileNames` or consult the plugin docs to control the filename and path.

#### 2) Configure Next.js (webpack host) to consume the Vite remote
- Install the Next.js Module Federation integration:

```
npm i -D @module-federation/nextjs-mf
```

- Update `next.config.js` (or `next.config.mjs`) to add the plugin and the remote URL:

```
// next.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'next_host',
          remotes: {
            livestock: 'livestock_protect@http://localhost:3001/assets/remoteEntry.js'
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
            '@mui/material': { singleton: true, requiredVersion: false },
            '@emotion/react': { singleton: true, requiredVersion: false },
            '@emotion/styled': { singleton: true, requiredVersion: false }
          }
        })
      );
    }
    return config;
  }
};
```

- Import the remote component in your Next.js pages/components. For client-only components (most MUI UIs), use dynamic import with `ssr: false`:

```
// example in a Next.js page or component
import dynamic from 'next/dynamic';

const PropertyDrillDownFilter = dynamic(
  () => import('livestock/PropertyDrillDownFilter'),
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      <PropertyDrillDownFilter
        properties={[/* ... */]}
        onDrillDownFilter={() => { /* ... */ }}
      />
    </div>
  );
}
```

- Optional: add TypeScript module declarations for editor/TS support:

```
// types/module-federation.d.ts
declare module 'livestock/PropertyDrillDownFilter' {
  import { FC } from 'react';
  const Component: FC<any>;
  export default Component;
}
```

#### Notes and gotchas
- React version alignment: This repo uses React 19. Make sure your Next.js project also uses React 19, and that `react` and `react-dom` are shared singletons to avoid multiple React copies.
- MUI and Emotion: Share `@mui/material`, `@emotion/react`, `@emotion/styled` as singletons to avoid style duplication. Ensure your theme/provider setup is compatible across host and remote. If you use Emotion’s `CacheProvider`, use the same cache key config in host and remote.
- Dev ports: Next.js often runs on port 3000; run Vite remote on 3001 (as shown).
- Production: Host must point `remotes.livestock` to the deployed URL of `remoteEntry.js`. Consider environment-specific remote URLs.

---

### Option 2: Publish as a package (no Module Federation)
If you prefer to avoid MF, you can ship these components as a library and consume them normally in Next.js:

1) Add Vite library build options:

```
// vite.config.ts (add build section)
export default defineConfig({
  /* ... */
  build: {
    lib: {
      entry: 'src/index.ts', // re-export your components here
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@mui/material',
        '@emotion/react',
        '@emotion/styled'
      ]
    }
  }
});
```

2) Create `src/index.ts` that exports public components:

```
export { default as PropertyDrillDownFilter } from './features/access-protect/components/visits/forms/property-drill-down-filter';
// export more components
```

3) Build and publish to your registry, then `npm i your-package` in the Next.js app and import normally.

---

### Conclusion
- This repository is not currently using Module Federation; it’s a Vite React app without MF plugins.
- To render its components in a Next.js app, either:
    - Add Module Federation (Vite remote + Next host) using `@module-federation/vite` and `@module-federation/nextjs-mf`, or
    - Package the components as a library and import them via npm.

If you share which approach you prefer (runtime MF vs. published package), I can provide tailored step-by-step changes for your codebase and a minimal working example repository layout.