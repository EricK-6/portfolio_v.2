import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using './' makes build artifacts work at any deploy path (GitHub Pages subpaths, Vercel root, etc.)
// If deploying to a repo page like erick-6.github.io/personal-website/, change to '/personal-website/'
export default defineConfig({
  plugins: [react()],
  base: './',
})
