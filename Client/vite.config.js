import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
 server: {
    // proxy: {
    //   "/api": {
    //     target: "https://findstay-29ni.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/uploads": {
    //     target: "https://findstay-29ni.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  }
})
