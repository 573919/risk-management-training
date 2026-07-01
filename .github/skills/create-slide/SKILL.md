---
name: presentation-builder:create-slide
description: Generate a single branded HTML slide using a specified layout.
  Triggered by phrases like "add a slide", "create a slide about", "make a
  two-column slide", "generate a title slide for". Useful for adding slides to
  an existing deck or generating individual visuals.
---

# Slide Generation Instructions

## Purpose

Generate a single slide as an HTML snippet using CivilTech / BAH brand guidelines. Returns the `<div class="slide ...">` block ready to drop into an existing deck.

## Arguments

`$ARGUMENTS` should specify:
- **Layout** (required): see layout table below
- **Content** (required): The text or data to put on the slide
- **Mode** (optional): `presenter` (default) or `placemat` — affects which class is applied and which template family to use
- **Theme** (optional): `light`, `dark`, or `teal-hero` (defaults vary by layout)
- **Slide number** (optional): The `data-slide` index (defaults to `1` if not specified)

Examples:
- `create-slide title-slide "AI Adoption Strategy" subtitle "Practical guidance for federal agencies" dark`
- `create-slide content-slide "Key barriers to adoption" with 5 bullet points dark`
- `create-slide two-column-slide "Before vs. After" comparing manual process to AI-assisted`
- `create-slide stats-slide with metrics: 360K employees, $4.2B revenue, 97% client retention`
- `create-slide timeline-slide "Our Phased Approach" three phases: Assess / Build / Scale`
- `create-slide maturity-model-slide CRAWL/WALK/RUN/FLY for AI adoption`
- `create-slide features-grid-slide three capabilities: GenAI, Vision AI, AI Security`
- `create-slide process-steps-slide "How We Engage" four steps`
- `create-slide quad-grid-slide "Four Investment Areas" numbered 01–04`
- `create-slide placemat-body-sidebar "Generative AI" overview with resources sidebar`
- `create-slide placemat-solutions-grid "GenAI Solutions" 3 columns: Knowledge Assistant / IDP / Intelligence Analysis`
- `create-slide placemat-why-built "Why We Built Agentic AI" with three drivers`
- `create-slide rom-slide from @rom-for-client.md`

## Process

### 1. Identify Layout and Mode

Match $ARGUMENTS to a layout and mode from the table below:

| Layout | Mode | Best for |
|--------|------|----------|
| `title-slide` | Presenter | Title, section openers, closing slide |
| `content-slide` | Presenter | Narrative, bullet points, quotes, single key message |
| `two-column-slide` | Presenter | Comparisons, before/after, parallel ideas |
| `faq-grid-slide` | Presenter | Q&A, objection handling, "what/why/how/when" |
| `stats-slide` | Presenter | Key metrics, big numbers, facts & figures (3 stats) |
| `timeline-slide` | Presenter | Phased approach, roadmap, journey (3–5 phases) |
| `maturity-model-slide` | Presenter | 4-level capability progression (CRAWL/WALK/RUN/FLY) |
| `features-grid-slide` | Presenter | 3-up capability/feature cards with icon placeholders |
| `process-steps-slide` | Presenter | Numbered sequential steps (3–5 steps) |
| `quad-grid-slide` | Presenter | 2×2 numbered components, 4-part framework |
| `placemat-body-sidebar` | Placemat | Dense offering overview with resources sidebar |
| `placemat-solutions-grid` | Placemat | Multi-solution comparison table (2–5 solutions) |
| `placemat-why-built` | Placemat | Overview paragraph + 3 strategic driver blocks |
| `rom-slide` | Placemat | Dense ROM one-pager: three-column layout with outcome, benefits, timeline, estimate, and risks |

### 2. Read the Template

Read the matching template file from this plugin:
```
../../resources/templates/slides/[layout].html
```

### 3. Fill in the Template

Replace all `{{PLACEHOLDER}}` markers with the actual content from $ARGUMENTS.

Apply brand rules:

