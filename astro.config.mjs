import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

const isBuild = process.env.npm_lifecycle_event === "build";

export default defineConfig({
  integrations: isBuild ? [] : [react(), keystatic()],
  output: "static"
});
