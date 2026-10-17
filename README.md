# Smart Guidance Chain — Showcase

A public engineering portfolio for REHLA, an AI-assisted travel companion for Jordan. The application source remains private. This repository contains only the standalone portfolio, actual application captures, and its recorded demonstration.

**Developer:** Hussam Eddin Rabaa — Software Engineering graduate focused on Applied AI and Software Engineering. Smart Guidance Chain is a collaborative project; this portfolio does not claim sole authorship.

## Develop

Requires Node.js 22 (Node.js 20.19+ also supported).

```bash
npm ci
npm run dev
```

Open the printed URL ending in `/smart-guidance-chain-showcase/`.

## Check and build

```bash
npm run lint
npm run build
npm run preview -- --port 4173
# With the preview server running:
npx playwright install chromium
npm test
```

The site is static and needs no application backend, credentials, or environment file. Vite's explicit repository base path applies to scripts, styles, screenshots, video, and captions.

## GitHub Pages

The `Deploy showcase to GitHub Pages` Actions workflow checks and builds the portfolio on pushes to `main`, then deploys `dist/` with the official Pages actions. In repository Settings → Pages, select **GitHub Actions** as the source.

Expected URL: `https://hussamraba.github.io/smart-guidance-chain-showcase/`.

## Media and content

- Screenshots: `public/assets/screenshots/`
- Video, poster, and captions: `public/assets/video/`
- Screen metadata: `src/media.json`
- Public content provenance and scope: `docs/CONTENT_PROVENANCE.md`
- Validation and deployment notes: `docs/VERIFICATION.md`

All application screenshots are captured from the running project; they are not AI-generated mockups. Demo data is separate from personal accounts. Recordings contain no login screen, credentials, database dumps, or private source. This public repository does not bundle the original application's image/video source files.

## Implementation

React, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, and native HTML dialog/video elements. Playwright checks gallery interactions, keyboard dismissal, responsive navigation, architecture inspection, assets, and the GitHub Pages repository subpath.
