import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      visualizations: "/src/visualizations",
      layout: "/src/layout",
      services: "/src/services",
      store: "/src/store",
      src: "/src",
    },
  },
});
