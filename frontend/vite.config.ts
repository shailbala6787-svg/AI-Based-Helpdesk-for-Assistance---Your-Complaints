import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 6001,
  },
  // GitHub Pages ke liye base path — repo name ke saath match karna chahiye
  base: '/AI-Based-Helpdesk-for-Assistance---Your-Complaints/',
});
