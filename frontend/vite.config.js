import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/jobs': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/api/users': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
      '/api/applications': {
        target: 'http://localhost:5003',
        changeOrigin: true,
      },
      '/api/search': {
        target: 'http://localhost:5004',
        changeOrigin: true,
      }
    }
  }
})
