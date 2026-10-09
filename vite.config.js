import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Quiz-Game---Star-Quiz/' : '/',
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: false,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsInlineLimit: 4096
  },
  test: {
    environment: 'node',
    globals: true
  }
});
