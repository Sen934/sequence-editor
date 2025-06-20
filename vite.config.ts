import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/app/setupTests.ts'],
  },
});
