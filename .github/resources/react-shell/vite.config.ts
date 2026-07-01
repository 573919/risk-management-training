import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE_PATH is set by GitHub Actions for deployment. Default "/" for local dev.

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
});
