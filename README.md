# Omar Mohammed — Portfolio

A fast, static portfolio (no build step, no dependencies) — HTML, CSS, vanilla JS.
Dark charcoal theme with a warm-orange accent, dot-grid texture, and per-project
case-study pages with wireframe / mockup / diagram galleries.

## Run it locally
Run the local server (serves `.webp` with the correct MIME type — plain
`python -m http.server` mislabels WebP on Windows and images look broken):

```bash
python _dl/serve.py 8000   # then open http://localhost:8000
```

## Structure
```
index.html                 Homepage (hero, about, work, experience, skills, contact)
project.html               Case-study template — renders ?p=<slug> from the data
css/styles.css             All styling + design tokens (colors at top in :root)
js/
  projects-data.js         TEXT content for each project (edit here)
  galleries.js             AUTO-GENERATED image galleries (do not hand-edit)
  main.js                  Homepage rendering + nav
  project.js               Case-study rendering + image lightbox
assets/
  Omar_Mohammed_Resume.pdf Linked from the "Résumé" buttons
  images/
    avatar.svg             Profile image placeholder (swap for a headshot)
    projects/<slug>/        Real wireframes, mockups & diagrams per project
      manifest.json         Lists/labels the images in each project
_dl/                       Helper scripts (gen_galleries.py, etc.) — not shipped
```

## How it fits together
- `js/projects-data.js` holds each project's **text** (title, role, summary, problem,
  highlights, impact, tools, documents, cover image).
- Each `assets/images/projects/<slug>/manifest.json` lists that project's **images**,
  grouped into labelled sections (e.g. "Wireframes", "Flowcharts", "BPMN Diagrams").
- `python _dl/gen_galleries.py` reads those manifests and regenerates `js/galleries.js`.
  Run it after adding or renaming images.

## Editing
- **Project text** → `js/projects-data.js`.
- **Add / replace project images** → drop files into `assets/images/projects/<slug>/`,
  update that folder's `manifest.json`, then run `python _dl/gen_galleries.py`.
- **Card cover image** → the `cover:` field in `js/projects-data.js`.
- **Profile photo** → replace `assets/images/avatar.svg` (square ~400×400).
- **Colors** → the `:root` variables at the top of `css/styles.css` (`--primary` is the orange).
- **Experience / skills / education** → edit directly in `index.html`.

## ⚠️ Verify before publishing
- **Email**: currently `omar.mo2403@gmail.com` (from your CV). Your Google account is
  `omar.mohd2403@gmail.com` — confirm which is correct (used in `index.html` hero + contact,
  and in `js/project.js`).
- **LinkedIn**: `linkedin.com/in/omar-mohammed-tech` — confirm the handle.
- The **avatar** is still a placeholder (initials). Project galleries use your real Notion assets.

## Image galleries currently included
| Project | Sections |
|---|---|
| Haul Pro | Wireframes (9) |
| SPRK Music | Wireframes (13) |
| FleetFix | Figma Wireframes (9), Flowcharts (12), BPMN (4), Use Case (3) |
| MGC Freight | Flowcharts (3), BPMN (2) |
| Accomplish Health | Diagrams (5) |
| OOHUP | Diagrams (5) |

MGC, Accomplish, and OOHUP also have UI mockup/wireframe sub-pages in Notion that can be
added the same way (drop images in the folder + update manifest + regenerate).

## Hosting (free)
Drag-and-drop the folder to **Netlify** or **Vercel**, or push to **GitHub Pages**.
No build command; publish directory = project root.
