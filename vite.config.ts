// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env.PORT ?? env.VITE_PORT) || 3000;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@test-utils': path.resolve(__dirname, 'src/test-utils'), // ✅ Correct — no .tsx extension!
      },
    },
    build: {
      sourcemap: false,
      outDir: 'dist',
      assetsDir: 'assets',
      target: 'esnext',
      minify: 'esbuild',
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            framer: ['framer-motion'],
            supabase: ['@supabase/supabase-js'],
            vendor: ['react-router-dom', 'classnames', 'zustand'],
          },
        },
      },
    },
    server: {
      port,
      strictPort: false,
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