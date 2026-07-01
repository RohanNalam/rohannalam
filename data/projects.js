// Projects. `object` picks the 3D model (see components/three/objects.js):
//   computer · floppy · tv · coin · gem · rocket · robot · controller · knot
// `glow` is the radial halo color behind the canvas.
// `placeholder: true` = waiting on details from Rohan (search PLACEHOLDER).

const GREEN = 'rgba(87,217,138,0.42)';
const PURPLE = 'rgba(176,107,240,0.45)';

export const projects = [
  {
    id: 'cypra',
    title: 'Cypra',
    kind: 'Log intelligence for AI agents',
    year: '2025',
    role: 'Creator',
    object: 'computer',
    glow: GREEN,
    blurb:
      'A log-compression + analysis layer that lets AI coding agents debug without burning their context window. Raw logs in, structured “IncidentCapsules” out.',
    bullets: [
      'Drain-based compressor processes ~88k log lines/sec, cutting noise while keeping 100% verbatim evidence.',
      'Claude tags compressed evidence into root causes, triggers and consequences with narrative explanations.',
      'Ships as an MCP server, CLI, and API — drops into Claude Code, Codex, Cursor and others.',
      'Demonstrated up to 168× compression across 42k lines / 14 systems with measurable gains in agent diagnostic accuracy.',
    ],
    tags: ['MCP', 'Python', 'Claude API', 'log analysis', 'data infra'],
    live: 'https://cypra1.vercel.app/',
    github: '', // PLACEHOLDER
    video: '',
  },
  {
    id: 'teamflix',
    title: 'Teamflix',
    kind: 'Ship faster with AI on your team',
    year: '2025',
    role: 'Creator',
    object: 'floppy',
    glow: PURPLE,
    blurb:
      'A platform for deploying and managing AI coding agents across an organization — run, monitor and govern many agents from one interface.',
    bullets: [
      'Sandboxed “instant sessions” spin up in seconds with zero config, on existing repos.',
      'Team guardrails: block risky actions, require tests, cap spend per agent.',
      'Live observability into commits, file changes and cost in real time.',
      'Works across Claude Code, Cursor, OpenAI Codex, Copilot, Gemini CLI and Devin.',
    ],
    tags: ['Next.js', 'agents', 'observability', 'sandboxing'],
    live: 'https://teamflix-mu.vercel.app/',
    github: '', // PLACEHOLDER
    video: '',
  },
  {
    id: 'frame',
    title: 'Frame',
    kind: 'Video Intelligence API · “Stripe for video”',
    year: '2025 – present',
    role: 'Co-Founder & Builder',
    object: 'tv',
    glow: PURPLE,
    award: '4th place — NextHacks @ Carnegie Mellon',
    blurb:
      'A developer-infrastructure startup that turns video into structured, queryable data with a single API call. Co-founded and placed 4th at NextHacks (CMU).',
    bullets: [
      'Pipeline ingests a YouTube URL and within ~90s returns transcripts w/ timestamps, key topics, product mentions, scene changes and key moments as clean JSON.',
      'Content-gap engine (Woodwork API) clusters videos, detects underrepresented topics and surfaces AI strategy recommendations.',
      '64 waitlist signups in a single day from on-campus demos — strong validation for video-as-data.',
      'Full stack: REST backend, /docs developer portal, real-time processing table UI and analytics dashboard.',
    ],
    tags: ['REST API', 'video processing', 'Woodwork API', 'startup'],
    live: '', // PLACEHOLDER
    github: '',
    video: 'https://www.loom.com/embed/2eddbe01b27c4822bb185964c3dcca98',
  },
  {
    id: 'visor',
    title: 'Visor',
    kind: 'LLM vs. Financial-Advisor Backtesting Framework',
    year: '2025 – 2026',
    role: 'AP Research — Independent Study',
    object: 'coin',
    glow: GREEN,
    blurb:
      'A 38-page original research paper + full Python backtesting engine asking: can financial advisors still beat the S&P 500 against LLMs and quant models?',
    bullets: [
      'Modular pipeline (data / quant / llm / metrics / plotting / config) evaluates 9 strategies under identical conditions, Jan 2020 – Mar 2026.',
      'Quant model uses 4 indicators (MA crossover, 3-period momentum, RSI, rolling vol) with a 2-of-4 threshold and look-ahead-bias prevention via 1-period signal shifting.',
      'Simulated 5 LLM agents (GPT, Gemini, Claude Sonnet, DeepSeek, Grok) via behavioral profiles + Gaussian noise N(0, 0.15); Gemini led at +149.5% return, Sharpe 0.83 vs S&P’s 0.60.',
      'Hybrid system hit +133.1% return with only −14.9% max drawdown — beating the market at lower risk. Finding: advisors alone can’t beat the S&P, but a calibrated LLM hybrid can.',
    ],
    tags: ['Python', 'backtesting', 'quant', 'LLMs', 'research'],
    live: '',
    github: '', // PLACEHOLDER
    video: '',
  },
  {
    id: 'crypto-prediction',
    title: 'Crypto Price Prediction Model',
    kind: 'Short-term price prediction · Hackathon',
    year: '2023',
    role: 'Builder',
    object: 'gem',
    glow: PURPLE,
    blurb:
      'A machine-learning model for short-term crypto price prediction that fuses proprietary on-chain signals with public market data across multiple assets.',
    bullets: [
      'Evaluated with Pearson correlation between predicted and realized returns; iterated on feature engineering and normalization.',
      'Managed in-memory time-series alignment across sources with different update frequencies.',
    ],
    tags: ['ML', 'time-series', 'pandas', 'on-chain'],
    live: '',
    github: '', // PLACEHOLDER
    video: '',
  },

  {
    id: 'jarvis',
    title: 'Jarvis',
    kind: 'Voice-controlled AI desktop assistant',
    year: '2025',
    role: 'Creator',
    object: 'robot',
    glow: GREEN,
    blurb:
      'A hands-free AI assistant for Windows that controls your PC by voice — opening apps, playing specific songs on Spotify, reading Gmail aloud, searching the web — and actually gets cheaper and faster to run the more you use it. It listens for a wake word, transcribes commands, and executes real OS actions through Claude’s tool-use API, with persistent long-term memory of your habits and preferences.',
    bullets: [
      'Cost-reducing smart cache: a three-tier system (learned-shortcut replay, semantic vector cache, and Anthropic prompt caching) cuts per-command API cost by up to ~90% as your patterns are learned.',
      'Vision-based UI automation: screenshots the screen and uses a cheap vision model to locate and click elements with no public API — e.g. finding and playing the right Spotify track among look-alikes.',
      'Tiered model routing — simple queries hit Haiku, complex multi-step tasks hit the larger model — and a latency-tuned voice pipeline (sliding-window wake word, pipelined neural TTS) cut wake-to-response from ~2.3s to ~0.6s.',
      'Privacy by design (path/extension blocklists, blocked destructive shell commands) plus reliability polish: mid-task interrupt hotkey, undo of the last action, and an Electron layer that health-monitors the Python backend.',
    ],
    tags: ['Python', 'Electron', 'Claude API', 'Whisper', 'ChromaDB', 'voice'],
    live: '',
    github: '', // PLACEHOLDER
    video: '',
  },
  {
    id: 'vtm',
    title: 'VTM',
    kind: 'Volatility Trading Model',
    year: '2025',
    role: 'Builder',
    object: 'controller',
    glow: PURPLE,
    blurb:
      'An enhanced volatility trading system that fuses six independent signal layers into a single, confidence-weighted long/short vol signal. It pulls live SPY and VIX data daily, trades the realized-vs-implied vol spread, and adapts to changing market regimes instead of relying on hardcoded thresholds.',
    bullets: [
      'Detects low/mid/high vol regimes with rolling quantiles, and filters bad entries using a vol-of-vol (VVIX) z-score that flattens the book when second-order volatility spikes.',
      'Requires multi-timeframe confluence across 5-, 21-, and 63-day horizons before firing, and sizes positions with a skew/kurtosis-adjusted Kelly criterion capped at 25% of capital.',
      'Adaptive ATR bands widen in high-vol regimes and tighten in compression to reduce whipsaws.',
      'Ships a dark-themed interactive dashboard: a G6 (AntV) live signal-flow network graph plus custom canvas charts for price, RV/IV spread, vol-of-vol, Kelly sizing, and signal distribution.',
    ],
    tags: ['Python', 'NumPy', 'pandas', 'yfinance', 'NetworkX', 'G6 (AntV)'],
    live: '',
    github: '', // PLACEHOLDER
    video: '',
  },
  {
    id: 'threed',
    title: '3D Scanner',
    kind: 'Webcam object capture → 3D files',
    year: '2025',
    role: 'Builder',
    object: 'knot',
    glow: GREEN,
    blurb:
      'A computer-vision tool that turns your webcam into a desktop 3D scanner. Hold a physical object up to the camera and it detects, isolates, and reconstructs it in real time, then generates a ready-to-use 3D model file for it — no scanning rig or turntable required.',
    bullets: [
      'Live webcam feed with object detection that locks onto whatever you hold up and segments it from the background.',
      'Reconstructs the captured object into geometry and exports it as a standard 3D file you can drop into other tools.',
      'Built to be fully hands-free — show the object, get a file, no manual modeling step.',
    ],
    tags: ['Python', 'OpenCV', 'computer vision', '3D reconstruction'],
    live: '',
    github: '', // PLACEHOLDER
    video: '',
  },
];
