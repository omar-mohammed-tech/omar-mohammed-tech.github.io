/* ===================================================================
   PROJECT DATA: single source of truth
   Used by index.html (cards) and project.html (full case studies).
   Edit here to change any project. Images live in
   assets/images/projects/<slug>/ ; cover is the card thumbnail.
   `galleries` render as image grids with a click-to-zoom lightbox.
   =================================================================== */
window.PROJECTS = [
  {
    slug: "unstuck",
    title: "Unstuck",
    domain: "Mental Health · Mobile · AI",
    role: "Product Owner & Solo Builder",
    status: "Built solo with AI",
    theme: "#2A7D74",
    cover: "assets/images/projects/unstuck-logo.png",
    coverBg: "#ffffff",
    detailCover: "assets/images/projects/unstuck/01-exposure-log.png",
    detailCoverBg: "#f1edf7",
    tagline:
      "A cross platform mobile app for anxiety, designed and built end to end solo, with an AI exposure coach powered by large language models.",
    sections: [
      {
        h: "Overview",
        p: "<p>Unstuck is a production grade mobile app that helps people work through anxiety and panic using <strong>exposure therapy</strong> and <strong>ACT</strong> (Acceptance and Commitment Therapy). Instead of generic breathing exercises, it gives people a structured way to face a fear, log what happened, and get intelligent feedback between sessions.</p><p>I designed, built, and shipped it end to end on my own, from the React Native app to the cloud backend and an AI coaching feature, using AI assisted (agentic) development to move at the pace of a small team.</p>",
      },
      {
        h: "The problem",
        list: [
          "Most anxiety apps are either clinical and intimidating, or shallow and gimmicky.",
          "Exposure therapy genuinely works, but it is hard to do alone, without structure or feedback.",
          "Between sessions, people get no personalised guidance on what to try next or how they are progressing.",
        ],
      },
      {
        h: "How it works",
        p: "<p>The app is built around one repeatable loop: face a fear, record what happened, and learn from it. Journaling, audio, habits, and medication tracking all support that core cycle.</p>",
        list: [
          "<strong>Exposure Journal</strong>: log each exposure with the situation, anxiety rating, and duration, and build a streak by showing up.",
          "<strong>AI coach</strong>: every logged exposure is scored and returned with structured, personalised feedback.",
          "<strong>Daily journal and mood trends</strong>: fast entries with an anxiety by day chart that surfaces patterns over time.",
          "<strong>SOS</strong>: grounding flashcards and guided audio for panic moments, reachable from anywhere in the app.",
          "<strong>Habits and medications</strong>: adherence streaks, reminders, and printable reports to share with a clinician.",
        ],
      },
      {
        h: "The AI exposure coach",
        p: "<p>The standout feature turns a logged exposure into genuinely useful coaching, not generic chat. The app sends a structured prompt to a large language model and receives a <strong>schema validated JSON response</strong>, which the interface renders as a clean evaluation card.</p>",
        list: [
          "Returns a score, what went well, what to watch for, and one key insight, every time.",
          "Prompts are versioned and constrained, so output stays consistent and safe for a mental health context.",
          "Server side usage controls and a free tier limit keep costs predictable and prevent abuse.",
          "Output is validated against a schema, so a malformed response never reaches the user.",
        ],
      },
      { gallery: true },
      {
        h: "Architecture and stack",
        list: [
          "<strong>React Native (Expo)</strong> with TypeScript, one codebase across iOS and Android, 60+ screens.",
          "<strong>Zustand</strong> state management with optimistic updates and automatic rollback on failure.",
          "<strong>Supabase</strong> (cloud Postgres) with per user row level security, edge functions, and auth.",
          "<strong>OpenAI</strong> for the coaching model, behind a server side function with guardrails.",
          "OAuth and one time passcode sign in, subscription billing, and push notifications.",
          "Offline first stores persisted on device, with PDF report export through the native print pipeline.",
        ],
      },
      {
        h: "Building it solo with AI",
        p: "<p>I owned every layer, product, UX, data model, backend, and release, with no designer, developer, or QA. Agentic AI tools let me design, build, and refactor across the whole stack at the pace of a small team, while I stayed responsible for the architecture, the product calls, and the quality bar.</p>",
      },
      {
        h: "Impact",
        list: [
          "Took a complex, multi feature product from zero to a working, shippable build, solo.",
          "Proved an AI feature can deliver structured, genuinely useful coaching rather than generic chat.",
          "End to end evidence of product ownership and modern full stack delivery.",
        ],
      },
    ],
    metrics: [
      { value: "React Native", label: "iOS / Android codebase" },
      { value: "LLM-powered", label: "AI exposure coach" },
      { value: "Solo", label: "Designed, built & shipped" },
    ],
    tools: ["React Native", "TypeScript", "Supabase / Postgres", "OpenAI", "Edge Functions", "OAuth / OTP", "Subscriptions", "Claude Code"],
    documents: [
      { name: "Product spec & data model (24 tables)", type: "Spec" },
      { name: "AI prompt design & guardrails", type: "AI" },
      { name: "Release, crash reporting & CI setup", type: "Ops" },
    ],
    galleries: [
      {
        label: "App Screens",
        images: [
          { src: "assets/images/projects/unstuck/02-evaluation.png", caption: "AI exposure evaluation: personalised, structured feedback" },
          { src: "assets/images/projects/unstuck/04-home.png", caption: "Home" },
          { src: "assets/images/projects/unstuck/01-exposure-log.png", caption: "Log an exposure" },
          { src: "assets/images/projects/unstuck/03-sos.png", caption: "SOS for panic moments" },
          { src: "assets/images/projects/unstuck/05-audio.png", caption: "Guided audio" },
          { src: "assets/images/projects/unstuck/06-journal-trend.png", caption: "Journal and mood trends" },
          { src: "assets/images/projects/unstuck/07-habits.png", caption: "Habit tracking" },
          { src: "assets/images/projects/unstuck/08-medications.png", caption: "Medication tracking" },
        ],
      },
    ],
  },

  {
    slug: "omq-autoparts",
    title: "OMQ Auto Parts",
    domain: "eCommerce · Full Stack",
    role: "Product Owner & Solo Builder",
    status: "Built solo with AI",
    theme: "#e8743b",
    cover: "assets/images/projects/omq-logo.png",
    coverBg: "#000000",
    detailCover: "assets/images/projects/omq-autoparts/01-storefront.png",
    detailCoverBg: "#10151c",
    tagline:
      "A full stack eCommerce platform for automotive parts, with vehicle fit search, dual payment gateways, and a complete admin back office, built end to end solo.",
    sections: [
      {
        h: "Overview",
        p: "<p>OMQ Auto Parts is a production grade eCommerce platform for automotive parts, built around a <strong>vehicle fitment finder</strong> across roughly 5,000 products. Customers find the exact part for their make, model, and year, then check out with cards or PayPal, while the business runs everything from a full admin back office wired to live inventory and fulfilment.</p><p>I designed and built it from scratch on my own, a Laravel and MySQL backend, a server rendered storefront, and a dozen integrations, using AI assisted development.</p>",
      },
      {
        h: "The problem",
        list: [
          "Buying the right car part means matching exact vehicle fitment, which is very easy to get wrong.",
          "Off the shelf store builders bloat with plugins and model vehicle compatibility poorly.",
          "The business needed real inventory, payments, and fulfilment, not a throwaway prototype.",
        ],
      },
      {
        h: "The vehicle fitment engine",
        p: "<p>Fitment is the hard part of an auto parts store, and the core of this build. A three level taxonomy, make to model to year, drives a guided finder, and every product is matched to the vehicles it fits.</p>",
        list: [
          "<strong>Year range matching</strong>: human ranges like 2007 to 2015 are normalised to a canonical form and expanded into a flat lookup table, so a single year resolves instantly.",
          "<strong>Compatibility records</strong>: a many to many table links products to vehicles, keeping the verbose engine and body descriptor from the source data.",
          "<strong>Guided finder</strong>: select make, then model, then year, to reach a filtered listing of parts that actually fit.",
          "Derived fields and database observers keep the lookup tables correct on every import and edit.",
        ],
      },
      {
        h: "Storefront and checkout",
        p: "<p>The storefront is server rendered for speed and SEO, with conditional rendering rules so a product never shows an empty field or a stray label.</p>",
        list: [
          "Listing pages with fitting side and per category product type filters, plus a reworked mobile filter.",
          "Product pages that show fitment, specs, and stock, with a back in stock email subscription.",
          "<strong>Dual checkout</strong>: Stripe for cards and PayPal, both secured by webhook idempotency keys.",
          "Email one time passcode sign in, saved addresses, and an order lifecycle from pending to delivered.",
          "Order line items are snapshotted at purchase, so past orders stay correct even as products change.",
        ],
      },
      { gallery: true },
      {
        h: "Admin back office",
        list: [
          "Product management with a 28 column CSV importer and HTML sanitisation.",
          "Chunked bulk image uploader for large catalogues.",
          "Orders, shipments, and reviews moderation with approve, reject, and reply.",
          "SEO content blocks resolved by most specific match, with template fallbacks.",
          "Settings driven configuration: filters, payment toggles, and analytics, editable without code.",
        ],
      },
      {
        h: "Integrations and operations",
        list: [
          "<strong>Veeqo</strong> for inventory and fulfilment: orders push on payment, stock pulls every 15 minutes, with nightly reconciliation.",
          "<strong>Brevo</strong> for transactional email, fully domain authenticated with DKIM and DMARC.",
          "<strong>Trustpilot</strong> reviews, including a signed JWT single sign on bridge.",
          "GA4 with Consent Mode v2, so analytics only fire after cookie consent.",
          "Cloudflare CDN and WAF, with nightly database and storage backups to Backblaze.",
          "Deployed across staging and production on a VPS, with queues, automated tests, and continuous deployment.",
        ],
      },
      {
        h: "Building it solo with AI",
        p: "<p>I delivered the whole platform across seven build phases with no team, owning the domain model, the integrations, and every deploy. Agentic AI let me build a 40+ table Laravel application and its integrations solo, while I stayed responsible for the architecture and the production quality bar.</p>",
      },
      {
        h: "Impact",
        list: [
          "Delivered a real, production ready store, not a prototype, solo.",
          "Modelled complex vehicle fitment and live inventory cleanly, without plugin bloat.",
          "Full stack evidence of payments, integration depth, and end to end ownership.",
        ],
      },
    ],
    metrics: [
      { value: "~5,000", label: "Products / SKUs" },
      { value: "Full stack", label: "Storefront + admin panel" },
      { value: "Solo", label: "Designed, built & shipped" },
    ],
    tools: ["Laravel / PHP", "MySQL", "Stripe", "PayPal", "Vehicle Fitment", "CSV Import", "CI / CD", "Claude Code"],
    documents: [
      { name: "Domain & data model (42 tables)", type: "Spec" },
      { name: "Payments & webhook integration", type: "Integration" },
      { name: "Deployment & backup runbook", type: "Ops" },
    ],
    galleries: [
      {
        label: "Storefront & Admin",
        wide: true,
        images: [
          { src: "assets/images/projects/omq-autoparts/01-storefront.png", caption: "Storefront with vehicle parts finder" },
          { src: "assets/images/projects/omq-autoparts/02-vehicle-picker.png", caption: "Vehicle fitment picker" },
          { src: "assets/images/projects/omq-autoparts/03-product-list.png", caption: "Product listing with filters" },
          { src: "assets/images/projects/omq-autoparts/04-product-detail.png", caption: "Product detail with fitment" },
          { src: "assets/images/projects/omq-autoparts/05-cart.png", caption: "Cart" },
          { src: "assets/images/projects/omq-autoparts/06-checkout.png", caption: "Checkout with Stripe and PayPal" },
          { src: "assets/images/projects/omq-autoparts/07-account.png", caption: "Customer account" },
          { src: "assets/images/projects/omq-autoparts/08-reviews.png", caption: "Reviews" },
        ],
      },
    ],
  },

  {
    slug: "haul-pro",
    title: "Haul Pro",
    domain: "Auto Compliance",
    role: "Business Analyst",
    status: "Delivered",
    theme: "#3b82f6",
    cover: "assets/images/projects/haul-pro.jpg",
    coverBg: "#1f262f",
    tagline:
      "A multi-tenant digital compliance platform that retires paper-based vehicle and driver checks for transport fleets.",
    summary:
      "HaulPro replaces paper-based vehicle and driver compliance for transport and logistics companies. It pairs a web portal for Super Admins and Managers with a mobile-first app for Drivers: daily checklists, document uploads, notes, and appointments on one side; fleet, user, and compliance oversight on the other.",
    problem: [
      "Compliance was paper-based, slow, error-prone, and hard to audit.",
      "No central place to monitor fleets, users, and compliance data.",
      "Drivers needed to capture checks in the field, often offline.",
    ],
    highlights: [
      "Multi-tenant architecture with strict data isolation per client.",
      "Role-based access across Super Admin, Manager, and Driver portals.",
      "Mobile-first driver experience with offline-friendly checklist capture.",
      "Digitised daily vehicle inspections with time and location tracking.",
      "Centralised document management with structured folders and audit history.",
      "Appointment and planner module with reminders for inspections and renewals.",
    ],
    responsibilities: [
      "Led requirement elicitation with transport operators and internal stakeholders.",
      "Authored the Vision & Requirements Document (VRD) and detailed FRD.",
      "Defined system scope, user roles, permissions, and a phased delivery plan.",
      "Converted business needs into traceable functional requirements with unique IDs.",
      "Designed end-to-end flows for Super Admin, Manager, and Driver journeys.",
    ],
    impact: [
      "Replaced manual, paper-based compliance with centralised digital workflows.",
      "Improved auditability via document history and role-based authorisation.",
      "Aligned compliance and usability with real-world transport operations.",
    ],
    metrics: [
      { value: "3", label: "User roles" },
      { value: "Multi-tenant", label: "Architecture" },
      { value: "Offline-first", label: "Driver app" },
    ],
    tools: ["Requirement Elicitation", "VRD", "FRD", "User Flows", "RBAC", "Agile / Scrum"],
    documents: [
      { name: "Business Requirements Document (BRD)", type: "BRD", file: "assets/docs/haul-pro/haul-pro-brd.pdf" },
      { name: "Functional Requirements Document (FRD)", type: "FRD", file: "assets/docs/haul-pro/haul-pro-frd.pdf" },
      { name: "Vision & Requirements Document (VRD)", type: "VRD", file: "assets/docs/haul-pro/haul-pro-vrd.pdf" },
    ],
    galleries: [
      {
        label: "Wireframes",
        images: [
          { src: "assets/images/projects/haul-pro/01-homepage.jpeg", caption: "Home / dashboard" },
          { src: "assets/images/projects/haul-pro/02-checklist.jpeg", caption: "Daily vehicle checklist" },
          { src: "assets/images/projects/haul-pro/03-folder.jpeg", caption: "Document folders" },
          { src: "assets/images/projects/haul-pro/04-new-folders.jpeg", caption: "Create new folder" },
          { src: "assets/images/projects/haul-pro/05-notes.jpeg", caption: "Notes" },
          { src: "assets/images/projects/haul-pro/06-reports.jpeg", caption: "Compliance reports" },
          { src: "assets/images/projects/haul-pro/07-appointment.jpeg", caption: "Appointments" },
          { src: "assets/images/projects/haul-pro/08-planner.jpeg", caption: "Planner" },
          { src: "assets/images/projects/haul-pro/09-account.jpeg", caption: "Account" },
        ],
      },
    ],
  },

  {
    slug: "sprk-music",
    title: "SPRK Music",
    domain: "Social Media · Mobile",
    role: "Product Owner",
    status: "Shipped MVP",
    theme: "#a855f7",
    cover: "assets/images/projects/sprk-music.jpg",
    coverBg: "#ffffff",
    tagline:
      "A short-form, music-focused social video platform for independent artists and the fans who discover them.",
    summary:
      "SPRK Music is a music-first social video app with distinct Artist and Fan experiences: onboarding, secure auth, video creation and playback, social engagement, discovery, and profile management across iOS and Android. I owned it end to end as Product Owner.",
    problem: [
      "Independent artists lacked a music-first platform to share original performances.",
      "Fans had no focused way to discover new talent by genre and specialty.",
      "Onboarding friction was costing early users.",
    ],
    highlights: [
      "Role-based platform with distinct Artist and Fan experiences.",
      "Secure signup/login including social login and passwordless access.",
      "Personalized and trending music-focused home feed.",
      "Rich social interactions: likes, comments, replies, favorites, sharing, DMs.",
      "Advanced search and discovery with genre, specialty, and role filters.",
      "Photo/video upload workflows with validation and size limits.",
    ],
    responsibilities: [
      "Owned the product vision and roadmap aligned to business and user needs.",
      "Translated requirements into epics, user stories, and acceptance criteria.",
      "Prioritized and maintained the backlog to maximize user value.",
      "Led sprint reviews, validated functionality, and approved releases.",
      "Primary liaison between stakeholders and the development team.",
    ],
    impact: [
      "Delivered a production-ready MVP that set a clear product-market direction.",
      "Reduced onboarding friction with flexible authentication options.",
      "Improved discovery and engagement via structured search and personalized feeds.",
      "Increased retention with favorites and watch history.",
    ],
    metrics: [
      { value: "2", label: "Role-based UX" },
      { value: "iOS + Android", label: "Native apps" },
      { value: "MVP", label: "Shipped to market" },
    ],
    tools: ["Product Ownership", "Roadmap", "User Stories", "Acceptance Criteria", "Azure DevOps", "Agile"],
    documents: [
      { name: "Product Vision Document", type: "Vision", file: "assets/docs/sprk-music/sprk-music-vision.pdf" },
    ],
    galleries: [
      {
        label: "Wireframes",
        images: [
          { src: "assets/images/projects/sprk-music/01.png", caption: "Onboarding" },
          { src: "assets/images/projects/sprk-music/02.png", caption: "Sign up" },
          { src: "assets/images/projects/sprk-music/03.png", caption: "Login" },
          { src: "assets/images/projects/sprk-music/04.png", caption: "Auth" },
          { src: "assets/images/projects/sprk-music/05.png", caption: "Home feed" },
          { src: "assets/images/projects/sprk-music/06.png", caption: "Discovery" },
          { src: "assets/images/projects/sprk-music/07.png", caption: "Profile" },
          { src: "assets/images/projects/sprk-music/08.png", caption: "Search" },
          { src: "assets/images/projects/sprk-music/09.png", caption: "Social" },
          { src: "assets/images/projects/sprk-music/10.png", caption: "Upload" },
          { src: "assets/images/projects/sprk-music/11.png", caption: "Player" },
          { src: "assets/images/projects/sprk-music/12.png", caption: "Messaging" },
          { src: "assets/images/projects/sprk-music/13.png", caption: "Settings" },
        ],
      },
    ],
  },

  {
    slug: "fleetfix",
    title: "FleetFix",
    domain: "On-Demand Services",
    role: "Business Analyst",
    status: "Delivered",
    theme: "#f59e0b",
    cover: "assets/images/projects/fleetfix.jpg",
    coverBg: "#ffffff",
    tagline:
      "A mobile-first, multi-vertical on-demand platform unifying roadside assistance, car rentals, and delivery.",
    summary:
      "FleetFix centralizes booking, tracking, and management of roadside assistance, car rentals, and delivery services through API-driven integrations, replacing fragmented, manual workflows with one real-time interface.",
    problem: [
      "Service booking and tracking were fragmented across multiple platforms.",
      "No single place to compare rates and book multiple service types.",
      "Manual coordination caused errors and delays.",
    ],
    highlights: [
      "Centralised rate comparison and multi-service booking in one interface.",
      "Real-time tracking, status updates, and operational visibility.",
      "Automated workflows that reduce manual coordination and errors.",
      "Designed for scalable expansion across towing, rentals, and delivery.",
    ],
    responsibilities: [
      "Led end-to-end business analysis and requirements gathering.",
      "Authored BRD, FRD, user stories, and acceptance criteria.",
      "Defined logistics workflows and API integration specifications.",
      "Liaison between stakeholders, design, and development teams.",
      "Managed sprints in Jira and supported UX design in Figma.",
    ],
    impact: [
      "Accelerated service delivery through streamlined workflows.",
      "Reduced manual workload for operations and service providers.",
      "Improved coordination between business, technology, and logistics partners.",
    ],
    metrics: [
      { value: "3", label: "Service verticals" },
      { value: "API-driven", label: "Integrations" },
      { value: "Real-time", label: "Tracking" },
    ],
    tools: ["BRD", "FRD", "User Stories", "API Specs", "BPMN", "Figma", "Jira"],
    documents: [
      { name: "Business Requirements Document (BRD)", type: "BRD", file: "assets/docs/fleetfix/fleetfix-brd.pdf" },
      { name: "FRD: Customer", type: "FRD", file: "assets/docs/fleetfix/fleetfix-frd-customer.pdf" },
      { name: "FRD: Fixer (service provider)", type: "FRD", file: "assets/docs/fleetfix/fleetfix-frd-fixer.pdf" },
    ],
    galleries: [],
  },

  {
    slug: "mgc-freight",
    title: "MGC Freight",
    domain: "Freight & Logistics",
    role: "Business Analyst / Product Owner",
    status: "Delivered",
    theme: "#06b6d4",
    cover: "assets/images/projects/mgc-freight.jpg",
    coverBg: "#ffffff",
    tagline:
      "A web-based freight booking platform unifying multi-carrier shipping (FedEx, UPS, USPS) through APIs.",
    summary:
      "MGC Freight lets businesses book, track, and manage shipments across multiple carriers through API-driven integrations, eliminating manual logistics workflows and giving real-time visibility across FedEx, UPS, and USPS.",
    problem: [
      "Shipping was manual and fragmented across multiple carriers.",
      "No centralized rate comparison or carrier selection.",
      "Limited real-time visibility into shipments and claims.",
    ],
    highlights: [
      "Eliminated manual shipping processes across multiple carriers.",
      "Centralized rate comparison and carrier selection.",
      "Real-time shipment tracking and delivery visibility.",
      "Unified fragmented logistics workflows into a single platform.",
      "Tighter integration between internal systems and carrier APIs.",
    ],
    responsibilities: [
      "Led cross-functional requirements gathering.",
      "Created BRD, FRD, and user stories; mapped booking journeys.",
      "Defined carrier API integration specs and data mapping.",
      "Managed sprints in ClickUp and Jira.",
      "Ran UAT and client demos; facilitated stakeholder alignment.",
    ],
    impact: [
      "Enabled real-time shipping rate comparison across carriers.",
      "Centralized multi-carrier booking into a single interface.",
      "Automated tracking and claims; reduced manual workload for logistics teams.",
    ],
    metrics: [
      { value: "3+", label: "Carriers (FedEx/UPS/USPS)" },
      { value: "API-driven", label: "Integrations" },
      { value: "Real-time", label: "Visibility" },
    ],
    tools: ["BRD", "FRD", "User Stories", "BPMN", "API Mapping", "Jira", "ClickUp"],
    documents: [
      { name: "Business Requirements Document (BRD)", type: "BRD", file: "assets/docs/mgc-freight/mgc-freight-brd.pdf" },
      { name: "FRD: User", type: "FRD", file: "assets/docs/mgc-freight/mgc-freight-frd-user.pdf" },
      { name: "FRD: Admin", type: "FRD", file: "assets/docs/mgc-freight/mgc-freight-frd-admin.pdf" },
      { name: "User Stories & Acceptance Criteria", type: "Stories", file: "assets/docs/mgc-freight/mgc-freight-user-stories.pdf" },
    ],
    galleries: [],
  },

  {
    slug: "accomplish-health",
    title: "Accomplish Health",
    domain: "Healthcare · HIPAA",
    role: "Business Analyst / Product Owner",
    status: "Delivered",
    theme: "#10b981",
    cover: "assets/images/projects/accomplish-health.jpg",
    coverBg: "#ffffff",
    tagline:
      "An enterprise appointment-booking and admin platform for healthcare providers and patients.",
    summary:
      "Accomplish Health integrates insurance verification and payments into a single HIPAA-compliant, audit-ready booking journey, with role-based dashboards for admins, clinicians, and operations teams.",
    problem: [
      "Legacy scheduling was fragmented with manual data entry across systems.",
      "No integrated flow for booking, insurance verification, and payments.",
      "Paper intake forms caused inefficiencies and data errors.",
    ],
    highlights: [
      "End-to-end patient onboarding flow that cut manual booking time by 60%.",
      "Insurance verification and payment collection in one streamlined journey.",
      "Role-based dashboards for admins, clinicians, and operations teams.",
      "Accessible, mobile-responsive UI structures.",
      "HIPAA-compliant, audit-ready workflows.",
    ],
    responsibilities: [
      "Led stakeholder interviews (executive, admin, provider) to define MVP direction.",
      "Ran competitive analysis of booking and health-tech SaaS platforms.",
      "Defined functional and non-functional requirements for patient and admin interfaces.",
      "Designed booking flows covering demographics, insurance, payments, and consent.",
      "Defined integration logic for Orbit (insurance) and Stripe (payments).",
    ],
    impact: [
      "Cut manual booking time by 60% with a streamlined onboarding flow.",
      "Reduced dependency on email and manual scheduling through automation.",
      "Improved oversight via role-based dashboards and KPI analytics.",
    ],
    metrics: [
      { value: "−60%", label: "Manual booking time" },
      { value: "HIPAA", label: "Compliant" },
      { value: "Orbit + Stripe", label: "Integrations" },
    ],
    tools: ["BRD", "FRD", "Use Cases", "Workflow Mapping", "Jira", "Confluence"],
    documents: [
      { name: "Business Requirements Document (BRD)", type: "BRD", file: "assets/docs/accomplish-health/accomplish-health-brd.pdf" },
      { name: "FRD: Patient Module", type: "FRD", file: "assets/docs/accomplish-health/accomplish-health-frd-patient.pdf" },
      { name: "FRD: Admin Module", type: "FRD", file: "assets/docs/accomplish-health/accomplish-health-frd-admin.pdf" },
    ],
    galleries: [],
  },

  {
    slug: "oohup",
    title: "OOHUP Platform",
    domain: "AdTech · MediaTech",
    role: "Business Analyst / Product Owner",
    status: "Concept → MVP",
    theme: "#f43f5e",
    cover: "assets/images/projects/oohup.jpg",
    coverBg: "#ffffff",
    tagline:
      "A marketplace that digitizes Out-of-Home advertising: browse, book, and manage ad inventory.",
    summary:
      "OOHUP connects advertisers and media owners through a centralized system for browsing, booking, and managing Out-of-Home ad inventory, with interactive map-based browsing, real-time availability, and automated scheduling. I took it from raw concept to scoped MVP.",
    problem: [
      "OOH advertising was manual, fragmented, and lacked digital infrastructure.",
      "No central place to view, compare, or book OOH media spaces.",
      "Media owner onboarding was slow and unstructured.",
    ],
    highlights: [
      "Interactive map-based inventory browsing with real-time availability.",
      "Automated scheduling and campaign planning.",
      "Media owner onboarding and management portal.",
      "Transparency, efficiency, and scalability for OOH operations.",
    ],
    responsibilities: [
      "Served as Business Analyst and Product Owner from concept to MVP.",
      "Ran market and competitor research to define the value proposition.",
      "Created BRD and FRD; authored user stories across all modules.",
      "Defined inventory management, campaign creation, booking flow, and media owner portal.",
      "Managed stakeholder alignment and sprints in Jira and MS Teams.",
    ],
    impact: [
      "Converted a raw concept into a validated, MVP-ready product.",
      "Digitized and simplified OOH advertising operations.",
      "Aligned product strategy with business goals for on-time delivery.",
    ],
    metrics: [
      { value: "3", label: "Modules (Advertiser/Owner/Admin)" },
      { value: "Map-based", label: "Inventory UX" },
      { value: "Concept→MVP", label: "Ownership" },
    ],
    tools: ["BRD", "FRD", "User Stories", "Market Research", "Workflow Mapping", "Jira"],
    documents: [
      { name: "Business Requirements Document (BRD)", type: "BRD", file: "assets/docs/oohup/oohup-brd.pdf" },
      { name: "FRD: Advertiser Module", type: "FRD", file: "assets/docs/oohup/oohup-frd-advertiser.pdf" },
      { name: "FRD: Media Owner Module", type: "FRD", file: "assets/docs/oohup/oohup-frd-media-owner.pdf" },
      { name: "FRD: Admin Module", type: "FRD", file: "assets/docs/oohup/oohup-frd-admin.pdf" },
    ],
    galleries: [],
  },
];
