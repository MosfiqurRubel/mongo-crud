import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
    open: true,
  },
});
