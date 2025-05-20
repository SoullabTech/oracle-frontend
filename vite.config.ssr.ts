// vite.config.ssr.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: true,
    outDir: 'dist-ssr',
    rollupOptions: {
      input: 'src/entry-server.tsx',
    },
  },
});
