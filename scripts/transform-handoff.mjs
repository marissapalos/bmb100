// One-shot transform: extract <body> content from each handoff HTML,
// rewrite internal links + asset paths, and emit body.html alongside each route.
// Delete after running.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const HANDOFF =
  "C:/Users/maris/OneDrive/Desktop/delete/BMB 100-handoff/bmb-100/project";
const PROJECT = path.resolve(import.meta.dirname, "..");

const pages = [
  { src: "index.html", route: "app", dataPage: "home" },
  { src: "timeline.html", route: "app/timeline", dataPage: "timeline" },
  { src: "gallery.html", route: "app/gallery", dataPage: "gallery" },
  { src: "reunion.html", route: "app/reunion", dataPage: "reunion" },
];

function transform(html) {
  // Pull out body inner content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) throw new Error("no <body> found");
  let body = bodyMatch[1];

  // Drop the <script src="app.js"></script> at the end — app.js loaded via root layout
  body = body.replace(/\s*<script src="app\.js"><\/script>\s*$/i, "");

  // Rewrite internal links: index.html -> /, others -> /<route>
  body = body
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="timeline\.html"/g, 'href="/timeline"')
    .replace(/href="gallery\.html"/g, 'href="/gallery"')
    .replace(/href="reunion\.html#register"/g, 'href="/reunion#register"')
    .replace(/href="reunion\.html"/g, 'href="/reunion"');

  // Rebase relative asset refs to /assets/...
  body = body.replace(/src="assets\//g, 'src="/assets/');

  // Mark nav/footer for the v2 componentization pass
  body = body.replace(
    /<header class="topnav"/,
    '<!-- TODO v2: extract shared Nav, componentize -->\n<header class="topnav"'
  );
  body = body.replace(
    /<footer class="footer"/,
    '<!-- TODO v2: extract shared Footer, componentize -->\n<footer class="footer"'
  );

  return body.trim() + "\n";
}

for (const p of pages) {
  const html = readFileSync(path.join(HANDOFF, p.src), "utf8");
  const out = transform(html);
  const outDir = path.join(PROJECT, p.route);
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "body.html");
  writeFileSync(outPath, out, "utf8");
  console.log(`wrote ${path.relative(PROJECT, outPath)} (${out.length} bytes)`);
}
