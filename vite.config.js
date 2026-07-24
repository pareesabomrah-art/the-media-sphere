import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/the-media-sphere/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})