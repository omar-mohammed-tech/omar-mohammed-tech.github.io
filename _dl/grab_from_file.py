"""Parse a saved notion-fetch tool-result file, group images by their section
header, download them locally, and emit a manifest.json. Keeps giant signed
URLs out of the assistant context.

Usage: python _dl/grab_from_file.py <saved_file> <slug>
"""
import re, os, sys, json, urllib.request

saved, slug = sys.argv[1], sys.argv[2]
raw = open(saved, encoding="utf-8").read()
out_dir = f"assets/images/projects/{slug}"
os.makedirs(out_dir, exist_ok=True)

SEC = [
    ("figma", "Figma Wireframes"), ("wireframe", "Wireframes"), ("mockup", "Mockups"),
    ("bpmn", "BPMN Diagrams"), ("use case", "Use Case Diagrams"),
    ("flowchart", "Flowcharts"), ("flowchart", "Flowcharts"),
    ("diagram", "Diagrams"), ("er ", "ER Diagrams"),
]

# Walk segments split on the literal "\n" that Notion markdown uses.
segments = raw.split("\\n")
current = "Diagrams"
order = []        # section label order of first appearance
buckets = {}      # label -> [urls]
img_re = re.compile(r'!\[\]\((https://prod-files[^)]+)\)')

for seg in segments:
    s = seg.strip()
    if s.startswith("##") or s.startswith("# "):
        low = s.lower()
        for key, label in SEC:
            if key in low:
                current = label
                break
    for m in img_re.finditer(seg):
        buckets.setdefault(current, [])
        if current not in order:
            order.append(current)
        buckets[current].append(m.group(1))

def ext_of(url):
    path = url.split("?", 1)[0]
    e = os.path.splitext(path)[1].lower()
    return e if e in (".png", ".jpeg", ".jpg", ".webp") else ".png"

manifest = []
total = 0
for label in order:
    urls = buckets[label]
    files = []
    for n, url in enumerate(urls, 1):
        slabel = re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-")
        name = f"{slabel}-{n:02d}{ext_of(url)}"
        dest = os.path.join(out_dir, name)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            data = urllib.request.urlopen(req, timeout=60).read()
            open(dest, "wb").write(data)
            files.append(name)
            total += 1
            print(f"OK  {label:18} {name:24} {len(data):>8} bytes")
        except Exception as e:
            print(f"ERR {label:18} {name:24} {e}")
    if files:
        manifest.append({"label": label, "files": files})

json.dump(manifest, open(os.path.join(out_dir, "manifest.json"), "w"), indent=2)
print(f"\nSections: {[m['label'] + ' x' + str(len(m['files'])) for m in manifest]}")
print(f"Total downloaded: {total}")
