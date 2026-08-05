# NDot AI — mission / vision one-pager

Static prototype. No build step: every page is a single self-contained HTML file
plus the county dataset.

| Path | What it is |
|---|---|
| `index.html` | Current design. Street-atlas treatment; the hero is 3,142 US county centroids. Click any county and the dots reform into that county's state; click again to return. |
| `v1.html` | Earlier dark, cinematic take. Kept for comparison. |
| `assets/counties.json` | 3,142 records of `[x, y, sqrt(land_area), "County, ST"]` in Albers USA space (975 x 610). |
| `serve.py` | Local dev server on :8899. Sends `no-store` so edits show up immediately, which `python3 -m http.server` does not. |

Copy is verbatim from the source mission/vision document. Tuned constants are
commented at the top of each animation block.

## Local

```
python3 serve.py 8899     # then open http://localhost:8899
```
