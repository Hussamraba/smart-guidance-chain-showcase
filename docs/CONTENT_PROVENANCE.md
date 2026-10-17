# Content provenance and scope

Reviewed and captured on 17 October 2026.

This portfolio describes the REHLA implementation on the project's development branch at the time of capture. It is a presentation of a functional prototype, not a claim of a production release. No private application source is included.

## Verified implementation

- Public tourism discovery for places, hotels, and restaurants.
- Structured AI-assisted plan alternatives, explicit selection, activity editing, confirmation, and operational trip activation.
- Operational itineraries, progress, geofence arrival checks, and reviewed replan proposals.
- Persisted conversations and trip-scoped contextual guidance.
- Place guidance and backend-generated English/Arabic narration with object-storage caching.
- Emergency contacts/sessions and consent-based location sharing, with configurable delivery adapters.
- Administration for users and tourism content.
- PostgreSQL, Redis, Qdrant, and MinIO integrations; centralized Gemini/Groq provider adapters.

Architecture nodes describe responsibilities observed in implementation. The diagram groups service dependencies; it does not claim direct browser access to data stores or that every integration was exercised during the recording.

## Scope qualifications shown on the website

- The main frontend is English; bilingual place guidance exists.
- Hotel/restaurant discovery does not provide confirmed bookings, payments, or availability.
- Navigation estimates are not road routing or live traffic.
- Emergency delivery requires configured notification providers.
- Several secondary screens, vision, and the notification center remain unfinished.
- LangGraph orchestration is a partial foundation rather than a fully connected six-agent product.

## Authorship

Developer biography was provided by Hussam Eddin Rabaa. Repository history contains multiple contributors, so portfolio text identifies the application as a collaborative project and does not attribute the entire system to one person.

## Media provenance

Screenshots and demonstration footage were captured through Playwright against the actual locally running Next.js/FastAPI application, using its real development services and a dedicated demonstration account. Browser development-tool chrome was hidden for presentation. Screen content was not replaced with generated imagery or mocked API responses.

Raw recordings, credentials, authentication state, and capture scripts remain outside this public repository. The public deliverables contain optimized WebP screenshots and a sanitized H.264 MP4. The recording's captions identify the scenes shown; any unavailable live feature is described separately rather than simulated.

The recorded saved plan came from a genuine provider-generated two-alternative request through the existing planning service, followed by the actual selection API. It was opened in the frontend for confirmation and activation. The video intentionally starts that part of the walkthrough from the saved plan; it does not present the frontend's failed three-option generation as successful. A separate companion screen shows an actual successful live-provider reply.
