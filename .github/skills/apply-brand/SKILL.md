---
name: presentation-builder:apply-brand
description: Audit an existing HTML presentation for brand style compliance and
  fix violations. Triggered by phrases like "apply brand guidelines", "fix the
  branding", "check brand compliance", "update this deck to use our brand
  colors". Checks colors, fonts, slide themes, layout structure, slide chrome,
  logo usage, and data classification.
---

# Apply Brand Guidelines

## Purpose

Audit and fix an existing HTML presentation to comply with CivilTech / BAH brand guidelines. Checks colors, fonts, slide themes, layout structure, slide chrome, logo usage, and data classification, then applies corrections.

## Arguments

`$ARGUMENTS` — Path to an existing HTML presentation file.

If no file is provided, ask the user to specify one.

## Process

### 1. Read the Target File

Read the HTML file specified in $ARGUMENTS.

### 2. Read Brand Reference

Read `../../resources/brand-styles/brand-tokens.css` from this plugin to load the authoritative brand token definitions.

### 3. Audit for Violations

Check the file against each of these rules:

**Colors:**
- [ ] All colors use CSS custom properties (`var(--...)`) — no raw hex values in slide HTML
- [ ] Only colors from the approved palette are used: `--electric-teal`, `--black`, `--white`, `--electric-green`, `--electric-fuchsia`, `--teal`, and the derived tokens
- [ ] Accent color on dark backgrounds uses `--electric-teal` (#23D2D7), not `--teal` (#00A5B5)
- [ ] Accent color on light backgrounds uses `--teal` (#00A5B5), not `--electric-teal`

**Fonts:**
- [ ] Primary font: Inter (loaded from Google Fonts)
- [ ] Serif font: Source Serif 4 (loaded from Google Fonts, used only for quotes and taglines)
- [ ] No other font families referenced

**Slide themes:**
- [ ] Each `.slide` element has exactly one of: `light`, `dark`, `teal-hero` — OR `placemat light` / `placemat dark` for placemat mode (both are valid)
- [ ] `teal-hero` used only for title slides and section dividers, not content-heavy slides
- [ ] `.placemat` class is **not a violation** — it is an intentional mode for dense reference slides; do NOT remove it
- [ ] Placemat slides must not use `teal-hero` — only `light` or `dark`

**Typography:**
- [ ] `h1` used only on title slides
- [ ] `h2` used for content slide headlines
- [ ] Bullet lists use `<ul><li>` structure (not `<ol>` or `<p>` with manual bullets)
- [ ] On `.slide.placemat` slides: reduced font sizes (`0.82rem` body, `1.25rem` h2) are **correct** — do NOT flag as violations
- [ ] `.breadcrumb` elements on placemat slides are valid — do NOT remove them

**Slide chrome (every slide must have):**
- [ ] `<div class="slide-footer">` containing all three footer zones:
  - `<span class="footer-classification ...">` — present (may be empty if Non-Sensitive/None)
  - `<span class="footer-center">` — contains `boozallen.com` and `© 2026 Booz Allen Hamilton, Inc.`
  - `<div class="slide-number">` — present for JS population
- [ ] No legacy `<div class="brand-mark">` elements (superseded by footer-center)

**Logos:**
- [ ] If a `.bah-logo` element exists, it contains an `<img>` referencing an approved BAH SVG wordmark — not a text-only placeholder
- [ ] Logo color matches slide background: Black wordmark on `light` and `teal-hero` slides, Electric Teal or White wordmark on `dark` slides
- [ ] No unofficial logo images, rasterized screenshots, or raw `<img>` tags outside of `.bah-logo`
- [ ] Logo images are base64-encoded data URIs (for self-contained HTML)

**Data classification (if applicable):**
- [ ] If any slide has a classification badge, ALL slides must have the same badge
- [ ] Classification class must be one of: `entrusted`, `internal`, `restricted`
- [ ] No classification badge on Non-Sensitive or None-classified decks

**Layout classes (all of the following are valid — do NOT flag as unknown/incorrect):**
- Presenter: `.two-col`, `.pillar-grid`, `.pillar-card`, `.metrics-grid`, `.metric-card`, `.faq-grid`, `.faq-item`, `.quote-block`
- New presenter: `.stats-grid`, `.stat-card`, `.stat-label`, `.stat-context`, `.timeline-track`, `.timeline-phase`, `.timeline-phase-label`, `.maturity-grid`, `.maturity-level`, `.maturity-tier`, `.feature-grid`, `.feature-card`, `.icon-circle`, `.step-row`, `.step-item`, `.step-number`, `.step-keyword`, `.quad-grid`, `.quad-item`, `.quad-number`
- Placemat: `.placemat`, `.placemat-layout`, `.placemat-body`, `.placemat-sidebar`, `.sidebar-section-title`, `.sidebar-link-list`, `.solutions-grid`, `.solutions-col-header`, `.solutions-row-label`, `.solutions-cell`, `.why-built-grid`, `.why-built-reason`, `.breadcrumb`

**Brand tokens CSS:**
- [ ] `:root` block with all CSS custom properties is present in `<style>`
- [ ] Google Fonts `<link>` tags for Inter and Source Serif 4 are in `<head>`

**Slide engine:**
- [ ] `slide-engine.js` script (or equivalent inline JS) is present at end of `<body>`
- [ ] `<div class="nav-hint" id="navHint">` is present

### 4. Report Violations

List all violations found, grouped by category:
```
BRAND AUDIT RESULTS
===================
Colors:       2 violations
Fonts:        0 violations
Slide chrome: 3 violations (missing slide-footer on slides 4, 7, 9)
...

TOTAL: 5 violations found
```

### 5. Apply Fixes

For each violation:
- Replace raw hex colors with the correct CSS variable
- Add missing Google Fonts links
- Replace incorrect theme classes
- Replace legacy `<div class="slide-footer"></div>` with the full structured footer:
  ```html
  <div class="slide-footer">
    <span class="footer-classification"></span>  <!-- fill in e.g. class="footer-classification internal">Booz Allen Hamilton Internal if classified -->
    <span class="footer-center">boozallen.com &nbsp;&middot;&nbsp; &copy; 2026 Booz Allen Hamilton, Inc.</span>
    <div class="slide-number"></div>
  </div>
  ```
  Label format when classified: **`Booz Allen Hamilton [Level]`** (e.g. "Booz Allen Hamilton Internal", "Booz Allen Hamilton Restricted", "Booz Allen Hamilton Entrusted")
- Remove legacy `<div class="brand-mark">` elements (replaced by footer-center)
- Inject brand-tokens CSS if `:root` block is missing
- Inject slide-engine.js if navigation script is missing

If the original deck has a classification badge on some but not all slides, flag this inconsistency and ask the user which classification level to apply uniformly before writing the fixed file.

### 6. Output

Write the corrected HTML file. Use the same filename with `-branded` appended before the extension.

Example: `my-deck.html` -> `my-deck-branded.html`

After writing, provide a summary:
```
Brand compliance applied.
File written: my-deck-branded.html

Fixed:
- Replaced 2 raw hex values with CSS variables
- Added missing slide-footer to slides 4, 7, 9
- Corrected font reference: Arial -> Inter

No changes needed:
- Slide themes: all correct
- Brand mark: present on all slides
```

## Error Handling

If the file is not found or is not an HTML file:
```
Cannot apply brand guidelines: file not found or not an HTML file.
Please provide the path to an existing HTML presentation.
```

If the file is already fully compliant:
```
Brand audit complete. No violations found.
This presentation already follows all brand guidelines.