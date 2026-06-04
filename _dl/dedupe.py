"""Remove duplicate images (identical content) within each project, keeping the
first occurrence, and rewrite that project's manifest.json accordingly."""
import os, json, hashlib

ROOT = "assets/images/projects"
for slug in sorted(os.listdir(ROOT)):
    d = os.path.join(ROOT, slug)
    man = os.path.join(d, "manifest.json")
    if not os.path.isdir(d) or not os.path.exists(man):
        continue
    groups = json.load(open(man, encoding="utf-8"))
    seen = {}
    removed = 0
    for g in groups:
        kept = []
        for f in g["files"]:
            p = os.path.join(d, f)
            if not os.path.exists(p):
                continue
            h = hashlib.md5(open(p, "rb").read()).hexdigest()
            if h in seen:
                os.remove(p)
                removed += 1
            else:
                seen[h] = f
                kept.append(f)
        # trim captions to match kept length if present
        if "captions" in g:
            idx = [g["files"].index(f) for f in kept]
            g["captions"] = [g["captions"][i] if i < len(g["captions"]) else "" for i in idx]
        g["files"] = kept
    groups = [g for g in groups if g["files"]]
    json.dump(groups, open(man, "w"), indent=2)
    if removed:
        print(f"{slug:20} removed {removed} duplicate(s) -> " +
              ", ".join(f"{g['label']}({len(g['files'])})" for g in groups))
print("dedupe complete")
