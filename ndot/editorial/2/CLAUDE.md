# NDot AI: Editorial, round 2 (Broadsheet)

An iteration of `../ndot-site/`. **Read that folder's CLAUDE.md first**: the
rules about NDot not being Nearby, no map ever, copy being verbatim, no invented
figures, and the fail-open motion contract all apply here unchanged.

## What this round changes: the geometry

An earlier version of this round changed the typesetting and left the page
structure alone. Reviewed side by side, the rounds read as one layout in three
skins, which is not a choice anyone can make. This round is a different page.

| | R1 | R2 | R3 |
|---|---|---|---|
| grid | `200px 88px 1fr`, two-track | nameplate + 4-column front | single centred measure |
| section rail | sticky, left of every section | none | none |
| sticky chrome | masthead + rail | **nothing** | nothing |
| reading order | one section at a time | packed, several at once | one movement at a time |

- **A centred nameplate** across the full measure, with a 3px/1px double rule
  under it and the nav as a dateline strip. Not sticky, because a front page
  does not follow you down the screen.
- **The lead runs three columns wide with the proof boxed in the fourth**, so
  the claim and the evidence are both above the fold. That is the whole argument
  for a front page over a stacked document.
- **Every section below is a banner across all four columns**, then sets itself
  in columns of its own: capabilities three across, mission and vision two
  across, the team as a six-across strip along the foot.
- **Careers is a black strap** across the bottom rather than a section.
- On the careers page the article is set in **real columns**, two at 900px and
  three at 1300px, with a column rule and a versal opening the lead.

## The baseline grid is the whole point

A newspaper coheres because **one vertical unit governs everything**: rules,
leading, the space above a head, the space under a deck. Columns align because
they are all counting the same unit.

The first draft of this round did not do that. It sized vertical space with
`clamp()` containing `vw`, which yields a different arbitrary number at every
viewport width. Measured at 1024px it had **23 distinct vertical spacing
values**, including 10.24, 16.38, 18.43, 20.48, 22.53, 24.58, 26.62, 30.72,
34.82, 40.96, 45.06 and 56.32, and **19 size/leading pairs** whose leadings
shared no common multiple. Nothing could align with anything. The review note
was "lots of spacings are super off" and it was exactly right.

Two rules now govern `layout-broadsheet.css`:

1. **Every vertical measure is a whole multiple of `--b` (6px).** Margins,
   padding, row gaps, rule heights, section heights.
2. **No `vw` in any vertical measure, ever.** Type steps at discrete
   breakpoints (700 / 1000 / 1300) so the numbers stay whole at every width
   instead of drifting between them.

Leading comes from a fixed set, all multiples of 6: 18 / 24 / 30 / 36 / 42 /
48 / 54. Body is 17/24, a newspaper's tight measure rather than a web default.
The lead head is set with slightly negative leading at the top step (56/54),
which is how a broadsheet sets a lead.

Measured after the rebuild: **9 distinct vertical spacing values, identical at
1024 and 1440**, and the only off-grid number on the page is the 1px hairline,
which is a rule rather than space.

Horizontal space may still be fluid; it does not affect vertical rhythm. Only
`--gut` is fixed, because the column gutter has to stay constant for the rules
to read as a grid.

**Verify with `rhythm.js`** (in the session scratchpad pattern): load the page,
collect every computed `margin-top/bottom`, `padding-top/bottom` and `row-gap`,
and assert each is a multiple of 6. If a new value appears, it is a bug.

## Rules all align to one measure

Every full-measure rule on the page spans exactly the same left and right
edges: the nameplate's double rule, the dateline, every section banner, and the
capability index. Measured at 1440 they all run 77.6 to 1362.4; at 1024, 41 to
983.

This broke once already. The dateline carried the `.sheet` class directly, so
its border spanned the *padded border box* while the double rule above it,
being inside `.sheet`, spanned the *content box*. Two rules, two widths, ten
pixels apart. The dateline is now nested inside a `.sheet` wrapper instead.

## Seven items never fill a three-wide grid

Everywhere else on this page a hairline is drawn as `gap:1px` over a
rule-coloured ground. The capability index cannot use that: seven items in
three columns leave two empty cells, and the ground shows through them as a
grey block. There the hairlines are **borders on the cells** instead, so the
rules stay continuous and the short last row is simply blank paper, which is
what a column foot looks like in a newspaper. `.caps` therefore needs its own
`display:grid`; it does not carry `.cols`.

## Things that will bite you here

- **Every hairline is a `gap:1px` over a rule-coloured ground** (`.cols`). The
  gap IS the rule, so rules cannot fall out of step with the columns they
  divide. Children must keep their `background`, or the ground shows through.
- **`.front .cols > *:first-child{padding-left:0}` is scoped to the front on
  purpose.** In a wrapping multi-row grid, `:first-child` is one cell, not one
  column, so a global flush rule unaligns every row after the first.
- **The strap needs `class="strap on-ink"`.** The base stylesheet keys folio,
  label and deck colours off `.on-ink`. Setting only `background:var(--ink-field)`
  leaves them on the paper-side tokens, which measured 2.55:1 and 3.46:1 before
  the class was added. Anything else inverted here needs the same class.
- **`<ol class="caps cols">` needs `padding:0`.** The list's default left padding
  shows as a grey column against the hairline ground.

## Stylesheet: do not edit site.css by hand

`site.css` is generated:

```bash
bash src/ndot-css/build.sh      # from the repo root
```

It is `src/ndot-css/base.css` + `src/ndot-css/layout-broadsheet.css`. The base
holds tokens, type scale, components, motion and the review switcher and is
byte-identical across all four rebuilt rounds, so a change there lands on all
of them at once. The layout layer is the only thing that differs. `src/` is not
published; `deploy/build.sh` copies the gallery, the manifest, `prototypes/` and
the chooser, and nothing else.

**Specificity trap when overriding the base.** The layout layer is concatenated
*after* the base, so at equal specificity it wins, including over the base's
`@media (max-width:600px)` rules (a media query adds no specificity). The
panels layout redefines `.nav a.is-cta`, which silently cost that round its
44px tap target until the mobile rule was restated locally. If you redefine a
base selector, check whether the base also has a mobile rule for it.
