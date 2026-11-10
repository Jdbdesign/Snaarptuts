import os
import re

# Collect all selectors from scenes/snaarp-me
selectors_in_scripts = set()
for root, _, files in os.walk("scenes/snaarp-me"):
    for file in files:
        if file.endswith("script.ts"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                matches = re.findall(r'\[data-tl=([^\]]+)\]', content)
                for m in matches:
                    selectors_in_scripts.add(m)

print(f"Found {len(selectors_in_scripts)} data-tl selectors queried in snaarp-me scripts:")
for s in sorted(selectors_in_scripts):
    print(f"  - {s}")

# Collect all data-tl attributes defined in components/me/
selectors_in_components = set()
for root, _, files in os.walk("components/me"):
    for file in files:
        if file.endswith(".tsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                matches = re.findall(r'data-tl=(?:\{`([^`]+)`\}|[\'"]([^\'"]+)[\'"])', content)
                for m in matches:
                    val = m[0] or m[1]
                    selectors_in_components.add(val)
                # also find tlKey definitions in nav
                tl_keys = re.findall(r'tlKey:\s*[\'"]([^\'"]+)[\'"]', content)
                for k in tl_keys:
                    selectors_in_components.add(k)

print(f"\nFound {len(selectors_in_components)} data-tl selectors defined in components/me:")

missing = []
for s in selectors_in_scripts:
    if s in selectors_in_components:
        continue
    # Check dynamic expressions like me-card-creative-meeting vs me-card-${et.id}
    matched_dynamic = False
    for c in selectors_in_components:
        # e.g. me-card-${et.id} matches me-card-creative-meeting
        prefix = c.split("${")[0]
        if prefix and s.startswith(prefix):
            matched_dynamic = True
            break
    if not matched_dynamic:
        missing.append(s)

if missing:
    print(f"\nWARNING: {len(missing)} selectors queried but not found in components:")
    for m in missing:
        print(f"  MISSING: {m}")
    exit(1)
else:
    print("\nALL SELECTORS MATCH! 100% selector parity between scripts and components.")