**Presenter mode themes:**
- `title-slide` defaults to `dark`; use `teal-hero` for opening/section dividers
- `content-slide` defaults to `light`
- `two-column-slide` defaults to `light`
- `faq-grid-slide` is always `light`
- `stats-slide` defaults to `dark` (numbers pop on dark backgrounds)
- `timeline-slide` defaults to `light`
- `maturity-model-slide` defaults to `light`
- `features-grid-slide` defaults to `light`
- `process-steps-slide` defaults to `light`
- `quad-grid-slide` defaults to `light`

**Placemat mode:**
- All placemat layouts use `.slide.placemat.light` (or `.dark`) — the `placemat` class is REQUIRED
- The `.placemat` class reduces typography scale and padding for dense content
- Theme on placemat slides: `light` (default) or `dark` — never `teal-hero`
- Content density: 150–350 words for body-sidebar; keep solutions cells concise

**placemat-solutions-grid column count:**
- Set `style="--sol-cols: N"` on the `.solutions-grid` element (N = number of solutions)
- Maximum 5 columns — beyond that, text is unreadably small at 1280×720

**Headlines:** ≤8 words for h1 (title slides), ≤12 words for h2 (content slides)
**Bullets:** Maximum 5–6 per slide, ≤15 words each
**Colors:** Only CSS variables from brand-styles/brand-tokens.css — never raw hex in slide HTML

**Slide footer:** Every slide must include the structured footer — never leave it empty:
```html
<div class="slide-footer">
  <span class="footer-classification [level]">[Label]</span>  <!-- empty if Non-Sensitive/None -->
  <span class="footer-center">boozallen.com &nbsp;&middot;&nbsp; &copy; 2026 Booz Allen Hamilton, Inc.</span>
  <div class="slide-number"></div>
</div>
```
Ask for data classification if not already known.

### 4. Icon Guidance

For slides using `.icon-circle` placeholders (`features-grid-slide`):

**Available BAH icon categories** (from official sample deck):
- Agile / Process (scrum, kanban, sprint, retrospective, velocity)
- Business / Teaming (collaboration, partnership, agreement, leadership, strategy)
- Data & AI (machine learning, NLP, data analysis, visualization, algorithm)
- Cloud infrastructure (cloud sync, migration, security, hybrid cloud)
- Security & Compliance (data protection, encryption, access control, compliance)
- Healthcare / Life Sciences (research, diagnostics, clinical, pharmacy)
- People & Avatars (diverse professional personas)

**Injecting icons:**
- Unicode/emoji character: `<div class="icon-circle">⚡</div>`
- Phosphor Icons (CDN): Add `<link rel="stylesheet" href="https://unpkg.com/phosphor-icons@1.4.2/src/css/icons.css">` to `<head>`, then use `<i class="ph-brain"></i>` inside the circle
- SVG file: `<div class="icon-circle"><img src="icons/ai.svg" alt="AI" width="24" height="24"></div>`
- If no icon is specified, use `◆` as a default shape placeholder

### 5. Output

Return the completed `<div class="slide ...">` block.

If the user is building this slide to add to an existing deck, note:
- The `data-slide` number to use
- That they need to ensure `brand-styles/brand-tokens.css` content is in the `<style>` block and `slide-engine.js` is in the `<script>` block at the bottom of the deck file

## Error Handling

If layout is ambiguous or missing, ask:
```
Which layout would you like?

PRESENTER MODE (sparse, whitespace-heavy):
1. title-slide         — title, section opener, or closing
2. content-slide       — narrative, bullets, or quote
3. two-column-slide    — comparison or two parallel concepts
4. faq-grid-slide      — four Q&A cells (2×2 grid)
5. stats-slide         — 3 big-number metrics
6. timeline-slide      — 3–5 phased timeline
7. maturity-model-slide — 4-level progression
8. features-grid-slide — 3-up icon+title+text cards
9. process-steps-slide — numbered sequential steps
10. quad-grid-slide    — 2×2 numbered components

PLACEMAT MODE (dense, self-contained reference):
11. placemat-body-sidebar    — prose body + resources sidebar
12. placemat-solutions-grid  — multi-solution comparison table
13. placemat-why-built       — overview + 3 strategic driver blocks
14. rom-slide                — ROM one-pager (3-column: scope/benefits/estimate)