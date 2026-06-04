# Portfolio Website — Agent Handoff / Context

> Single source of truth for anyone (human or AI agent) taking over this project.
> Last updated: 2026-06-04.

---

## 1. What this is
A personal **portfolio website for Omar Mohammed**, a Senior IT Business Analyst &
Product Owner. It showcases six end-to-end product case studies (drawn from his Notion
workspace) plus bio/experience/skills from his CV.

- **Location:** `C:\Users\omar_\Desktop\Portfolio Website - Omar`
- **Status:** Working, reviewed by the user, who said "this looks really good."
- **Stack chosen by user:** Static HTML/CSS/JS. **No build step, no dependencies.**
  Open `index.html` directly, or serve with `python -m http.server 8000`.
- **Reference site the design imitates:** https://santifer.io/

---

## 2. About the user (Omar)
- Senior IT Business Analyst & Product Owner, 9+ years (UK, India, Canada).
- Based in **Edmonton, Canada** (Permanent Resident); job-seeking BA/PO roles across Canada.
- CV: `C:\Users\omar_\Desktop\cv_alberta.pdf` (copied into the site as the résumé).
- **Contact used on the site:** email `omar.mo2403@gmail.com`, phone `+1 587 884 1011`,
  LinkedIn `linkedin.com/in/omar-mohammed-tech`.
- ⚠️ **Unresolved:** the CV email (`omar.mo2403@gmail.com`) differs from his Google
  account (`omar.mohd2403@gmail.com`). Ask which is correct; it appears in
  `index.html` (hero + contact) and `js/project.js` (the "Request documents" mailto).

---

## 3. Design system (verified from santifer.io's actual source)
The **first build was rejected** ("terrible") — it used emerald + a sparse layout.
The current/correct system, derived from the reference's compiled CSS:

- **Theme:** dark **charcoal** background `hsl(240 6% 9%)`, light text.
- **Accent:** warm **orange** `--primary: #e8743b`; secondary gold `#e0b15a`,
  success green `#4ade80`, blue `#7aa2f7`.
- **Signature texture:** radial **dot-grid** on the body
  (`radial-gradient(circle, var(--dot) 1px, transparent 1px)`, 24px).
- **Hero:** glowing animated gradient **orbs**, avatar with gradient ring + badge.
- **Fonts:** `Space Grotesk` (display), `Inter` (body), `JetBrains Mono` (mono/labels) — Google Fonts.
- **Layout:** dense, **card-heavy**. Status badges, metric stats, tool pills, "Read the case study →".
- All color/spacing tokens are CSS variables in `:root` at the top of `css/styles.css`
  (change `--primary` to re-skin).

---

## 4. File structure
```
index.html                 Homepage: hero, about, work(cards), experience, skills, education, contact
project.html               Case-study template; reads ?p=<slug> and renders from data
css/styles.css             ALL styling + design tokens (:root at top)
js/
  projects-data.js         TEXT content per project (window.PROJECTS) — EDIT HERE
  galleries.js             AUTO-GENERATED image galleries (window.GALLERIES) — do NOT hand-edit
  main.js                  Homepage: renders cards, nav state, mobile menu, reveal
  project.js               Case-study: renders detail + image lightbox
assets/
  Omar_Mohammed_Resume.pdf The CV, linked from "Résumé" buttons
  favicon.svg, images/avatar.jpg   (real headshot — used in header brand + hero)
  images/projects/<slug>/  Real wireframes/mockups/diagrams + manifest.json per project
  images/projects/<slug>.jpg  Brand-logo card covers (user-supplied, optimized ~1000px). projects-data.js sets a matching `coverBg` per project; rendered object-fit:contain on that bg
  docs/<slug>/             Case-study PDFs (BRD/FRD/VRD/Vision). A document in projects-data.js with a `file` path renders as a direct download link in project.html (works over file:// and HTTP); a document with no `file` shows as a plain label. All 18 docs are hosted
_dl/                       Helper scripts (NOT part of the shipped site)
  gen_galleries.py         Reads all manifests -> regenerates js/galleries.js
  gen_logos.py             (obsolete) made the old SVG wordmark covers — covers are now real logo .jpg files
  grab_from_file.py        Parses a saved notion-fetch result file -> downloads its images
  dedupe.py                Removes byte-identical duplicate images, rewrites manifests
  optimize_images.py       Downscales project images to <=2000px + recompresses (web perf). Re-run after adding images
README.md                  User-facing run/edit/host instructions
HANDOFF.md                 This file
```

---

## 5. Data architecture (important)
Content is split in two so it's easy to maintain:

