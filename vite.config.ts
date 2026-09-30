import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Shared assets resolve from isef.pro on both / and the /ru/, /en/, /es/ pages.
  base: '/',
  build: {
    rollupOptions: {
      input: { main: 'index.html', concepts: 'concepts.html' },
    },
  },
})
