import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tsconfigPaths from 'vite-tsconfig-paths';
import {createHydrogenRouterContext} from './app/lib/context.js';

export default defineConfig({
  plugins: [
    hydrogen({
      getLoadContext: createHydrogenRouterContext,
    }),
    reactRouter(),
    tsconfigPaths()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