1. **Text** lives in `js/projects-data.js` as `window.PROJECTS` (array). Each project:
   `slug, title, domain, role, status, theme(hex), cover, tagline, summary, problem[],
   highlights[], responsibilities[], impact[], metrics[], tools[], documents[], galleries[]`.
   (`galleries` here is a fallback; real galleries come from #2.)
2. **Images** live in `assets/images/projects/<slug>/manifest.json` — a list of
   `{label, files[], captions?[]}` groups. `python _dl/gen_galleries.py` reads every
   manifest and writes `js/galleries.js` (`window.GALLERIES[slug]`).
   `project.js` and `main.js` prefer `window.GALLERIES[slug]`, falling back to `PROJECTS[].galleries`.

**To add/replace images:** drop files in `assets/images/projects/<slug>/`, update that
folder's `manifest.json`, then run `python _dl/gen_galleries.py`. Both pages load
`js/galleries.js` via a `<script>` tag (classic script, not a module — works on `file://`).

Scripts are plain `<script src>` globals (no fetch/import) specifically so the site
works when opened directly via `file://` without a server.

---

## 6. The six projects & their Notion sources
Pulled via the Notion MCP (`mcp__notion__notion-fetch`). Parent page
"Business Analysis Projects" = `0e1c0db9-a661-44f5-a504-0acec0384555`.

| Slug | Title | Notion page ID | Real galleries downloaded |
|---|---|---|---|
| haul-pro | Haul Pro | 2e2ae0d9-f6f4-80f2-90d3-dfe6e933a497 | Wireframes (9) |
| sprk-music | SPRK Music | 2e2ae0d9-f6f4-8003-9559-c1ad34f13a27 | Wireframes (13) |
| fleetfix | FleetFix | 2ceae0d9-f6f4-80b8-bd52-c243e60075b8 | Figma (9), Flowcharts (12), BPMN (4), Use Case (3) |
| mgc-freight | MGC Freight | 2cfae0d9-f6f4-80a3-9e84-ca0639662ecf | Flowcharts (3), BPMN (2) |
| accomplish-health | Accomplish Health | 2d0ae0d9-f6f4-80e3-be98-fd55507d4770 | Diagrams (5) |
| oohup | OOHUP Platform | 2d0ae0d9-f6f4-802c-9c29-cc6494270f81 | Diagrams (5) |

**UI-mockup sub-pages NOT yet pulled** (MGC/Accomplish/OOHUP showed only diagrams on
their main pages; their actual UI screens are in these child pages):
- MGC Freight Mockups: `2d0ae0d9-f6f4-807a-8f1e-f466da1e714e`
- Accomplish Health - Wireframes: `2d1ae0d9-f6f4-80ac-b04f-c227a9fc4441`
- OOHUP - Wireframes: `2d0ae0d9-f6f4-80f3-80f0-e7dc29f8f9f9`

---

## 7. How images were downloaded (and the gotcha)
Notion images are served from S3 with **signed URLs that expire after 1 hour**. Process:
1. `notion-fetch` a project page → get fresh signed image URLs.
2. Download immediately. The URLs share one auth token per fetch; only the per-image
   uuid + signature differ — so a compact script can grab them all.
3. Large fetches auto-save to a tool-result file; `_dl/grab_from_file.py` parses that
   file, groups images by section header, downloads, and writes `manifest.json` — keeping
   the giant URLs out of the agent's context.

**To pull more images later** you must RE-FETCH the Notion page first (old URLs are dead),
then download with fresh credentials. The `_dl/*.py` per-project scripts were deleted
after use because their tokens expired; `gen_galleries.py`, `grab_from_file.py`,
`dedupe.py` remain (reusable).

---

## 8. Done
- ✅ Full redesign matching santifer.io (dark/orange/dot-grid/orbs/dense cards).
- ✅ Homepage with rich project cards.
- ✅ Six case-study pages (`project.html?p=<slug>`) with overview/problem/role/impact,
  documentation panel, tools, prev-next nav, and **image galleries + lightbox**.
- ✅ Real Notion assets for all six projects (61 images after dedupe).
- ✅ Résumé download wired to the CV PDF.
- ✅ Fixed: mobile menu was showing full-screen on desktop — caused by author
  `display:flex` overriding the `[hidden]` attribute. Fixed with
  `.mobile-menu[hidden]{display:none}` + a `@media (min-width:901px)` guard in `styles.css`.

## 9. Outstanding / offered next steps
1. **Avatar** is still a placeholder monogram — needs a real headshot at
   `assets/images/avatar.svg` (square ~400×400; can be jpg/png if `index.html` src is updated).
2. **Pull UI mockups** for MGC / Accomplish / OOHUP from their sub-pages (IDs in §6) so all
   six have UI screens, not just diagrams.
3. **Confirm email** (CV vs Google account — §2) and the **LinkedIn handle**.
4. Optional: deploy (Netlify/Vercel/GitHub Pages — no build cmd, publish dir = project root).

---

## 10. Gotchas & conventions
- Site must work via `file://` → keep using global `<script>` includes, no `fetch()`/ES modules.
- Per-page script order matters: `projects-data.js` → `galleries.js` → (`main.js`|`project.js`).
- After any image change, **re-run `python _dl/gen_galleries.py`**.
- Gallery section labels containing "flow/bpmn/diagram/use case" render in a **wide**
  (16:10) grid; everything else renders as **tall** (3:4) phone-style cards (`project.js`).
- `dedupe.py` already removed byte-identical duplicates (Notion had a few repeats).
- Agent memory for this project lives at
  `C:\Users\omar_\.claude\projects\C--Users-omar--Desktop-Portfolio-Website---Omar\memory\`
  (`MEMORY.md` index + `user-omar-role.md` + `project-portfolio-website.md`).
