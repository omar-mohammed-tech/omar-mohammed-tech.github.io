"""Downscale + recompress oversized project images for the web.

Notion exports are huge (some 13000px / 50+ megapixels). They're shown in
~300px thumbnails and a lightbox that caps at ~1300px, so decoding them at full
size is what makes scrolling janky. This caps the longest side at MAX px and
re-encodes, keeping the smaller of original/new. Re-run after adding images.
"""
import glob, os
from PIL import Image

MAX = 2000
roots = glob.glob("assets/images/projects/*/*.png") + \
        glob.glob("assets/images/projects/*/*.jpeg") + \
        glob.glob("assets/images/projects/*/*.jpg")

before_total = after_total = 0
changed = 0
for f in sorted(roots):
    before = os.path.getsize(f)
    before_total += before
    im = Image.open(f)
    w, h = im.size
    ext = os.path.splitext(f)[1].lower()
    tmp = f + ".tmp"
    scale = MAX / max(w, h)
    out = im
    if scale < 1:
        out = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    try:
        if ext in (".jpg", ".jpeg"):
            out = out.convert("RGB")
            out.save(tmp, "JPEG", quality=82, optimize=True, progressive=True)
        else:
            out.save(tmp, "PNG", optimize=True)
    except Exception as e:
        print(f"ERR {f}: {e}")
        if os.path.exists(tmp):
            os.remove(tmp)
        after_total += before
        continue
    new = os.path.getsize(tmp)
    if new < before:
        os.replace(tmp, f)
        after_total += new
        changed += 1
        print(f"{before//1024:>5}KB -> {new//1024:>5}KB  {w}x{h} -> {out.size[0]}x{out.size[1]}  {os.path.relpath(f)}")
    else:
        os.remove(tmp)
        after_total += before

print(f"\nOptimized {changed} image(s).")
print(f"Total: {before_total/1024/1024:.1f} MB -> {after_total/1024/1024:.1f} MB "
      f"({100*(before_total-after_total)/before_total:.0f}% smaller)")
