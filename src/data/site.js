// All portfolio content lives here. Edit this file to update the site.

export const SITE_URL = "https://www.sachindev.engineer";

const CDN = "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto";

export const profile = {
  name: "Sachin Jaiswal",
  role: "Full Stack Developer",
  location: "Sonipat, India",
  photo: `${CDN}/v1777530331/Web_Photo_Editor_vfs6qd.jpg`,
  email: "sj586997@gmail.com",
  resume: "/Sachin_Jaiswal_Resume.pdf",
  github: "jaiswalsachin49",
  current: { role: "Software Development Intern", company: "Mindtrot Technologies" },
  bio: "I build production-ready web apps with real-time features — and lately, AI agents that do real work. B.Tech (AI) student at Newton School of Technology, competitive programmer, and finalist in two national-level hackathons at IIT Roorkee.",
  socials: [
    { label: "GitHub", href: "https://github.com/jaiswalsachin49", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jasiwalsachin49/", icon: "linkedin" },
    { label: "X (Twitter)", href: "https://x.com/weirdo_49", icon: "twitter" },
  ],
};

// Competitive programming profile — shown as a stat strip in the hero.
export const cpStats = [
  { value: "1068", label: "ICPC Prelims AIR", note: "3000+ teams", href: null },
  { value: "1700+", label: "LeetCode", href: "https://leetcode.com/u/jaiswalsachin_49/" },
  { value: "1200+", label: "Codeforces", href: "https://codeforces.com/profile/jaiswalsachin_49" },
  { value: "2★", label: "CodeChef", href: null },
];

export const about = {
  intro:
    "I like owning a product end to end — the data model, the API, the interface and the deploy. Most of what I build starts from a real problem: a fuel station still run on paper, students who can't find someone to learn from, sales teams reading the news by hand to find leads.",
  story: [
    "I came to code without a tech background at home. School was cricket; college was where a few lines of HTML and CSS first gave me goosebumps. That curiosity turned into competitive programming — still how I sharpen my problem-solving — and into shipping products at hackathons, and now in production at Mindtrot.",
    "Right now I'm going deeper on AI agents and system design, and looking for teams where I can ship fast and learn from people better than me.",
  ],
  principles: [
    { title: "Start from the problem", body: "Talk to the people who feel the pain before writing a line of code." },
    { title: "Ship, then sharpen", body: "Get a working version in front of users, then iterate on what they actually use." },
    { title: "Think like a contest", body: "Edge cases, complexity and correctness first — habits from competitive programming." },
  ],
  facts: [
    { label: "Based in", value: "Sonipat, India" },
    { label: "Studying", value: "B.Tech in AI · NST '28" },
    { label: "Working", value: "SDE Intern @ Mindtrot" },
    { label: "Exploring", value: "AI agents, system design" },
    { label: "Off-screen", value: "Cricket" },
  ],
};

export const experience = [
  {
    company: "Mindtrot Technologies",
    role: "Software Development Intern",
    period: "Jul 2026 — Present",
    location: "Remote",
    points: [
      "Build responsive UI with React, Next.js, JavaScript and Tailwind CSS on production codebases.",
      "Implement features, integrate APIs and fix frontend bugs across web and mobile apps.",
      "Ship through reviewed pull requests with the engineering team on Git/GitHub.",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "Capacitor", "Ant Design"],
  },
];

export const education = [
  {
    school: "Newton School of Technology, Rishihood University",
    degree: "B.Tech, Artificial Intelligence",
    period: "2024 — 2028",
    location: "Sonipat, Haryana",
    note: "CGPA 7.88 / 10",
  },
];

// Projects with a `caseStudy` get their own page at /projects/<slug>.
export const projects = [
  {
    slug: "skillswap",
    title: "SkillSwap",
    tagline: "Peer-to-peer skill exchange platform",
    category: "Full Stack",
    date: "Nov 2025",
    featured: true,
    description:
      "A MERN marketplace where people trade skills — real-time chat, session booking, ratings and a live map of nearby learners.",
    image: `${CDN}/v1777529238/SkillSwap_pixjav.png`,
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Cloudinary"],
    links: {
      live: "https://skillswapconstruct.vercel.app/",
      github: "https://github.com/jaiswalsachin49/Construct-Hackathon",
    },
    caseStudy: {
      problem:
        "Learning a new skill usually means paying for a course. Plenty of people would happily teach what they know in exchange for learning something else — they just have no good way to find each other, agree on a time, and trust the other person.",
      built: [
        "JWT-authenticated MERN marketplace with skill matching and persistent profiles on MongoDB Atlas.",
        "Real-time, bidirectional messaging with Socket.io.",
        "Session booking with availability management, plus ratings and reviews to build trust.",
        "Map of nearby learners (Leaflet) and live-streamed sessions (Agora).",
        "Responsive React UI with React Router, Context API and Tailwind CSS; profile images optimised through Cloudinary.",
      ],
      flow: ["React client", "Express REST API + Socket.io", "MongoDB Atlas", "Cloudinary / Agora"],
      highlights: [
        { title: "Real-time by default", body: "Chat and booking updates arrive instantly over WebSockets instead of polling." },
        { title: "Hardened API", body: "Helmet, rate limiting, HPP and a profanity filter protect a public, user-generated platform." },
        { title: "Deployed end to end", body: "Frontend on Vercel, API on Render, data on MongoDB Atlas." },
      ],
    },
  },
  {
    slug: "fuelflow",
    title: "FuelFlow",
    tagline: "Petrol pump management system",
    category: "Full Stack",
    date: "Oct 2025",
    featured: true,
    description:
      "Runs a fuel station end to end — shifts, sales, tanks, pumps, inventory and reconciliation — with role-based dashboards.",
    image: `${CDN}/v1777529238/FuelFlow_n5keqn.png`,
    stack: ["React", "Express", "MongoDB", "JWT", "Recharts", "Tailwind CSS"],
    links: {
      live: "https://petrol-pump-management-sys.vercel.app/dashboard",
      github: "https://github.com/jaiswalsachin49/PETROL_PUMP_MANAGEMENT_SYS",
    },
    metric: "80% fewer manual tracking errors",
    caseStudy: {
      problem:
        "Fuel stations still track shifts, dip readings, credit sales and reconciliation on paper and spreadsheets. Errors creep in at every hand-off and owners can't see what's happening across departments.",
      built: [
        "Role-based access for Admin, Manager, Accountant and Employee.",
        "Shift and sales management covering cash and credit customers.",
        "Tank and pump monitoring with dip readings and nozzle control.",
        "Inventory, purchases, suppliers and reconciliation tools with exportable reports.",
        "Admin dashboards with real-time filtering, dynamic tables and charts.",
      ],
      flow: ["React dashboards", "Express REST API", "Mongoose models", "MongoDB Atlas"],
      highlights: [
        { title: "80% fewer errors", body: "Centralised analytics and streamlined shift reports cut manual tracking errors by about 80%." },
        { title: "Secure by design", body: "JWT in HTTP-only cookies, bcrypt hashing, Helmet, CORS and rate limiting." },
        { title: "11 core collections", body: "Users, employees, tanks, pumps, shifts, sales, customers, suppliers, purchases, inventory and transactions." },
      ],
    },
  },
  {
    slug: "zooper",
    title: "Zooper",
    tagline: "Movie & TV discovery app",
    category: "Frontend",
    date: "2025",
    featured: true,
    description:
      "Netflix-style movie and TV discovery on the TMDB API — debounced search, genre browsing, cast pages, favourites and a continue-watching row that survives reloads.",
    image: "/projects/zooper.jpg",
    stack: ["React", "React Router", "Tailwind CSS", "Framer Motion", "TMDB API"],
    links: { live: "https://zooper49.vercel.app/" },
  },
  {
    slug: "ev-charging-intelligence",
    title: "EV Charging Intelligence",
    tagline: "ML demand prediction + agentic trip planner",
    category: "AI / ML",
    date: "Apr 2026",
    featured: true,
    description:
      "A random-forest model predicts charger demand; a LangGraph agent uses it to plan when and where an EV driver should charge.",
    image: "/projects/ev-charging.jpg",
    stack: ["Python", "LangGraph", "Groq", "scikit-learn", "Streamlit"],
    links: {
      live: "https://ev-intelligence-charging-predictor.streamlit.app/",
      github: "https://github.com/jaiswalsachin49/EV_Charging_Intelligence",
    },
    caseStudy: {
      problem:
        "EV drivers don't know whether a charging station will be free when they arrive. A question like “I'm driving to New York on Friday at 5 PM with a Level 2 charger — where and when should I charge?” needs both a prediction and reasoning.",
      built: [
        "Data pipeline for cleaning, time-series feature engineering and de-duplication.",
        "scikit-learn Pipeline (ColumnTransformer + RandomForestRegressor) for sub-second utilisation predictions.",
        "Four-node LangGraph state machine: Reasoner → ML tool + live-context tool → Synthesiser.",
        "Streamlit app with an analytics dashboard, interactive map and chat-based trip planner.",
      ],
      flow: ["User question", "Reasoner (Llama 3.3)", "ML model + live context", "Personalised itinerary"],
      highlights: [
        { title: "ML as an agent tool", body: "The trained model is called as a tool inside the agent, so answers rest on predictions rather than guesses." },
        { title: "Transparent reasoning", body: "A typed state object collects every node's output, so you can see how each recommendation was made." },
        { title: "Lite model for deploy", body: "The full 1.47 GB model is swapped for a <100 MB version so it runs on Streamlit Cloud." },
      ],
    },
  },
  {
    slug: "hpcl-lead-agent",
    title: "HPCL Lead Intelligence Agent",
    tagline: "Autonomous B2B lead discovery for industrial fuel sales",
    category: "AI Agent",
    date: "Feb 2026",
    award: "Finalist · Productathon, IIT Roorkee",
    description:
      "Finds industrial fuel buyers in news and tender notices, scores them with an LLM, and pings the right sales officer on WhatsApp.",
    image: null,
    stack: ["FastAPI", "Groq Llama 3.3", "Next.js", "React Native", "Twilio"],
    links: { github: "https://github.com/jaiswalsachin49/Productathon" },
    caseStudy: {
      problem:
        "HPCL's industrial sales teams find new customers for furnace oil, bitumen and LDO by manually reading news and tender sites. Good leads are missed or reach the wrong regional officer too late.",
      built: [
        "Scheduler that monitors Google News, Bing News and tender aggregators every 30 minutes.",
        "Entity extraction plus Groq (Llama 3.3 70B) analysis to infer which products a company needs.",
        "Lead scoring based on signal quality and source trust.",
        "Manager dashboard with KPIs, pipeline, team performance and regional insights (Next.js).",
        "Field app for sales officers (React Native / Expo) with deep links and status updates.",
        "Region-based WhatsApp alerts and daily summaries through Twilio.",
      ],
      flow: ["News & tender sources", "FastAPI + APScheduler", "Groq LLM scoring", "Dashboard · App · WhatsApp"],
      highlights: [
        { title: "Fully autonomous", body: "From discovery to the right officer's phone with no manual step in between." },
        { title: "Three surfaces", body: "Web dashboard for managers, mobile app for the field, WhatsApp for instant alerts." },
        { title: "Hackathon finalist", body: "Reached the finals of Productathon, a national-level hackathon at IIT Roorkee." },
      ],
    },
  },
  {
    slug: "alcovia",
    title: "Alcovia",
    tagline: "Offline-first study app with two-device sync",
    category: "Full Stack",
    date: "Jun 2026",
    description:
      "Focus sessions and syllabus tracking that work offline and converge across devices using Lamport clocks.",
    image: null,
    stack: ["TypeScript", "Expo", "Zustand", "Express", "SQLite", "n8n"],
    links: { github: "https://github.com/jaiswalsachin49/Alcovia" },
    caseStudy: {
      problem:
        "Students study on more than one device and often without internet. Progress made offline on one device must merge cleanly with the other — without trusting device clocks and without double-counting rewards.",
      built: [
        "Expo (web) client with focus timer, syllabus tree and a dev panel to simulate offline mode.",
        "Zustand store persisted to namespaced localStorage per device.",
        "Express + SQLite sync API with row-level Lamport clocks.",
        "Idempotent reward processing and async n8n webhooks.",
      ],
      flow: ["Device A / B (offline)", "Local Lamport clock", "/sync API", "SQLite + n8n webhook"],
      highlights: [
        { title: "Deterministic convergence", body: "Higher Lamport clock wins, with device ID as a tie-break, so both devices always end in the same state." },
        { title: "Safe retries", body: "Each focus session has a UUID checked against a processed-sessions table, so retries never double-reward." },
        { title: "Trade-offs written down", body: "CRDTs were considered and rejected as overkill for toggling statuses; known failure modes are documented." },
      ],
    },
  },
  {
    slug: "blog-automation",
    title: "Blog Automation",
    category: "AI",
    date: "Apr 2026",
    description: "Generates and publishes blog posts end to end using Claude, Gemini and Groq models.",
    image: null,
    stack: ["Next.js", "TypeScript", "LLM APIs"],
    links: {
      live: "https://blog-automation-self.vercel.app",
      github: "https://github.com/jaiswalsachin49/blog_automation",
    },
  },
];

export const achievements = [
  {
    title: "3rd Place — Prod-G",
    event: "Cognizance 2026, IIT Roorkee",
    date: "Mar 2026",
    certificate: "/certificates/prodg.jpg",
  },
  {
    title: "Finalist — Productathon",
    event: "IIT Roorkee · National-level hackathon",
    date: "Feb 2026",
    certificate: "/certificates/productathon.jpg",
    project: "hpcl-lead-agent",
  },
  {
    title: "Finalist — Mind The Product",
    event: "IIT Roorkee · National-level hackathon",
    date: "Feb 2026",
    certificate: "/certificates/mtp.jpg",
  },
  {
    title: "Finalist — Hack4Delhi",
    event: "NSUT Delhi · 500+ participants",
    date: "2025",
    certificate: "/certificates/hack4delhi.jpg",
  },
];

export const hackathons = [
  { title: "ICPC Preliminaries", event: "AIR 1068 of 3000+ teams", date: "2025", certificate: null },
  { title: "ThinkRoot × Vortex '26", event: "NIT Tiruchirappalli · Team NAN", date: "2026", certificate: "/certificates/nit-trichy.jpg" },
  { title: "HackXIndia", event: "IIMT University, Meerut · Team UrbanIQ", date: null, certificate: "/certificates/hackxindia.jpg" },
];

export const skills = {
  Languages: ["C++", "Python", "TypeScript", "JavaScript", "SQL"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "React Native", "Expo"],
  Backend: ["Node.js", "Express", "FastAPI", "Socket.io", "Prisma ORM", "REST APIs"],
  Databases: ["MongoDB", "MySQL", "SQLite"],
  "AI / ML": ["LangChain", "LangGraph", "LLMs", "scikit-learn", "Pandas", "n8n"],
  Tools: ["Git & GitHub", "Postman", "Vercel", "Render", "Tableau"],
};

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "github", label: "GitHub" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
