"""Generate text-only wordmark logo covers for each project (LIGHT theme).

Writes assets/images/projects/<slug>.svg — a 16:9 SVG built purely from
typography (monogram tile + wordmark + domain label) on a light card
background with a faint dot grid, tinted with each project's theme colour.
Mirrors santifer.io's light design system. No bitmaps.
Run from the project root, then point each project's `cover` at its .svg.
"""
import os

OUT = "assets/images/projects"
FONT = "'Space Grotesk','Segoe UI',system-ui,Arial,sans-serif"

# slug, title, monogram, DOMAIN, theme (bright), theme-deep (darker, readable on light)
PROJECTS = [
    ("haul-pro",          "Haul Pro",          "HP",  "Auto Compliance",       "#3b82f6", "#1d4ed8"),
    ("sprk-music",        "SPRK Music",        "SM",  "Social Media · Mobile", "#a855f7", "#7c3aed"),
    ("fleetfix",          "FleetFix",          "FF",  "On-Demand Services",    "#f59e0b", "#b45309"),
    ("mgc-freight",       "MGC Freight",       "MGC", "Freight & Logistics",   "#06b6d4", "#0e7490"),
    ("accomplish-health", "Accomplish Health", "AH",  "Healthcare · HIPAA",    "#10b981", "#047857"),
    ("oohup",             "OOHUP Platform",    "OO",  "AdTech · MediaTech",    "#f43f5e", "#be123c"),
]

W, H = 1200, 675


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def svg(slug, title, mono, domain, theme, theme_deep):
    # wordmark width: scale with length but clamp so it never overflows
    tl = min(880, max(380, len(title) * 64))
    mono_size = 72 if len(mono) <= 2 else 54
    title, mono, domain = esc(title), esc(mono), esc(domain.upper())
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="{title} logo">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#eef1f4"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.28" r="0.8">
      <stop offset="0" stop-color="{theme}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="{theme}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mono" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{theme}"/>
      <stop offset="1" stop-color="{theme_deep}"/>
    </linearGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#1e293b" fill-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#bg)"/>
  <rect width="{W}" height="{H}" fill="url(#dots)"/>
  <rect width="{W}" height="{H}" fill="url(#glow)"/>
  <g>
    <rect x="525" y="150" width="150" height="150" rx="36" fill="url(#mono)"/>
    <text x="600" y="225" font-family="{FONT}" font-size="{mono_size}" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="central">{mono}</text>
  </g>
  <text x="600" y="432" font-family="{FONT}" font-size="100" font-weight="700" fill="#0f1115" text-anchor="middle" textLength="{tl}" lengthAdjust="spacingAndGlyphs">{title}</text>
  <text x="600" y="498" font-family="{FONT}" font-size="27" font-weight="600" fill="{theme_deep}" text-anchor="middle" letter-spacing="5">{domain}</text>
</svg>
"""


for slug, title, mono, domain, theme, theme_deep in PROJECTS:
    path = os.path.join(OUT, f"{slug}.svg")
    open(path, "w", encoding="utf-8").write(svg(slug, title, mono, domain, theme, theme_deep))
    print("wrote", path)
