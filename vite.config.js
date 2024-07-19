import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      features: "/src/features",
      layout: "/src/layout",
      routes: "/src/routes",
      services: "/src/services",
      tests: "/src/tests",
    },
  },
});
