import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import  sitemap  from 'vite-plugin-sitemap'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap({
    hostname: 'https://tudominio.com',
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-router': ['@tanstack/react-router', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-lucide': ['lucide-react'],

          'vendor-embla': ['embla-carousel', 'embla-carousel-react', 'embla-carousel-auto-scroll'],
          'vendor-tanstack': ['@tanstack/react-query'],
        },
      },
    },
  },
})