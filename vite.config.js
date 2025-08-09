import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-static-files',
      writeBundle() {
        // Copy static files to dist
        copyFileSync('style.css', 'dist/style.css')
        copyFileSync('script.js', 'dist/script.js')
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        app: './app.html'
      }
    }
  },
  server: {
    port: 5174,
    host: true
  }
})
