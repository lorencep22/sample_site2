import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["framer-motion", "lucide-react", "react-hot-toast"],
          "router-vendor": ["react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "lucide-react"],
  },
});
