import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// SPA-only build for Cloudflare Pages — skips the SSR/Worker environment
// by disabling the @cloudflare/vite-plugin that creates the second build step.
export default defineConfig({ cloudflare: false });
