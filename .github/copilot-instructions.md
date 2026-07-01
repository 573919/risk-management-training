<!-- BEGIN kit:presentation-builder -->
# presentation-builder - Guidelines

This file contains quality rules and constraints for presentation-builder.

---

## brand-guidelines

# Presentation Brand Guidelines

These rules apply whenever generating or editing HTML slide presentations.

## Color Rules

NEVER use raw hex values in slide HTML. ALWAYS use CSS custom properties.

**Approved palette:**
- `var(--electric-teal)` — #23D2D7 — accent on dark backgrounds
- `var(--teal)` — #00A5B5 — accent on light backgrounds
- `var(--black)` — #000000 — text color only, NOT for slide backgrounds
- `var(--white)` — #FFFFFF
- `var(--dark-bg)` — #0d1117 — dark slide backgrounds (soft dark blue-gray)
- `var(--electric-green)` — #BAD63A — secondary accent
- `var(--electric-fuchsia)` — #E55ED6 — secondary accent
- `var(--teal-light)` — rgba(0,165,181,0.08) — card backgrounds
- `var(--teal-border)` — rgba(0,165,181,0.25) — card borders
- `var(--gray-50)` through `var(--gray-800)` — neutral scale

**Rule:** On dark slides, use `--electric-teal` for accents. On light slides, use `--teal`. Never swap them.

