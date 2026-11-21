import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";
import keystaticCreateRetry from "./scripts/keystatic-create-retry.mjs";

export default defineConfig({
  adapter: vercel(),
  integrations: [react(), keystatic()],
  vite: { plugins: [keystaticCreateRetry()] },
  output: "static"
});
