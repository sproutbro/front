import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": "http://144.24.92.60:8080/",
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
