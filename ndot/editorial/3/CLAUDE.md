# NDot AI: Editorial, round 3 (Broadside)

An iteration of `../ndot-site/`. **Read that folder's CLAUDE.md first**: the
rules about NDot not being Nearby, no map ever, copy being verbatim, no invented
figures, and the fail-open motion contract all apply here unchanged. Then read
`../ndot-edit-r2/CLAUDE.md` for the shared stylesheet mechanics.

## What this round changes: the geometry

An earlier version of this round inverted the palette and swapped the display
face, and left the page structure identical to R1. That is a skin, not a round.
This one is a different page.

| | R1 | R2 | R3 |
|---|---|---|---|
| grid | `200px 88px 1fr`, two-track | nameplate + 4-column front | **one centred 660px measure** |
| symmetry | asymmetric | symmetric masthead, asymmetric body | symmetric throughout |
| margins | sticky rail lives there | columns | **nothing in the margins at all** |
| sticky chrome | masthead + rail | none | none |

- **One centred measure, about 660px**, and nothing beside it. No rail, no
  sidebar, no multi-column flow, no sticky header. The mark sits once at the
  head of the page and scrolls away with it.
- **Section marks are centred labels with a rule running out to both margins**,
  which is how a broadside separates one movement from the next.
- **The opening is set like a title page**: the display line centred because it
  IS the title, the deck below it ranged left, because 45 words centred is a
  shape rather than a sentence.
- **The proof is tipped in on paper**, one sheet laid onto the dark page.
- Dark ground, Bodoni Moda for display, Newsreader for text.

## The inversion, and the bug it used to cause

The palette is inverted by swapping token **values** in `:root`, not by
rewriting rules, so every component keeps its own contrast maths.

`.tipped` and `.contact-block` do the same thing locally: they redefine
`--ink`, `--ink-2`, `--rule` and `--accent` **on themselves**, so every
descendant inherits the correct side of the inversion with no per-element
overrides at all.

That is deliberate. The failure mode it removes is real and has happened in this
repo: a section moved to the other side of an inversion, every rule that had
hard-coded a colour for it kept pointing the old way, and the proof figures
measured **1.04:1** while sitting in the DOM at full opacity. Nothing looked
broken; only the contrast harness caught it. **If you add an inset, redefine the
tokens on it. Do not colour its children one by one.**

## Verify by measuring

Contrast, tap targets, overflow, zero-size text and verbatim copy are all
checked in headless Chromium at 320/390/768/1440. Note that **Google Fonts is
unreachable from the sandbox** (`ERR_CONNECTION_RESET`), so measurements there
are taken in the fallback stacks. Metrics-sensitive judgements (line breaks,
optical sizes) still need a real browser.
