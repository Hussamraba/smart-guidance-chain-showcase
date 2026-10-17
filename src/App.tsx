import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Map,
  MapPin,
  Maximize2,
  Menu,
  Network,
  Play,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import media from "./media.json";
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
const github = "https://github.com/Hussamraba/smart-guidance-chain-showcase";
const navigation = [
  ["Overview", "#overview"],
  ["Features", "#features"],
  ["Gallery", "#gallery"],
  ["Architecture", "#architecture"],
];
const features = [
  {
    icon: Compass,
    number: "01",
    title: "Discover Jordan",
    text: "Explore destinations, hotels, and restaurants through a curated interface backed by a structured tourism knowledge base.",
    tag: "Discovery",
    image: "places-desktop.webp",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Make the plan yours",
    text: "Generate alternatives around dates, interests, pace, and budget. Choose a route, refine its activities, and confirm it before starting.",
    tag: "AI-assisted planning",
    image: "plan-alternatives.webp",
  },
  {
    icon: Route,
    number: "03",
    title: "Keep the journey moving",
    text: "An activated trip connects your itinerary, map, arrival tracking, and progress. Review schedule changes before applying them.",
    tag: "Active trip",
    image: "active-trip.webp",
  },
  {
    icon: BrainCircuit,
    number: "04",
    title: "Ask with context",
    text: "A trip-scoped Smart Guide receives current itinerary facts, including what comes next, visited stops, and schedule delays.",
    tag: "Contextual companion",
    image: "smart-guide.webp",
  },
  {
    icon: AudioLines,
    number: "05",
    title: "Listen to the story",
    text: "Place-linked stops offer historical and cultural guidance, with English and Arabic narration generated and cached by the backend.",
    tag: "Place guidance",
    image: "place-guide.webp",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Build for the unexpected",
    text: "Emergency sessions, contact management, and consent-based location sharing support a separate assistance workflow.",
    tag: "Emergency tools",
    image: "",
  },
];
const nodes = [
  {
    id: "client",
    icon: Layers3,
    title: "Next.js frontend",
    subtitle: "The traveler’s experience",
    detail:
      "React and TypeScript power discovery, planning, trip management, and administration. TanStack Query synchronizes API state; Leaflet renders itinerary markers and browser geolocation supplies location updates.",
    layer: "Experience",
  },
  {
    id: "api",
    icon: Server,
    title: "FastAPI services",
    subtitle: "The application backbone",
    detail:
      "Typed API contracts connect authentication, tourism content, plan lifecycles, operational trips, chat, and emergency services. Ownership checks and concurrency tokens protect the main plan and trip workflows.",
    layer: "Application",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "AI gateway",
    subtitle: "Structured generation",
    detail:
      "A central async gateway wraps Gemini and Groq provider adapters with retry, failover, and circuit-breaker behavior. Planning validates structured outputs; place guidance can add retrieved knowledge.",
    layer: "Intelligence",
  },
  {
    id: "postgres",
    icon: Database,
    title: "PostgreSQL",
    subtitle: "Plans, trips, and content",
    detail:
      "SQLAlchemy persists tourism records, user accounts, conversations, saved planning blueprints, and activated trip itineraries. Alembic manages schema migrations.",
    layer: "Persistence",
  },
  {
    id: "redis",
    icon: Workflow,
    title: "Redis",
    subtitle: "Sessions and temporary state",
    detail:
      "Redis tracks refresh-token sessions and caches generated plan alternatives while a traveler compares options. It also supports agent-state persistence and emergency rate limiting.",
    layer: "Persistence",
  },
  {
    id: "qdrant",
    icon: Network,
    title: "Qdrant",
    subtitle: "Semantic knowledge retrieval",
    detail:
      "Multilingual embeddings index tourism knowledge for semantic search. Query expansion, ranking, and context building prepare relevant knowledge for grounded generation.",
    layer: "Persistence",
  },
  {
    id: "minio",
    icon: AudioLines,
    title: "MinIO",
    subtitle: "Images and guide audio",
    detail:
      "S3-compatible object storage holds uploaded cover images and synthesized narration. Guide audio is cached by itinerary item and language to avoid repeated synthesis.",
    layer: "Persistence",
  },
];
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All screens");
  const [selected, setSelected] = useState<number | null>(null);
  const [node, setNode] = useState("api");
  const video = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const screens = media.screens;
  const selectedNode = nodes.find((n) => n.id === node)!;
  const SelectedIcon = selectedNode.icon;
  const close = () => setSelected(null);
  useEffect(() => {
    if (selected === null) {
      dialog.current?.close();
      opener.current?.focus();
      return;
    }
    dialog.current?.showModal();
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setSelected((i) => (i === null ? null : (i + 1) % screens.length));
      if (e.key === "ArrowLeft")
        setSelected((i) =>
          i === null ? null : (i + screens.length - 1) % screens.length,
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", listener);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", listener);
    };
  }, [selected, screens.length]);
  function open(index: number) {
    opener.current = document.activeElement as HTMLElement;
    setSelected(index);
  }
  function watch() {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
    video.current?.focus();
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#" className="brand" aria-label="Smart Guidance Chain home">
            <span className="brand-icon">
              <Compass size={23} />
            </span>
            <span>
              smart guidance
              <span className="brand-second">
                chain<span className="cyan">.</span>
              </span>
            </span>
          </a>
          <nav
            className={menu ? "desktop-nav open" : "desktop-nav"}
            aria-label="Main navigation"
          >
            {navigation.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="header-github"
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} />
            <span>View project</span>
            <ArrowUpRight size={14} />
          </a>
          <button
            className="icon-button menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <Reveal className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> FULL-STACK ENGINEERING · APPLIED
              AI
            </p>
            <h1>
              From a plan.
              <br />
              To a <span className="gradient-text">journey.</span>
            </h1>
            <p className="hero-description">
              <strong>Smart Guidance Chain</strong> brings discovery,
              AI-assisted planning, and in-trip guidance together. Meet REHLA, a
              travel companion built for exploring Jordan.
            </p>
            <div className="hero-buttons">
              <button className="button button-primary" onClick={watch}>
                <Play size={16} fill="currentColor" />
                Watch the demo
                <ArrowUpRight size={16} />
              </button>
              <a className="button button-ghost" href="#features">
                Explore the system
                <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-note">
              <span className="mini-line" />A real application. An engineering
              case study.
            </div>
          </Reveal>
          <Reveal className="hero-visual">
            <div className="visual-topline">
              <span>
                <span className="status-dot" />
                REHLA / APPLICATION PREVIEW
              </span>
              <span>JORDAN · 31.95° N</span>
            </div>
            <div className="hero-browser">
              <div className="browser-chrome">
                <span className="traffic-lights">
                  <i />
                  <i />
                  <i />
                </span>
                <span>
                  <ShieldCheck size={11} />
                  rehla · discover jordan
                </span>
                <ExternalLink size={12} />
              </div>
              <img
                src={asset("screenshots/landing-desktop.webp")}
                alt="Authentic desktop capture of REHLA’s Petra destination homepage"
                width="1440"
                height="960"
                fetchPriority="high"
              />
              <button
                className="preview-play"
                onClick={watch}
                aria-label="Watch the real application demonstration"
              >
                <Play fill="currentColor" size={20} />
              </button>
            </div>
            <div className="visual-caption">
              <span>
                <MapPin size={14} />
                Built around a sense of place.
              </span>
              <span className="mono">01 / THE EXPERIENCE</span>
            </div>
            <div className="floating-note">
              <span className="floating-icon">
                <Route size={19} />
              </span>
              <div>
                <strong>Discover. Plan. Go.</strong>
                <span>One connected travel workflow</span>
              </div>
              <ArrowUpRight size={17} />
            </div>
          </Reveal>
        </section>
        <div className="stack-ribbon">
          <div className="container ribbon-inner">
            <span className="mono">THE BUILDING BLOCKS</span>
            {[
              "Next.js",
              "FastAPI",
              "PostgreSQL",
              "Redis",
              "Qdrant",
              "MinIO",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
            <span className="ribbon-end">
              <Code2 size={15} />
              Engineered to connect.
            </span>
          </div>
        </div>
        <section id="overview" className="section container overview">
          <Reveal>
            <SectionLabel number="01">THE IDEA</SectionLabel>
            <h2>
              Less scattered planning.
              <br />
              <span className="muted">More connected travel.</span>
            </h2>
          </Reveal>
          <Reveal className="overview-copy">
            <p>
              Planning a trip means piecing together destinations, schedules,
              local information, and what to do when plans change. REHLA brings
              those moments into one application.
            </p>
            <p>
              Built for travelers exploring Jordan, the system connects a
              structured tourism knowledge base to personalized plans and the
              operational reality of a trip.
            </p>
            <a className="text-link" href="#architecture">
              See how it fits together
              <ArrowRight size={16} />
            </a>
          </Reveal>
          <div className="overview-trio">
            {[
              {
                icon: Compass,
                title: "Before the trip",
                text: "Discover places and turn your preferences into a plan.",
              },
              {
                icon: Route,
                title: "Along the way",
                text: "Follow your itinerary, track visits, and review adjustments.",
              },
              {
                icon: BookOpen,
                title: "At each stop",
                text: "Explore a place’s context through guidance and narration.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <Reveal className="overview-item" key={title}>
                <Icon size={21} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="features" className="section section-tinted">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <SectionLabel number="02">THE CAPABILITIES</SectionLabel>
                <h2>
                  A companion for
                  <br />
                  the whole journey.
                </h2>
              </div>
              <p>
                From the first idea to the next stop.
                <br />
                Explore the workflows implemented in REHLA.
              </p>
            </Reveal>
            <div className="feature-grid">
              {features.map(
                ({ icon: Icon, number, title, text, tag, image }) => (
                  <Reveal className="feature-card" key={title}>
                    <div className="feature-card-top">
                      <span className="feature-icon">
                        <Icon size={24} />
                      </span>
                      <span className="mono">/{number}</span>
                    </div>
                    <span className="feature-tag">{tag}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {screens.some((s) => s.file === image) ? (
                      <button
                        className="feature-link"
                        onClick={() =>
                          open(screens.findIndex((s) => s.file === image))
                        }
                      >
                        View the actual screen
                        <ArrowUpRight size={15} />
                      </button>
                    ) : (
                      <span className="feature-code">
                        <Check size={13} />
                        Verified in implementation
                      </span>
                    )}
                  </Reveal>
                ),
              )}
            </div>
            <p className="scope-note">
              <span className="status-dot" />
              Functional prototype. Emergency delivery depends on provider
              setup; navigation uses estimated distances and travel times. Hotel
              and restaurant listings are for discovery.
            </p>
          </div>
        </section>
        <section id="gallery" className="section container">
          <Reveal className="section-heading">
            <div>
              <SectionLabel number="03">INSIDE THE APPLICATION</SectionLabel>
              <h2>
                Real screens.
                <br />
                <span className="muted">The details make it real.</span>
              </h2>
            </div>
            <p>
              Captured from the running application.
              <br />
              Select a screen to take a closer look.
            </p>
          </Reveal>
          <div
            className="gallery-tabs"
            role="group"
            aria-label="Filter application screenshots"
          >
            {["All screens", ...new Set(screens.map((s) => s.category))].map(
              (t) => (
                <button
                  key={t}
                  className={filter === t ? "active" : ""}
                  aria-pressed={filter === t}
                  onClick={() => setFilter(t)}
                >
                  {t}
                  {filter === t && (
                    <span>
                      {t === "All screens"
                        ? screens.length
                        : screens.filter((s) => s.category === t).length}
                    </span>
                  )}
                </button>
              ),
            )}
          </div>
          <div className="gallery-grid">
            {screens.map(
              (s, i) =>
                (filter === "All screens" || filter === s.category) && (
                  <Reveal
                    className={`gallery-card ${s.size === "wide" && filter === "All screens" ? "gallery-wide" : ""} ${s.size === "mobile" ? "gallery-mobile" : ""}`}
                    key={s.file}
                  >
                    <button
                      className="gallery-image"
                      onClick={() => open(i)}
                      aria-label={`Enlarge screenshot: ${s.title}`}
                    >
                      <div className="gallery-image-inner">
                        <img
                          src={asset(`screenshots/${s.file}`)}
                          alt={s.description}
                          width={s.size === "mobile" ? 780 : 1440}
                          height={s.size === "mobile" ? 1688 : 960}
                          loading="lazy"
                        />
                      </div>
                      <span className="expand-icon">
                        <Maximize2 size={18} />
                      </span>
                      <span className="capture-label">ACTUAL APPLICATION</span>
                    </button>
                    <div className="gallery-caption">
                      <div>
                        <span className="feature-tag">{s.category}</span>
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                      </div>
                      <span className="mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>
                ),
            )}
          </div>
        </section>
        <section id="demo" className="section section-tinted">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <SectionLabel number="04">SEE IT IN MOTION</SectionLabel>
                <h2>
                  A closer look.
                  <br />
                  No slides required.
                </h2>
              </div>
              <p>
                A walkthrough of the actual application.
                <br />
                Recorded locally with demonstration data.
              </p>
            </Reveal>
            <Reveal className="demo-layout">
              <div className="video-frame">
                <div className="browser-chrome">
                  <span className="traffic-lights">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>REHLA / PRODUCT WALKTHROUGH</span>
                  <span className="mono">{media.duration}</span>
                </div>
                {media.video ? (
                  <video
                    ref={video}
                    controls
                    playsInline
                    preload="none"
                    poster={asset("video/demo-poster.webp")}
                    tabIndex={0}
                    aria-label="Recorded demonstration of the REHLA travel application"
                  >
                    <source
                      src={asset("video/rehla-demo.mp4")}
                      type="video/mp4"
                    />
                    <track
                      default
                      kind="captions"
                      src={asset("video/captions.vtt")}
                      srcLang="en"
                      label="English scene descriptions"
                    />
                    Your browser does not support embedded video.{" "}
                    <a href={asset("video/rehla-demo.mp4")}>
                      Download the demonstration
                    </a>
                    .
                  </video>
                ) : (
                  <div className="video-unavailable">
                    <Terminal />
                    <p>
                      Video capture is unavailable in this environment. The
                      gallery contains real application captures.
                    </p>
                  </div>
                )}
              </div>
              <div className="demo-sidebar">
                <span className="eyebrow">THE WALKTHROUGH</span>
                <h3>Follow the experience.</h3>
                {[
                  "Explore Jordan",
                  "Discover destinations",
                  "Set travel preferences",
                  media.journey,
                ].map((title, i) => (
                  <div className="demo-chapter" key={title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{title}</strong>
                      <span>
                        {
                          [
                            "A destination-led introduction",
                            "Browse the tourism catalog",
                            "Dates, interests, pace, and budget",
                            "Captured from the running system",
                          ][i]
                        }
                      </span>
                    </div>
                  </div>
                ))}
                <div className="recording-note">
                  <span className="status-dot" />
                  Actual browser interactions.
                  <br />
                  No fabricated AI responses.
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <section id="architecture" className="section container">
          <Reveal className="section-heading">
            <div>
              <SectionLabel number="05">BEHIND THE EXPERIENCE</SectionLabel>
              <h2>
                One experience.
                <br />
                <span className="muted">A connected system.</span>
              </h2>
            </div>
            <p>
              Explore the components that power REHLA.
              <br />
              Select a node to see its role.
            </p>
          </Reveal>
          <div className="architecture-layout">
            <Reveal className="architecture-canvas">
              <div className="architecture-top">
                <span className="mono">SYSTEM MAP</span>
                <span>
                  <span className="status-dot" />
                  APPLICATION ARCHITECTURE
                </span>
              </div>
              <div className="architecture-main">
                {nodes
                  .slice(0, 3)
                  .map(({ id, icon: Icon, title, subtitle }, i) => (
                    <div className="architecture-node-wrap" key={id}>
                      <button
                        className={`architecture-node ${node === id ? "selected" : ""}`}
                        aria-pressed={node === id}
                        onClick={() => setNode(id)}
                      >
                        <Icon size={25} />
                        <span>
                          <strong>{title}</strong>
                          <small>{subtitle}</small>
                        </span>
                      </button>
                      {i < 2 && (
                        <ArrowRight className="architecture-arrow" size={20} />
                      )}
                    </div>
                  ))}
              </div>
              <div className="architecture-bridge">
                <span />
                <span className="mono">
                  SERVICE-MEDIATED DATA & MEDIA ACCESS
                </span>
                <span />
              </div>
              <div className="architecture-stores">
                {nodes.slice(3).map(({ id, icon: Icon, title, subtitle }) => (
                  <button
                    key={id}
                    className={`store-node ${node === id ? "selected" : ""}`}
                    aria-pressed={node === id}
                    onClick={() => setNode(id)}
                  >
                    <Icon size={21} />
                    <strong>{title}</strong>
                    <small>{subtitle}</small>
                  </button>
                ))}
              </div>
              <div className="architecture-external">
                <span className="mono">EXTERNAL ADAPTERS</span>
                <p>
                  Gemini / Groq<span>·</span>Open-Meteo<span>·</span>gTTS
                  <span>·</span>Google Places <small>(optional)</small>
                </p>
              </div>
            </Reveal>
            <Reveal className="node-inspector">
              <span className="feature-tag">{selectedNode.layer}</span>
              <SelectedIcon size={32} />
              <h3>{selectedNode.title}</h3>
              <p>{selectedNode.detail}</p>
              <span className="inspector-hint">
                <Network size={14} />
                Select another component to explore
              </span>
            </Reveal>
          </div>
          <p className="architecture-caption">
            The browser calls FastAPI services; services coordinate persistence
            and external adapters. The diagram groups dependencies and does not
            imply direct browser-to-database access.
          </p>
        </section>
        <section id="stack" className="section section-tinted">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <SectionLabel number="06">THE TECHNOLOGY</SectionLabel>
                <h2>
                  Purposeful tools.
                  <br />
                  Clear responsibilities.
                </h2>
              </div>
              <p>
                Technologies verified in the project.
                <br />
                Each chosen for a specific layer.
              </p>
            </Reveal>
            <div className="technology-grid">
              {[
                {
                  title: "Frontend",
                  icon: Layers3,
                  items: [
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "TanStack Query",
                    "Leaflet",
                  ],
                },
                {
                  title: "Backend",
                  icon: Server,
                  items: [
                    "Python",
                    "FastAPI",
                    "Pydantic",
                    "SQLAlchemy",
                    "Alembic",
                  ],
                },
                {
                  title: "AI & retrieval",
                  icon: BrainCircuit,
                  items: [
                    "Gemini / Groq adapters",
                    "Sentence Transformers",
                    "Multilingual embeddings",
                    "LangGraph foundation",
                    "gTTS",
                  ],
                },
                {
                  title: "Data & storage",
                  icon: Database,
                  items: ["PostgreSQL", "Redis", "Qdrant", "MinIO"],
                },
                {
                  title: "Development",
                  icon: Terminal,
                  items: [
                    "Docker Compose",
                    "pytest",
                    "Vitest",
                    "Playwright",
                    "Git",
                  ],
                },
                {
                  title: "This portfolio",
                  icon: Code2,
                  items: [
                    "React + Vite",
                    "TypeScript",
                    "Tailwind CSS",
                    "Framer Motion",
                    "GitHub Pages",
                  ],
                },
              ].map(({ title, icon: Icon, items }) => (
                <Reveal className="technology-card" key={title}>
                  <div>
                    <Icon size={19} />
                    <h3>{title}</h3>
                  </div>
                  <ul>
                    {items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section id="engineering" className="section container">
          <Reveal className="section-heading">
            <div>
              <SectionLabel number="07">ENGINEERING NOTES</SectionLabel>
              <h2>
                Good experiences start
                <br />
                with careful decisions.
              </h2>
            </div>
            <p>
              Four implementation choices
              <br />
              that give the system its shape.
            </p>
          </Reveal>
          <div className="engineering-list">
            {[
              {
                number: "01",
                icon: Workflow,
                title: "A plan is not a trip.",
                text: "The planning blueprint and operational trip are separate resources. Selecting, confirming, and activating a plan are explicit transitions, so editing a draft and following an active itinerary have distinct responsibilities.",
                tags: ["Domain modeling", "Lifecycle design"],
              },
              {
                number: "02",
                icon: Map,
                title: "Trust the place data.",
                text: "Generated alternatives are validated before use. Trusted place names and map coordinates come from matched database records, keeping AI-authored text separate from verified spatial metadata.",
                tags: ["Structured outputs", "Data grounding"],
              },
              {
                number: "03",
                icon: ShieldCheck,
                title: "Changes deserve a review.",
                text: "Replanning first creates a proposal. The traveler sees the changes before applying them, and the backend checks the latest trip version to avoid overwriting a schedule that has changed elsewhere.",
                tags: ["Explicit control", "Concurrency checks"],
              },
              {
                number: "04",
                icon: AudioLines,
                title: "Generate once. Listen again.",
                text: "Guide audio is stored by itinerary item and language. Repeated requests can reuse the existing narration rather than calling both the language model and speech provider again.",
                tags: ["Caching", "Resource efficiency"],
              },
            ].map(({ number, icon: Icon, title, text, tags }) => (
              <Reveal className="engineering-row" key={title}>
                <span className="engineering-number">{number}</span>
                <div className="engineering-title">
                  <Icon size={21} />
                  <h3>{title}</h3>
                </div>
                <div>
                  <p>{text}</p>
                  <div className="engineering-tags">
                    {tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="project-status">
            <div>
              <span className="status-dot" />
              <strong>Built, with room to grow.</strong>
            </div>
            <p>
              REHLA is a functional prototype. The main interface is English,
              with bilingual place guidance. Dedicated vision,
              notification-center, and some secondary screens remain unfinished.
              The agent orchestration foundation is partially wired; it is not a
              fully connected six-agent product.
            </p>
          </Reveal>
        </section>
        <section id="developer" className="developer-section">
          <div className="container developer-layout">
            <Reveal>
              <SectionLabel number="08">THE DEVELOPER</SectionLabel>
              <h2>
                Curiosity, translated
                <br />
                into working software.
              </h2>
              <p className="developer-intro">Hussam Eddin Rabaa</p>
              <p className="developer-description">
                Software Engineering graduate focused on Applied AI and Software
                Engineering. Interested in the space where useful intelligence
                meets thoughtful, dependable applications.
              </p>
              <a
                className="button button-primary"
                href="https://github.com/Hussamraba"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} />
                Find me on GitHub
                <ArrowUpRight size={16} />
              </a>
              <p className="contribution-note">
                Smart Guidance Chain is a collaborative project. This portfolio
                presents the system and its engineering without assigning sole
                authorship.
              </p>
            </Reveal>
            <Reveal className="developer-card">
              <div className="developer-monogram">
                HR<span className="cyan">.</span>
              </div>
              <div className="developer-card-bottom">
                <span>HUSSAM EDDIN RABAA</span>
                <p>
                  Build with purpose.
                  <br />
                  <span className="muted">Keep asking better questions.</span>
                </p>
                <a href={github} target="_blank" rel="noreferrer">
                  Explore this portfolio’s source
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <Code2 className="developer-code" size={150} strokeWidth={0.7} />
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="container footer">
        <a className="footer-brand" href="#">
          <Compass size={21} />
          Smart Guidance Chain<span className="cyan">.</span>
        </a>
        <p>A case study of REHLA. Built for the journey.</p>
        <div>
          <a href="#demo">Demo</a>
          <a href={github} target="_blank" rel="noreferrer">
            Showcase source
            <ArrowUpRight size={13} />
          </a>
          <a
            href="https://github.com/Hussamraba"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <ArrowUpRight size={13} />
          </a>
        </div>
        <span className="footer-bottom">
          © 2026 Hussam Eddin Rabaa
          <span>React + Vite · Hosted on GitHub Pages</span>
        </span>
      </footer>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={
          selected !== null ? screens[selected].title : "Application screenshot"
        }
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        {selected !== null && (
          <div className="lightbox-content">
            <div className="lightbox-top">
              <div>
                <span className="feature-tag">
                  ACTUAL APPLICATION · {selected + 1}/{screens.length}
                </span>
                <h2>{screens[selected].title}</h2>
              </div>
              <button
                className="icon-button"
                onClick={close}
                aria-label="Close screenshot"
              >
                <X />
              </button>
            </div>
            <img
              src={asset(`screenshots/${screens[selected].file}`)}
              alt={screens[selected].description}
            />
            <div className="lightbox-bottom">
              <button
                className="icon-button"
                onClick={() =>
                  setSelected((selected + screens.length - 1) % screens.length)
                }
                aria-label="Previous screenshot"
              >
                <ChevronLeft />
              </button>
              <p>{screens[selected].description}</p>
              <button
                className="icon-button"
                onClick={() => setSelected((selected + 1) % screens.length)}
                aria-label="Next screenshot"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
export default App;
