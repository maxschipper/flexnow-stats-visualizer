import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    host: true,
    port: 8080,
    strictPort: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "yoga",
      "yoga.nb.cloud",
      "dev.nuc.lab",
      ".trycloudflare.com",
    ],
  },
});
