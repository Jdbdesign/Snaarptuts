#!/usr/bin/env python3
"""Static audit: every [data-tl=...] a Books step script (33-158) targets must exist somewhere in components/books."""
import re, glob, sys

comp = "".join(open(f, encoding="utf-8").read() for f in glob.glob('components/books/*.ts*'))
tls = set(re.findall(r'data-tl="([^"]+)"', comp)) | set(re.findall(r'tl:\s*"([^"]+)"', comp)) | set(re.findall(r'"((?:[a-z0-9]+-)+[a-z0-9]+)"', comp))
templ = [re.sub(r'\$\{[^}]*\}', '.+', t) for t in re.findall(r'data-tl=\{`([^`]+)`\}', comp)]
templ += [re.sub(r'\$\{[^}]*\}', '.+', t) for t in re.findall(r'`((?:[a-z0-9]+-)+\$\{[^`]*)`', comp)]
ok = lambda s: s in tls or any(re.fullmatch(t, s) for t in templ)
bad = 0
for n in range(33, 179):
    src = open(f'scenes/books/step{n}/script.ts', encoding="utf-8").read()
    miss = [s for s in sorted(set(re.findall(r'\[data-tl=([^\]]+)\]', src))) if not ok(s)]
    if miss:
        bad += 1
        print(n, miss)
print("selector audit:", "FAIL" if bad else "OK")
sys.exit(1 if bad else 0)
