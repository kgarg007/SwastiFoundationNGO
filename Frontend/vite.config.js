import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split large vendor code from app code for better CDN caching on
    // Cloudflare Pages — vendor chunks change far less often than app code.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router") || id.includes("react-dom") || id.includes("/react/")) {
              return "react-vendor";
            }
          }
        },
      },
    },
    // Surface oversized chunks early rather than shipping them silently.
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173,
  },
});
