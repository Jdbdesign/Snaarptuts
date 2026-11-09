import os
import re

# Collect all selectors from scripts
selectors_in_scripts = set()
for root, _, files in os.walk("scenes/lock"):
    for file in files:
        if file.endswith("script.ts"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                # find data-tl queries
                matches = re.findall(r'\[data-tl=([^\]]+)\]', content)
                for m in matches:
                    selectors_in_scripts.add(m)

print(f"Found {len(selectors_in_scripts)} data-tl selectors queried in lock scripts:")
for s in sorted(selectors_in_scripts):
    print(f"  - {s}")

# Collect all data-tl attributes defined in components/lock/
selectors_in_components = set()
for root, _, files in os.walk("components/lock"):
    for file in files:
        if file.endswith(".tsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                matches = re.findall(r'data-tl=[\'"]([^\'"]+)[\'"]', content)
                for m in matches:
                    selectors_in_components.add(m)

print(f"\nFound {len(selectors_in_components)} data-tl selectors defined in components:")

missing = []
for s in selectors_in_scripts:
    # check prefix matches (e.g. dynamic IDs or starts with)
    if s.endswith("*") or "^=" in s:
        continue
    if s not in selectors_in_components:
        # Check dynamic items
        if s.startswith("btn-revoke-") or s.startswith("btn-delete-") or s.startswith("vault-card-") or s.startswith("item-card-") or s.startswith("badge-device-inact-") or s.startswith("filter-chip-"):
            continue
        missing.append(s)

if missing:
    print(f"\nWARNING: {len(missing)} selectors queried but not found in components:")
    for m in missing:
        print(f"  MISSING: {m}")
else:
    print("\nALL SCRIPT SELECTORS ARE VALID AND PRESENT IN COMPONENTS!")
