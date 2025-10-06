// vite.config.ts (o vite.config.js)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Este plugin es el que estaba en el primer código
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Asegúrate de incluirlo si usas Tailwind CSS
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});