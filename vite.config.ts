import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/bust-a-move/",
  esbuild: {
    supported: {
      "top-level-await": true,
    },
    sourcemap: true,
  },
});
