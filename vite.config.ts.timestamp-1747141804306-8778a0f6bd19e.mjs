// vite.config.ts
import { defineConfig } from "file:///D:/Chris/Startups/st-isidore-ranch/node_modules/.pnpm/vite@5.4.8_@types+node@22.15.3/node_modules/vite/dist/node/index.js";
import { hydrogen } from "file:///D:/Chris/Startups/st-isidore-ranch/node_modules/.pnpm/@shopify+hydrogen@2025.1.4_@remix-run+react@2.16.5_@remix-run+server-runtime@2.16.5_@types+re_puz5ntfswlulzscbwt2wtxczey/node_modules/@shopify/hydrogen/dist/vite/plugin.js";
import { oxygen } from "file:///D:/Chris/Startups/st-isidore-ranch/node_modules/.pnpm/@shopify+mini-oxygen@3.0.5_vite@5.4.8/node_modules/@shopify/mini-oxygen/dist/vite/plugin.js";
import { vitePlugin as remix } from "file:///D:/Chris/Startups/st-isidore-ranch/node_modules/.pnpm/@remix-run+dev@2.12.1_@remix-run+react@2.16.5_@types+node@22.15.3_typescript@5.6.2_vite@5.4.8/node_modules/@remix-run/dev/dist/index.js";
import tsconfigPaths from "file:///D:/Chris/Startups/st-isidore-ranch/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.6.2_vite@5.4.8/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths()
  ],
  ssr: {
  },
  optimizeDeps: {
    include: [
      "clsx",
      "@headlessui/react",
      "typographic-base",
      "react-intersection-observer",
      "react-use/esm/useScroll",
      "react-use/esm/useDebounce",
      "react-use/esm/useWindowScroll"
    ]
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDaHJpc1xcXFxTdGFydHVwc1xcXFxzdC1pc2lkb3JlLXJhbmNoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDaHJpc1xcXFxTdGFydHVwc1xcXFxzdC1pc2lkb3JlLXJhbmNoXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9DaHJpcy9TdGFydHVwcy9zdC1pc2lkb3JlLXJhbmNoL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHtoeWRyb2dlbn0gZnJvbSAnQHNob3BpZnkvaHlkcm9nZW4vdml0ZSc7XG5pbXBvcnQge294eWdlbn0gZnJvbSAnQHNob3BpZnkvbWluaS1veHlnZW4vdml0ZSc7XG5pbXBvcnQge3ZpdGVQbHVnaW4gYXMgcmVtaXh9IGZyb20gJ0ByZW1peC1ydW4vZGV2JztcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgaHlkcm9nZW4oKSxcbiAgICBveHlnZW4oKSxcbiAgICByZW1peCh7XG4gICAgICBwcmVzZXRzOiBbaHlkcm9nZW4ucHJlc2V0KCldLFxuICAgICAgZnV0dXJlOiB7XG4gICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgICAgICB2M19yZWxhdGl2ZVNwbGF0UGF0aDogdHJ1ZSxcbiAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxuICBzc3I6IHtcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFsndHlwb2dyYXBoaWMtYmFzZSddLFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdjbHN4JyxcbiAgICAgICdAaGVhZGxlc3N1aS9yZWFjdCcsXG4gICAgICAndHlwb2dyYXBoaWMtYmFzZScsXG4gICAgICAncmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyJyxcbiAgICAgICdyZWFjdC11c2UvZXNtL3VzZVNjcm9sbCcsXG4gICAgICAncmVhY3QtdXNlL2VzbS91c2VEZWJvdW5jZScsXG4gICAgICAncmVhY3QtdXNlL2VzbS91c2VXaW5kb3dTY3JvbGwnLFxuICAgIF0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gQWxsb3cgYSBzdHJpY3QgQ29udGVudC1TZWN1cml0eS1Qb2xpY3lcbiAgICAvLyB3aXRodG91dCBpbmxpbmluZyBhc3NldHMgYXMgYmFzZTY0OlxuICAgIGFzc2V0c0lubGluZUxpbWl0OiAwLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdTLFNBQVEsb0JBQW1CO0FBQzNULFNBQVEsZ0JBQWU7QUFDdkIsU0FBUSxjQUFhO0FBQ3JCLFNBQVEsY0FBYyxhQUFZO0FBQ2xDLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxTQUFTLE9BQU8sQ0FBQztBQUFBLE1BQzNCLFFBQVE7QUFBQSxRQUNOLG1CQUFtQjtBQUFBLFFBQ25CLHNCQUFzQjtBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxrQkFBa0I7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBO0FBQUEsSUFHTCxtQkFBbUI7QUFBQSxFQUNyQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
