import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  output: "server",
  adapter: vercel(),
  server: {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate",
    },
  },
});
