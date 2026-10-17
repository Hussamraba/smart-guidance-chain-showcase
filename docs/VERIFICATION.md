# Verification

## Scope

This report concerns the public portfolio. It does not certify a production deployment of the private travel application.

## Application capture

- The actual development branch was inspected and run locally with the real frontend, API, PostgreSQL, Redis, Qdrant, and MinIO.
- A separate verified demonstration account was created. No personal account or production credentials appear in the public artifacts.
- Discovery and planner screens were captured through Chromium. The live companion returned a successful reply through the real API.
- Default planner generation encountered timeout/model/JSON-output issues. A provider-listed Qwen model produced two genuine alternatives through the existing supported two-alternative service parameter. The server-cached result was selected with the existing selection API, then opened in the actual frontend. The recording does not pretend to show successful generation from the frontend's three-option default.
- Temporary provider/model/timeout choices were applied only to the demo process or diagnostic process. The application's environment file and source were not changed for them.
- Raw error screens and unsuccessful attempts are excluded from the published video. No AI reply or application output was mocked.

## Portfolio checks

- `npm run build`: passed (TypeScript and Vite static production output).
- `npm run lint`: passed with no errors or warnings.
- `npm run check:public`: passed; all 11 referenced screenshots, video, poster, and captions are present. No forbidden configuration files or credential-pattern matches were found in the publishable source.
- Playwright: 12 tests passed across desktop (1440 px), tablet (820 px), and mobile (390 px).
- Tests cover repository-subpath asset loading, image descriptions, H.264 video delivery, overflow, screenshot filtering, modal/keyboard navigation, focus restoration, diagram inspection, developer links, and responsive navigation.
- Screenshot views were visually inspected. Desktop and mobile showed no horizontal overflow.
- Demo: 56.0 seconds; MP4 / H.264 / yuv420p; 1440 × 960; approximately 3.91 MB; fast-start metadata and English scene captions.
- Public media contains real discovery, planner preferences, saved-plan editing, trip activation, place guidance, and contextual companion screens. Runtime AI statements remain subject to provider availability; the portfolio is static and does not promise a live hosted application.

The private application's complete test suite and production readiness are outside this portfolio's verification scope. Captured API responses verified login, public content, saved-plan selection, confirmation, activation, guidance, and companion chat. The default three-alternative frontend generation failed during capture; the successful two-alternative service run is documented above.
