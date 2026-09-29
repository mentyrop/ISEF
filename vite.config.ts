import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative URLs also work when GitHub Pages serves the site under /repository/.
  base: './',
  build: {
    rollupOptions: {
      input: { main: 'index.html', concepts: 'concepts.html' },
    },
  },
})
