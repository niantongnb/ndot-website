#!/usr/bin/env bash
#
# Regenerates site.css for the four rebuilt NDot rounds.
#
#   site.css  =  base.css  +  layout-<name>.css
#
# base.css is the SHARED half: tokens, type scale, components, the drift-in
# motion block and the review switcher. It is what makes the rounds read as one
# brand, and it is byte-identical in all four outputs, so a change here lands
# everywhere at once. The layout layer is the ONLY thing that differs between
# rounds, which is the point: the rounds are different pages, not different
# skins on one page.
#
# Round 1 of each direction (editorial/1, systems/1) is NOT built from this.
# They predate the split and keep their own self-contained stylesheets.
#
# This directory is not published: deploy/build.sh assembles _site from the
# landing page, editorial/ and systems/, and nothing else.
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

build() {  # build <layout-file> <prototype-slug>
  cat "src/ndot-css/base.css" "src/ndot-css/$1" > "$2/site.css"
  printf '  %-22s <- base.css + %s\n' "$2/site.css" "$1"
}

build layout-broadsheet.css editorial/2   # Editorial R2, the front page
build layout-broadside.css  editorial/3   # Editorial R3, the centred measure
build layout-facing.css     systems/2     # Systems R2, the facing pages
build layout-panels.css     systems/3     # Systems R3, the panels

for f in editorial/2 editorial/3 systems/2 systems/3; do
  o=$(tr -cd '{' < "$f/site.css" | wc -c); c=$(tr -cd '}' < "$f/site.css" | wc -c)
  [ "$o" = "$c" ] || { echo "Unbalanced braces in $f/site.css ($o vs $c)" >&2; exit 1; }
done

# `+` and `-` inside CSS math need surrounding whitespace. Without it the whole
# declaration is invalid and is dropped silently: nothing about the rendered
# page looks wrong, the type just falls back to the UA default at every width.
if grep -rn 'clamp([^)]*[0-9a-z)][+-][0-9a-z(]' editorial systems --include=site.css; then
  echo "Unspaced math inside clamp(): those declarations are silently dropped." >&2
  exit 1
fi
echo "ok"
