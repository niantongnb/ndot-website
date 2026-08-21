# Two sites, one repo

This repo hosts the design prototypes for two separate companies. The root is a
chooser; each site has its own catalog of every direction built for it.

| Path | Project | What |
|---|---|---|
| `/` | — | The chooser: one preview card per site. |
| `/ndot/` | **NDot AI** | The catalogue: eight directions, full-bleed rows, live hover previews. See `ndot/README.md`. |
| `/ndot/editorial/1..3/` | NDot AI | Publication — the original page plus the Broadsheet and Broadside rounds. |
| `/ndot/systems/1..3/` | NDot AI | Schematic — the original page plus the Facing Pages and Panels rounds. |
| `/ndot/v3-index/` `/ndot/v4-signal/` `/ndot/v5-institution/` | NDot AI | Index, Signal, Institution. |
| `/ndot/console/` `/ndot/institutional/` `/ndot/lab/` | NDot AI | Console, Prospectus, Lab. |
| `/ndot/explorations/publisher-deck/` | NDot AI | The 15-page pitch-deck direction. |
| `/nearby/` | **Nearby AI** | The catalog. Consumer local-life product. See `nearby/HANDOFF.md`. |
| `/nearby/v1..v4/` | Nearby AI | The four Nearby directions. V4 is the picked one. |
| `/v1..v4/` | — | Redirect stubs to `/nearby/v1..v4/` for links shared before the move. |

**NDot AI and Nearby AI are separate companies and their material must not
mix.** NDot is a B2B growth platform for media companies: no map, no county
data, no local-life vocabulary, ever. Nearby is the consumer local-life product
and owns everything with a county map in it.

## Run locally

```
python3 serve.py 8899     # http://localhost:8899
```

Use `serve.py`, not `python3 -m http.server`. It sends `Cache-Control: no-store`;
without it browsers hold a stale copy and edits look like they did nothing.

## Deploy

GitHub Pages serves this repo root directly from `main`, with no build step, so
anything committed here is live about a minute after pushing. Every page carries
`noindex, nofollow` and `robots.txt` says `Disallow: /`. Unlisted, not secret.