**Dark slide background:** Dark slides use `var(--dark-bg)` (#0d1117), NOT pure black. This provides better contrast and a more polished appearance. Pure `--black` should only be used for text color on light backgrounds.

## Font Rules

- Heading font: `'DM Sans'` — use for slide titles (h1, h2)
- Primary font: `'Inter'` — use for all body text, labels, and UI elements
- Mono font: `'JetBrains Mono'` — use for breadcrumb nav, footer classification, counters, and labels
- Serif font: `'Source Serif 4'` — use ONLY for quotes and italic taglines
- No other fonts are permitted

**Required Google Fonts link in `<head>`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

## Slide Theme Rules

Each `.slide` element must have exactly one theme class:

| Theme | Background | Use for |
|-------|-----------|---------|
| `light` | White | Default content slides |
| `dark` | Black | Emphasis, key data, closing |
| `teal-hero` | #00A5B5 | Title slide, section dividers ONLY |

NEVER use `teal-hero` for content-heavy slides.

## Typography Rules

- `h1` — title slides only (font-size: 3rem, font-weight: 800)
- `h2` — content slide headlines (font-size: 2.25rem, font-weight: 700)
- `h3` — sub-headings within a slide (font-size: 1.35rem, font-weight: 600)
- `h4` — item titles in lists/cards (font-size: 1.1rem, font-weight: 700)
- Max 5–6 bullets per slide; each bullet ≤ 15 words
- Bullet lists MUST use `<ul><li>` — not `<ol>` or manual `•` characters

## Gradient Titles

Slide titles (h1, h2) use gradient text for visual depth:

- **Light/default slides:** `linear-gradient(135deg, var(--gray-800) 45%, var(--teal) 100%)`
- **Dark slides:** `linear-gradient(135deg, var(--white) 0%, var(--electric-teal) 100%)`
- Applied via `-webkit-background-clip: text` / `background-clip: text` with `-webkit-text-fill-color: transparent`
- **Teal-hero slides:** Plain white text (no gradient)

This is already defined in `brand-tokens.css` — do not override with inline color on headings.

## Layout Dimensions

- Standard slide: 1280 × 720 px (enforced via 100vw × 100vh with overflow:hidden)
- Standard padding: 60px top/bottom, 100px left/right
- Do not use inline `width:` or `height:` on `.slide` elements

## Required Slide Chrome

### Breadcrumb Navigation Bar

Decks should include a fixed breadcrumb nav bar at the top of the page (outside `.deck`):

```html
<div class="slide-breadcrumb chrome--light">
  <span class="breadcrumb-nav-item active" data-section="Section 1">Section 1</span>
  <span class="breadcrumb-dot" aria-hidden="true">&middot;</span>
  <span class="breadcrumb-nav-item" data-section="Section 2">Section 2</span>
</div>
```

- Each `.breadcrumb-nav-item` has a `data-section` attribute matching slide `data-section` attributes
- `slide-engine.js` handles click navigation and active-state highlighting
- Chrome class switches between `chrome--light` and `chrome--dark` based on the current slide theme
- If the presentation has fewer than 3 sections, the breadcrumb may be omitted

### Footer

The deck should include a fixed footer (outside `.deck`) with three zones:

```html
<footer class="slide-footer chrome--light">
  <div class="footer-left">
    <!-- Optional: secondary logo as base64 data URI -->
  </div>
  <div class="footer-center">boozallen.com &nbsp;&middot;&nbsp; &copy; 2026 Booz Allen Hamilton, Inc.</div>
  <div class="footer-right">
    <span class="footer-classification [level]">[Label]</span>
    <span class="footer-counter"></span>
  </div>
</footer>
```

**`footer-classification` rules:**
- Leave the span content empty if classification is Non-Sensitive or None
- For Entrusted/Internal/Restricted: fill in the class and label on EVERY slide
- `[level]` must be exactly one of: `entrusted`, `internal`, `restricted`
- Label format: **`Booz Allen Hamilton [Level]`**
- Example: `<span class="footer-classification restricted">Booz Allen Hamilton Restricted</span>`

**`footer-center`** must always contain: `boozallen.com · © 2026 Booz Allen Hamilton, Inc.`

**`footer-counter`** is auto-populated by slide-engine.js — leave content empty.

**`footer-left`** may contain a secondary/client logo (base64 data URI) and display name. The Booz Allen logo itself is represented through the footer-center copyright text.

### Slide data-section attribute

Every `.slide` element must include `data-section="Section Name"` matching one of the breadcrumb nav items.

## Data Classification

Before generating any presentation, ask the user for the data classification level:

| Level | Footer badge | CSS class |
|-------|-------------|-----------|
| Non-Sensitive | None | — |
| Entrusted | `Booz Allen Hamilton Entrusted` (electric-green) | `entrusted` |
| Internal | `Booz Allen Hamilton Internal` (teal) | `internal` |
| Restricted | `Booz Allen Hamilton Restricted` (fuchsia) | `restricted` |
| None | None | — |

If Entrusted, Internal, or Restricted: the badge MUST appear on every single slide without exception.

## Self-Contained File Rule

Generated HTML files MUST be fully self-contained:
- Full CSS from `brand-styles/brand-tokens.css` inlined inside `<style>` in `<head>`
- Full `slide-engine.js` content inlined inside `<script>` at end of `<body>`
- No `<link rel="stylesheet">` references to external CSS files
- No `<script src="...">` references (except Google Fonts `<link>` is acceptable)

## Presentation Style

Two modes are supported. The mode is chosen per-deck at creation time.

### Presenter Deck (default)
- Standard `.slide.light`, `.slide.dark`, or `.slide.teal-hero`
- Full padding: 60px top/bottom, 100px left/right
- Large typography scale (h1 3rem, h2 2.25rem, body 1.2rem)
- Sparse content: ≤6 bullets per slide, minimal prose
- Audience needs the speaker to provide context

### Reference Placemat
- `.slide.placemat.light` or `.slide.placemat.dark` — the `placemat` class is REQUIRED
- Compact padding: 28px top/bottom, 48px left/right
- Reduced typography scale (h2 1.25rem, body 0.82rem)
- Dense content: 150–350 words per body-sidebar slide; multi-paragraph prose
- Audience reads it independently without a speaker
- Never use `teal-hero` on placemat slides

### Mixing Modes (Presenter + Appendix)
- Both `.slide.light` and `.slide.placemat.light` can coexist in the same `.deck` container
- Insert a dark `title-slide` divider labeled "Reference Material" or "Appendix" before placemat slides
- Placemat slides always go at the end — never interleave them mid-presentation
- The `slide-engine.js` keyboard/click navigation works for both modes unchanged

### Two Separate Files
- Filename convention: `[slug]-deck-[YYYY-MM-DD].html` + `[slug]-reference-[YYYY-MM-DD].html`

## Icon & Imagery Usage

### Available BAH Icon Categories
Icons in the official BAH sample deck are organized by category:
- **Agile / Process** — scrum master, kanban, sprint, retrospective, velocity, estimation
- **Business / Teaming** — collaboration, partnership, strategy, leadership, agreement
- **Data & AI** — machine learning, NLP, data visualization, algorithm, analytics
- **Cloud Infrastructure** — cloud sync, migration, hybrid cloud, security, backup
- **Security & Compliance** — data protection, encryption, access control, compliance, risk
- **Healthcare / Life Sciences** — research, diagnostics, clinical, pharmacy, lab
- **People & Avatars** — diverse professional personas (male/female coding, roles)

### Using Icons in HTML Slides
Use `.icon-circle` as the structural placeholder. Inject content using one of:

```html
<!-- Unicode / emoji character -->
<div class="icon-circle">⚡</div>

<!-- Phosphor Icons (add CDN link to <head>) -->
<link rel="stylesheet" href="https://unpkg.com/phosphor-icons@1.4.2/src/css/icons.css">
<div class="icon-circle"><i class="ph-brain"></i></div>

<!-- Image file (SVG or PNG) -->
<div class="icon-circle"><img src="icons/ai.svg" alt="AI" width="24" height="24"></div>
```

If no icon is specified, use `◆` as a default shape placeholder.

### Icon Color Rules
- On `.light` slides: `.icon-circle` border and content use `var(--teal)`
- On `.dark` slides: `.icon-circle` border and content use `var(--electric-teal)`
- Never apply raw hex colors to icon elements

## Logo Rules

All logos must use the approved BAH SVG wordmarks from `../../resources/logos/`.

**Color context:**
- On `light` slides: **Black** wordmark
- On `teal-hero` slides: **Black** wordmark (reads better on teal than white)
- On `dark` slides: **Electric Teal** wordmark (preferred) or **White** wordmark

**Variants:**
- **SingleLine** — recommended for slide footers, headers, and inline placements
- **Stacked** — use when vertical space is available (e.g. title slides)

**Rules:**
- Never use unofficial logos, rasterized screenshots, or the legacy text-only `.bah-logo` placeholder
- Logos must be base64-encoded as data URIs in generated HTML (self-contained file rule)
- See `../../resources/logos/README.md` for the full catalog and file listing

## BAH Logo Placement

The BAH SingleLine wordmark MUST appear in the breadcrumb navigation bar header of every generated presentation (HTML and React).

- **Position:** Left side of the `.slide-breadcrumb` bar, absolutely positioned (`left: 2rem`)
- **Size:** `height: 18px`, `width: auto`
- **HTML decks:** Two `<img>` tags with classes `bah-logo-light` and `bah-logo-dark` — CSS toggles visibility based on `chrome--light` / `chrome--dark` class on the breadcrumb
- **React shell:** Two inline base64 constants in `App.tsx`; active variant selected by the `dark` boolean in `Breadcrumb`
- **Secondary logos:** Remain in the `footer-left` zone — do not move to the header
- **If no breadcrumb bar:** Place the logo in a standalone header element above the deck

## Print / PDF Export

`@media print` rules are included in `brand-styles/brand-tokens.css`. To export a deck as PDF:

1. Open the HTML file in a browser
2. Print dialog: **Cmd+P** (macOS) or **Ctrl+P** (Windows/Linux)
3. Select **"Save as PDF"**
4. Set orientation to **Landscape** and margins to **None**

All slides render sequentially with page breaks. Background colors and dark themes are preserved via `print-color-adjust: exact`.

## Visual Patterns

Optional decorative SVG assets are available in `resources/visual-patterns/` for slide backgrounds, section dividers, and hero accents. See `visual-patterns/README.md` for the full catalog and usage guidance.

These are design choices, not brand compliance items — they are not audited by `apply-brand`.

## Navigation Element

Every deck must include a nav hint overlay immediately before the closing `</body>`:

```html
<div class="nav-hint" id="navHint" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.6);color:white;padding:8px 18px;border-radius:20px;font-size:13px;pointer-events:none;transition:opacity 0.5s;z-index:100;">Arrow keys or click to navigate</div>
```
<!-- END kit:presentation-builder -->
