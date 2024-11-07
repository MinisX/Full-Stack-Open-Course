import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'https://full-stack-open-course-ds7p.onrender.com',
      changeOrigin: true,
    },
  }
})
