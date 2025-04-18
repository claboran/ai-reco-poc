/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, Plugin } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../node_modules/.vite`,
    
    ssr: {
      noExternal: ['@analogjs/trpc','@trpc/server'],
    },
    
    build: {
      outDir: '../dist/./ai-reco-app/client',
      reportCompressedSize: true,    
      target: ['es2020'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },    
    plugins: [
      
      analog({
        nitro: {
          routeRules: {
            '/': {
              prerender: false,
            }
          }
        }
      }),
      
      nxViteTsPaths(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
