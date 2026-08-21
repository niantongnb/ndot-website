#!/usr/bin/env bash
#
# Assembles the publishable site into _site/.
#
# A DEPLOY step, not a dev step. Local development needs no build: serve the
# repo root with ./serve.py and open the files.
#
#   Cloudflare Pages   build command:  bash deploy/build.sh
#                      output dir:     _site
#   GitHub Pages       point the workflow at this same script
#
# What is deliberately NOT published:
#   */CLAUDE.md    internal notes: positioning, open questions, placeholders
#   serve.py       local tooling
#   src/           stylesheet sources; site.css is generated from them
#
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

rm -rf _site
mkdir -p _site

cp index.html _site/
cp -r editorial systems _site/
find _site \( -name 'CLAUDE.md' -o -name 'measure.js' -o -name 'serve.py' \) -delete

# Unlisted, not secret. _headers covers hosts that read it; the meta tag covers
# the ones that do not, such as GitHub Pages.
cp deploy/robots.txt _site/robots.txt
cp deploy/_headers   _site/_headers
touch _site/.nojekyll
find _site -name '*.html' -print0 | while IFS= read -r -d '' f; do
  if ! grep -q 'name="robots"' "$f"; then
    sed 's|<meta name="viewport"|<meta name="robots" content="noindex, nofollow">\
<meta name="viewport"|' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
  fi
done

# ---- guards: fail loudly rather than shipping the wrong thing ----

if find _site \( -name 'CLAUDE.md' -o -name 'measure.js' -o -name 'serve.py' \) | grep -q .; then
  echo "Refusing to build: internal files reached _site." >&2; exit 1
fi

# every version must be present and must carry the source copy verbatim
for d in editorial/1 editorial/2 editorial/3 systems/1 systems/2 systems/3; do
  [ -f "_site/$d/index.html" ]   || { echo "Missing _site/$d/index.html" >&2; exit 1; }
  [ -f "_site/$d/careers.html" ] || { echo "Missing _site/$d/careers.html" >&2; exit 1; }
  grep -q "growth platform for modern media" "_site/$d/index.html" \
    || { echo "Missing expected copy in $d/index.html" >&2; exit 1; }
  grep -q "Build the Future of Media Growth" "_site/$d/careers.html" \
    || { echo "Missing careers copy in $d/careers.html" >&2; exit 1; }
done

# NDot is not Nearby. No map, no county data, no local-life vocabulary, ever.
if grep -rniE 'nearby|county|counties|3,142|neighborhood' _site --include='*.html' | grep -q .; then
  echo "Refusing to build: Nearby / local-geography content reached _site." >&2
  grep -rniE 'nearby|county|counties|3,142|neighborhood' _site --include='*.html' >&2
  exit 1
fi

missing_robots="$(find _site -name '*.html' -exec grep -L 'name="robots"' {} +)"
if [ -n "$missing_robots" ]; then
  echo "Pages missing the noindex tag:" >&2; echo "$missing_robots" >&2; exit 1
fi

echo "--- publishing $(find _site -type f | wc -l) files, $(du -sh _site | cut -f1) ---"
find _site -maxdepth 2 -type d | sort
