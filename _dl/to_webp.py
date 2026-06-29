"""One-shot: convert all *served* project images to WebP for fast loading.

Screenshots were stored as full-size PNG (some 1320x2868 @ 1.7MB). They render in
~300px grid thumbs + a ~1300px lightbox, so we resize (cap longest side) and
re-encode as WebP (q80) — typically 70-85% smaller than optimized PNG. Originals
are deleted; references in manifest.json + projects-data.js are rewritten to .webp.
Also removes the unreferenced root master PNGs. Run gen_galleries.py afterwards.

Idempotent-ish: re-running only touches any remaining png/jpg under projects/.
"""
import os, glob, re, json
from PIL import Image

GALLERY_MAX = 1600   # screenshots / covers — lightbox tops out ~1300px
LOGO_MAX = 900       # brand logos on cards
Q = 80
PROJ = "assets/images/projects"

# Served root-level covers/logos (everything else at projects/ root is a dead master)
ROOT_SERVED = {
    f"{PROJ}/omq-logo.png": LOGO_MAX,
    f"{PROJ}/unstuck-logo.png": LOGO_MAX,
    f"{PROJ}/haul-pro.jpg": GALLERY_MAX,
    f"{PROJ}/sprk-music.jpg": GALLERY_MAX,
    f"{PROJ}/fleetfix.jpg": GALLERY_MAX,
    f"{PROJ}/mgc-freight.jpg": GALLERY_MAX,
    f"{PROJ}/accomplish-health.jpg": GALLERY_MAX,
    f"{PROJ}/oohup.jpg": GALLERY_MAX,
}
MASTERS = ["Sprk.png", "mgc.png", "fleetfix.png", "OOHUP.png",
           "Haul Pro.png", "Accomplish Health.png"]


def collect_gallery_images():
    out = set()
    for ext in ("png", "jpg", "jpeg"):
        out |= set(glob.glob(f"{PROJ}/*/**/*.{ext}", recursive=True))  # depth >= 1 (slug subfolders)
    return {os.path.normpath(p).replace("\\", "/") for p in out}


def convert(path, cap):
    im = Image.open(path)
    w, h = im.size
    if im.mode == "P":
        im = im.convert("RGBA" if "transparency" in im.info else "RGB")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if ("A" in im.mode) else "RGB")
    scale = cap / max(w, h)
    if scale < 1:
        im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    out_path = os.path.splitext(path)[0] + ".webp"
    im.save(out_path, "WEBP", quality=Q, method=6)
    return out_path, (w, h), im.size


def main():
    targets = {p: GALLERY_MAX for p in collect_gallery_images()}
    for p, cap in ROOT_SERVED.items():
        if os.path.exists(p):
            targets[p] = cap

    before = after = 0
    converted = 0
    for path in sorted(targets):
        if path.lower().endswith(".webp"):
            continue
        b = os.path.getsize(path)
        out_path, osize, nsize = convert(path, targets[path])
        a = os.path.getsize(out_path)
        before += b
        after += a
        converted += 1
        if out_path != path:
            os.remove(path)
        print(f"{b//1024:>5}KB -> {a//1024:>4}KB  {osize[0]}x{osize[1]} -> {nsize[0]}x{nsize[1]}  {os.path.basename(out_path)}")

    # Rewrite manifest.json file extensions -> .webp
    for man in glob.glob(f"{PROJ}/*/manifest.json"):
        groups = json.load(open(man, encoding="utf-8"))
        for g in groups:
            g["files"] = [re.sub(r"\.(png|jpe?g)$", ".webp", f, flags=re.I) for f in g["files"]]
        with open(man, "w", encoding="utf-8") as fh:
            json.dump(groups, fh, indent=2)
            fh.write("\n")

    # Rewrite projects-data.js image paths -> .webp
    pd = "js/projects-data.js"
    src = open(pd, encoding="utf-8").read()
    src2 = re.sub(r"(assets/images/projects/[^\"'\s]+?)\.(png|jpe?g)", r"\1.webp", src, flags=re.I)
    if src2 != src:
        open(pd, "w", encoding="utf-8").write(src2)

    # Remove unreferenced root master PNGs
    removed = 0
    for m in MASTERS:
        mp = f"{PROJ}/{m}"
        if os.path.exists(mp):
            removed += os.path.getsize(mp)
            os.remove(mp)

    print(f"\nConverted {converted} image(s): {before/1024/1024:.1f}MB -> {after/1024/1024:.1f}MB "
          f"({100*(before-after)/before:.0f}% smaller)")
    print(f"Removed {len(MASTERS)} dead master PNG(s): {removed/1024/1024:.1f}MB")


if __name__ == "__main__":
    main()
