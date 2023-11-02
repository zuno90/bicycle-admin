import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: process.env.NODE_ENV === "development" ? { global: "window" } : {},
  resolve: {
    alias: { "./runtimeConfig": "./runtimeConfig.browser" },
  },
});
