import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://147.182.229.96:3000',
      '/ws': {
        target: 'ws://147.182.229.96:8080',
        ws: true,
      }
    }
  },
  assetsInclude: ['**/*.mp3'],
})
