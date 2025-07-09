import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    sourcemap: mode === "development",
  },
  base: "./",
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      data: "/src/data",
      pages: "/src/pages",
    },
  },
}));
