/**
 * Post-build script: renders the root route via the SSR server and writes
 * the result to dist/client/index.html so Cloudflare Pages can serve it
 * as a SPA shell (all routes redirect to this file via _redirects).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Minimal env needed to prevent crashes during HTML shell render.
// No real Supabase calls happen at the shell level.
process.env.SUPABASE_URL = process.env.SUPABASE_URL ?? "https://placeholder.supabase.co";
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder";
process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "https://placeholder.supabase.co";
process.env.VITE_SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "placeholder";

const { default: server } = await import(resolve(root, "dist/server/server.js"));

const req = new Request("http://localhost/", {
  method: "GET",
  headers: { "accept": "text/html" },
});

let res = await server.fetch(req);

// Follow up to 5 redirects to land on an HTML page
for (let i = 0; i < 5 && (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308); i++) {
  const location = res.headers.get("location");
  if (!location) break;
  const nextUrl = location.startsWith("http") ? location : `http://localhost${location}`;
  res = await server.fetch(new Request(nextUrl, { method: "GET", headers: { accept: "text/html" } }));
}

const html = await res.text();

if (!html.includes("<html") && !html.includes("<!DOCTYPE")) {
  console.error("Response does not look like HTML:", html.slice(0, 200));
  process.exit(1);
}

const outPath = resolve(root, "dist/client/index.html");
writeFileSync(outPath, html, "utf-8");
console.log(`✓ Generated dist/client/index.html (${(html.length / 1024).toFixed(1)} KB)`);
