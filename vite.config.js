import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '425f-2804-3f4-10c-1200-add0-7b2a-484c-e891.ngrok-free.app'
    ],
  },
})
