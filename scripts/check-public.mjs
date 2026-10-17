import fs from "node:fs";
import path from "node:path";
const ignored = new Set([
  "node_modules",
  ".git",
  "dist",
  "test-results",
  "playwright-report",
]);
const sensitive =
  /\b(?:AIza[0-9A-Za-z_-]{30,}|gsk_[0-9A-Za-z]{20,}|gh[pousr]_[0-9A-Za-z]{25,}|sk-proj-[0-9A-Za-z_-]{20,})\b/;
const failures = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(item.name)) continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) {
      walk(file);
      continue;
    }
    if (
      /^\.env($|\.)/.test(item.name) ||
      /\.(sql|dump|pem)$/.test(item.name) ||
      /^(session|auth-state)\.json$/.test(item.name)
    )
      failures.push(`Forbidden file: ${file}`);
    if (/\.(?:ts|tsx|js|mjs|json|md|html|css|ya?ml)$/.test(item.name)) {
      const content = fs.readFileSync(file, "utf8");
      if (sensitive.test(content))
        failures.push(`Potential credential: ${file}`);
      if (/\/home\/[^/\s]+\/smart_guidance_chain/.test(content))
        failures.push(`Private application path: ${file}`);
    }
  }
}
walk(".");
const media = JSON.parse(fs.readFileSync("src/media.json"));
for (const screen of media.screens) {
  if (!fs.existsSync(`public/assets/screenshots/${screen.file}`))
    failures.push(`Missing screenshot: ${screen.file}`);
}
for (const file of ["rehla-demo.mp4", "demo-poster.webp", "captions.vtt"]) {
  if (!fs.existsSync(`public/assets/video/${file}`))
    failures.push(`Missing video asset: ${file}`);
}
if (failures.length) {
  for (const problem of failures) console.error(problem);
  process.exitCode = 1;
} else
  console.log(
    `Public-content check passed. ${media.screens.length} real screenshots; video, poster, and captions present. No forbidden files or credential-pattern matches.`,
  );
