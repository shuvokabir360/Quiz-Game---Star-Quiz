import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [],
  root: '.',
  publicDir: 'public',
    server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: ['**/docs/**', '**/dist/**', '**/assets/**', '**/images/**', '**/icons/**']
    },
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
