import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: { global: "window" },
  // define:
  //   process.env.NODE_ENV === "development"
  //     ? { global: "window" }
  //     : { _global: "window" },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
