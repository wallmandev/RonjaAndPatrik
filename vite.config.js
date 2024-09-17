import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RonjaAndPatrik/',  // Använd rätt bas-URL för GitHub Pages
  plugins: [react()],
});
