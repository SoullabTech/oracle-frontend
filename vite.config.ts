// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode, command }) => {
  // load all env vars (both VITE_ and plain)
  const env = loadEnv(mode, process.cwd(), '');
  
  // allow overriding via PORT or VITE_PORT, default 3000
  const port = Number(env.PORT ?? env.VITE_PORT) || 3000;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@test-utils': path.resolve(__dirname, 'src/test-utils.tsx'),
      },
    },
    build: {
      sourcemap: false,
      outDir: 'dist',
      assetsDir: 'assets',
      target: 'esnext',
      minify: 'esbuild',
      chunkSizeWarningLimit: 500,
    },
    server: {
      port,        // dynamic now
      strictPort: false, // auto‐bump if taken
      open: true,
      headers: {
        'x-powered-by': 'Golden-Spiral-Portal',
      },
    },
    preview: {
      port: 5173,
      open: true,
      headers: {
        'x-powered-by': 'Golden-Spiral-Portal',
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV ?? 'development'),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  };
});
