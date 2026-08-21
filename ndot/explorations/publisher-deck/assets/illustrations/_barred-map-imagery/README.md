# Do not use these on NDot

Two images arrived with the illustration batch that the NDot brand rules bar
outright. They are kept here so the work is not lost, and kept out of
`illustrations/` so nothing picks them up by accident.

From `prototypes/ndot-site/CLAUDE.md` in `n-interactive-prototype`, which is the
source of truth for NDot brand:

> **There is no map on NDot, and there must never be one.** A dot map means
> "local geography", which is exactly what NDot is no longer about. Also barred:
> pins, globes, coordinates, scatter/dot fields, and the words *near, local,
> around, nearby, neighborhood, coverage*.

Both files are a US map with a phone and location pins on it. That is the sister
company's visual language: Nearby is the consumer local-life product built around
a county dot map. Putting it on NDot undoes the repositioning that separated the
two companies.

## The files

**`newsbreak-local-news-phone-us-map.png`** — a phone over a paper US map with
three location pins. Well made, and correct for NewsBreak or Nearby. Use it there.

**`local-news-phone-map-CHECKERBOARD-BAKED-IN.png`** — same subject, and it has a
second, separate problem: it is RGB with no alpha channel, and the transparency
checkerboard is **painted into the pixels**. Compositing it produces a visible
grey-and-white grid behind the artwork. It is a screenshot of a transparent file
rather than the file itself. If this image is wanted, it needs re-exporting from
the source with a real alpha channel.
