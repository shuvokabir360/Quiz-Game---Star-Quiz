import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'dev-html-transform',
      apply: 'serve',
      transformIndexHtml(html) {
        return html
          .replace(
            /<script type="module" crossorigin src=".*?"><\/script>/,
            '<script type="module" src="/src/main.js"></script>'
          )
          .replace(
            /<link rel="stylesheet" crossorigin href=".*?">/,
            ''
          );
      }
    }
  ],
  root: '.',
  publicDir: 'public',
    server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: ['**/docs/**', '**/dist/**', '**/assets/**']
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
