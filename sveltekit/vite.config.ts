import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@": path.resolve("src"), // Styles in src/styles will be accessible as '@/styles/whatever.scss'
    },
  },
  server: {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
    },
  },
});
