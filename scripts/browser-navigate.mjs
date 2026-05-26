/**
 * browser-navigate.mjs — ColdPro headless browser
 * node scripts/browser-navigate.mjs [url] [--screenshot] [--click="sel"] [--wait=ms]
 */
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, "../.screenshots");

const args = process.argv.slice(2);
const url  = args.find(a => a.startsWith("http")) ?? "https://cn-cold-coils.leandro-072.workers.dev/coldpro";
const doScreenshot = args.includes("--screenshot") || args.includes("-s");
const clickSelector = args.find(a => a.startsWith("--click="))?.replace("--click=","");
const waitMs = parseInt(args.find(a => a.startsWith("--wait="))?.replace("--wait=","") ?? "6000");

async function navigate({ url, screenshot = true, click, wait = 6000 }) {
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    args: [
      "--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage",
      "--disable-gpu","--disable-quic","--disable-http2",
      "--no-zygote","--single-process",
    ],
    headless: true,
  });

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  const netFails = [];
  page.on("console", m => { if (m.type()==="error") consoleErrors.push(m.text()); });
  page.on("pageerror", e => consoleErrors.push(e.message));
  page.on("requestfailed", r => netFails.push(`${r.url().replace(/^https?:\/\/[^/]+/,'')} — ${r.failure()?.errorText}`));

  console.log(`\nNavegando: ${url}`);
  const resp = await page.goto(url, { waitUntil:"domcontentloaded", timeout:30000 }).catch(e=>{
    console.error("goto falhou:", e.message); return null;
  });
  console.log(`HTTP: ${resp?.status() ?? "N/A"}`);

  // Aguarda React hidratar
  await page.waitForTimeout(wait);

  if (click) {
    await page.click(click, { timeout:5000 }).catch(e => console.warn("click falhou:", e.message));
    await page.waitForTimeout(2000);
  }

  const info = await page.evaluate(() => ({
    title:    document.title,
    url:      location.href,
    h1:       [...document.querySelectorAll("h1")].map(e=>e.textContent?.trim()).filter(Boolean),
    h2:       [...document.querySelectorAll("h2,h3")].map(e=>e.textContent?.trim()).filter(Boolean).slice(0,12),
    buttons:  [...document.querySelectorAll("button,[role=button]")].map(e=>e.textContent?.trim()).filter(t=>t&&t.length<80).slice(0,40),
    inputs:   [...document.querySelectorAll("input,select,textarea")].map(e=>({
                tag:e.tagName, name:e.name||e.id, ph:e.placeholder, val:e.value?.slice(0,40)
              })).filter(i=>i.name||i.ph).slice(0,20),
    alerts:   [...document.querySelectorAll("[role=alert],[class*=error],[class*=warning],[class*=toast]")]
                .map(e=>e.textContent?.trim()).filter(t=>t&&t.length<300).slice(0,8),
    bodyText: document.body?.innerText?.slice(0,3000),
  }));

  console.log("\n┌── Título ──────────────────────────────────");
  console.log("│", info.title);
  console.log("│── URL ─────────────────────────────────────");
  console.log("│", info.url);
  if (info.h1.length) { console.log("│── H1 ──────────────────────────────────────"); info.h1.forEach(h=>console.log("│",h)); }
  if (info.h2.length) { console.log("│── Seções ──────────────────────────────────"); info.h2.forEach(h=>console.log("│",h)); }
  if (info.buttons.length) { console.log("│── Botões ──────────────────────────────────"); console.log("│", info.buttons.join(" | ")); }
  if (info.inputs.length) { console.log("│── Campos ──────────────────────────────────"); info.inputs.forEach(i=>console.log("│",`[${i.tag}] ${i.name||i.ph} = "${i.val||''}"`)); }
  if (info.alerts.length) { console.log("│── Alertas na UI ───────────────────────────"); info.alerts.forEach(a=>console.log("│",a)); }
  if (consoleErrors.length) { console.log("│── Console errors ──────────────────────────"); consoleErrors.slice(0,8).forEach(e=>console.log("│",e)); }
  if (netFails.length) { console.log("│── Network fails ───────────────────────────"); netFails.slice(0,5).forEach(e=>console.log("│",e)); }
  console.log("│── Texto visível ───────────────────────────");
  console.log(info.bodyText?.slice(0,2000));
  console.log("└───────────────────────────────────────────");

  if (screenshot) {
    mkdirSync(SCREENSHOTS_DIR, { recursive:true });
    const slug = url.replace(/https?:\/\//,"").replace(/[^a-z0-9]/gi,"_").slice(0,60);
    const ts   = new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);
    const file = join(SCREENSHOTS_DIR, `${ts}_${slug}.png`);
    await page.screenshot({ path:file, fullPage:true });
    console.log(`Screenshot: ${file}`);
  }

  await browser.close();
  return info;
}

navigate({ url, screenshot: doScreenshot, click: clickSelector, wait: waitMs });
