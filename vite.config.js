import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'https://nbackend.numenex.com',
      '/ws': {
        target: 'wss://wss.numenex.com',
        ws: true,
       
      }
    }
  },
  assetsInclude: ['**/*.mp3'],
})
