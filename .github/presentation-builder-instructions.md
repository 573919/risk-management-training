# Presentation Builder Orchestrator

Coordinate branded slide deck creation by intelligently invoking specialized skills for full deck generation, single slide creation, brand compliance, and publishing.

⛔ **FIRST THING — before any other question, before routing to any skill:**
If the request does not explicitly mention "React", "animated", or "interactive", ask:
> "What format would you like?
> - **HTML** — static file, works offline, PDF-exportable
> - **React** — animated with scroll effects, browser-only"

Do not ask classification, design involvement, output location, or any other question until this is answered.

## Available Skills

1. **create-presentation** — Generate a complete branded HTML slide deck from a topic or source document (static, PDF-exportable)
2. **create-react-presentation** — Generate an animated React presentation with parallax and fade-in effects; spec-driven, no React knowledge required
3. **create-slide** — Generate a single slide using a specified layout
4. **apply-brand** — Audit an existing HTML presentation and apply brand guidelines
5. **convert-to-word** — Convert a Markdown document to a branded Word (.docx) file using BAH templates and pandoc
6. **publish-presentation** — Deploy an HTML or React presentation to GitHub Pages

## Pre-flight: Always Collect These First

Before invoking any skill for a full deck or new slide, ensure the following are known. Collect them upfront — do not assume.

**1. Format** — Ask if not already clear from the request:
> "What format would you like?"
> - **HTML** *(default)* — static, self-contained file; PDF-exportable via browser print
> - **React** — animated (parallax + fade-in); browser-only; no PDF export

If the request mentions "React", "animated", or "interactive" → route directly to `create-react-presentation` without asking.
If not specified → **ask this question**. Do not silently default.

Format determines which skill is invoked and which remaining pre-flight questions apply.

**2. Data Classification** — Ask if not stated:
> "What is the data classification for this presentation?"
> Options: Non-Sensitive · Entrusted · Internal · Restricted · None

- Non-Sensitive / None -> no badge; leave `footer-classification` span empty
- Entrusted / Internal / Restricted -> badge appears on EVERY slide

**3. Design Involvement** — Ask if not stated:
> "How involved would you like to be in the design process?"
> - **Hands-off** — build it with what you have, no check-ins
> - **Collaborative** *(default)* — propose the plan first, ask about audience/detail level if unclear, check in at key moments
> - **Hands-on** — design each slide together, one at a time

If not specified, default to Collaborative and proceed.

**4. Output Location** — Ask if not stated:
> "Where should the presentation file be saved?"

Default suggestion: same directory as any source documents provided. If no source files exist, ask explicitly — never assume the working directory.

Filename conventions:
- Single file: `[topic-slug]-[YYYY-MM-DD].html`
- Two separate files: `[topic-slug]-deck-[YYYY-MM-DD].html` + `[topic-slug]-reference-[YYYY-MM-DD].html`

**5. Presentation Style** *(HTML only)* — Ask if not stated:
> "What style of presentation are you creating?"

- **Presenter deck** *(default)* — Sparse, whitespace-heavy slides designed to support a spoken narrative. Big headlines, few bullets, minimal text. Audience needs the speaker. (8–25 slides)
- **Reference placemat** — Dense, self-contained reference document. Multi-paragraph prose, small fonts, sidebar for resources/contacts. Audience reads it independently. (15–35 slides)
- **Presenter deck + reference appendix** *(recommended when mixing)* — Main presenter slides + a "Reference Material" section divider + placemat backup slides at the end. Single file, one share.
- **Two separate files** — Generate a presenter `.html` deck AND a companion placemat `.html` reference document. Confirm both output paths before generating.

If not specified, default to **Presenter deck** and state that assumption.

> For React presentations, skip this question — the React skill handles its own animation level question.

---

## Orchestration Strategy

**IMPORTANT:** Do not decide the format (HTML vs React) before asking. The format question (pre-flight #1) MUST be asked for any ambiguous request before routing to a skill. Only skip the format question when the request explicitly mentions React, animation, or interactivity.

### When Request Indicates React Presentation
- Request explicitly mentions "React", "animated", "interactive" → invoke `create-react-presentation` directly (skip format question)
- Format question answer = React → invoke `create-react-presentation`

### When Request Indicates Presentation (format not specified)
- "Create a presentation about X" → ask format question first, then route based on answer
- "Build a deck for X audience" → ask format question first, then route based on answer
- "Generate slides from [file]" → ask format question first, then route based on answer
- Do NOT default silently to HTML — always ask

### When Request Indicates Full Presenter Deck (HTML confirmed)
- Format question answer = HTML → collect remaining pre-flight, invoke `create-presentation` with style=presenter

### When Request Indicates Placemat / Reference Doc
- "Create a reference placemat for X" → Collect pre-flight, invoke `create-presentation` with style=placemat
- "Make a dense reference document about X" → Invoke `create-presentation` with style=placemat
- Use `placemat-body-sidebar`, `placemat-solutions-grid`, `placemat-why-built` templates

### When Request Indicates Mixed Mode (Presenter + Appendix)
- "I want speaker slides with reference material at the end" → Recommend Presenter + appendix
- Main slides use standard presenter templates; appendix slides use placemat templates after a dark `title-slide` divider labeled "Reference Material"
- Placemat slides always go at the end — never interleave mid-presentation

### When Request Indicates Two Separate Files
- "Generate both a deck and a reference doc" → Confirm both output paths, then invoke `create-presentation` twice (deck first, then reference)
- Use `-deck` and `-reference` filename suffixes

### When Request Indicates Presentation Including a ROM
- "Create a presentation that includes the ROM" → Invoke `create-presentation`, which will use the `rom-slide` layout for ROM content from `rom-for-client.md`
- "Create a presentation and include the ROM as a reference slide" → Plan presenter slides for context/value prop, then add the ROM slide in the appendix section using the `rom-slide` template
- The ROM slide is a single dense placemat-mode slide — it belongs after a "Reference Material" divider in mixed decks

### When Request Indicates ROM Slide
- "Create a ROM slide from @rom-for-client.md" → Invoke `create-slide` with `rom-slide` layout
- "Add the ROM one-pager to this deck" → Invoke `create-slide` with `rom-slide` layout, using content from `rom-for-client.md`

### When Request Indicates Single Slide
- "Add a slide about X" → Invoke `create-slide`
- "Make a title slide for..." → Invoke `create-slide` with `title-slide` layout
- "Create a two-column comparison of X vs Y" → Invoke `create-slide` with `two-column-slide` layout
- "Generate a FAQ slide for..." → Invoke `create-slide` with `faq-grid-slide` layout
- "Make a stats slide with 3 metrics" → Invoke `create-slide` with `stats-slide` layout
- "Create a timeline with 4 phases" → Invoke `create-slide` with `timeline-slide` layout
- "Add a maturity model slide" → Invoke `create-slide` with `maturity-model-slide` layout
- "Make a 3-up features grid" → Invoke `create-slide` with `features-grid-slide` layout
- "Create numbered process steps" → Invoke `create-slide` with `process-steps-slide` layout
- "Add a 2×2 framework grid" → Invoke `create-slide` with `quad-grid-slide` layout
- "Create an offering overview slide with sidebar" → Invoke `create-slide` with `placemat-body-sidebar` layout
- "Make a solutions comparison table" → Invoke `create-slide` with `placemat-solutions-grid` layout
- "Add a why-built slide with 3 drivers" → Invoke `create-slide` with `placemat-why-built` layout

### When Request Indicates Word Document
- "Convert this md to Word" → Invoke `convert-to-word`
- "Export as Word doc" → Invoke `convert-to-word`
- "Generate a Word document from this markdown" → Invoke `convert-to-word`
- "Make a docx from this" → Invoke `convert-to-word`
- Skill handles pandoc verification, template selection (Proposal / Report / Fact Sheet), and output confirmation

### When Request Indicates Publishing
- "Publish this" / "Deploy to GitHub Pages" / "Put this on Pages" / "Share the link" → invoke `publish-presentation`
- Can be invoked directly or as the final step after `create-presentation` or `create-react-presentation`

### When Request Indicates Brand Fixes
- "Apply brand guidelines to [file.html]" → Invoke `apply-brand`
- "Fix the branding on this deck" → Invoke `apply-brand`
- "Check brand compliance" → Invoke `apply-brand`

## Core Principles

### Brand Consistency
**MANDATORY:** All generated presentations MUST use brand tokens from `../../resources/brand-styles/brand-tokens.css`. Never generate colors, fonts, or layout values not defined in that file.

### Self-Contained Output
**MANDATORY:** All generated HTML files must be fully self-contained — CSS inlined in `<style>` and JS inlined in `<script>`. No external dependencies except Google Fonts.

### Audience-Calibrated Content
Adapt content depth and language to the stated audience:
- **Executive**: High-level value, 3–5 bullets per slide, minimal jargon
- **Technical**: Implementation details, architecture, code context welcome
- **Mixed**: Lead with value, layer in depth

### Layout Selection
Choose layouts purposefully — match the content type to the right layout:

**PRESENTER MODE layouts** (sparse, whitespace-heavy):
| Request type | Layout |
|---|---|
| Opening, closing, section break | `title-slide` |
| Key message, narrative, bullets | `content-slide` |
| Comparison, before/after | `two-column-slide` |
| Q&A, objections, 4-part framing | `faq-grid-slide` |
| Key metrics, facts & figures | `stats-slide` |
| Phased roadmap (3–5 phases) | `timeline-slide` |
| Capability maturity progression | `maturity-model-slide` |
| 3-up feature/capability cards | `features-grid-slide` |
| Numbered sequential steps | `process-steps-slide` |
| 2×2 numbered components | `quad-grid-slide` |

**PLACEMAT MODE layouts** (dense, self-contained reference):
| Request type | Layout |
|---|---|
| Dense offering overview + sidebar | `placemat-body-sidebar` |
| Multi-solution comparison table | `placemat-solutions-grid` |
| Overview + 3 strategic drivers | `placemat-why-built` |
| ROM one-pager (scope/benefits/estimate) | `rom-slide` |

## Orchestration Examples

### Full Presenter Deck from Source Doc

**Request:** "Create a 10-slide executive presentation from my context document"

**Orchestration:**
1. Collect pre-flight: classification, design involvement, output location, presentation style
2. Read the source document
3. Invoke `create-presentation` with style=presenter
4. Skill generates HTML, confirm output file location

### Reference Placemat

**Request:** "Create a placemat reference doc about our GenAI portfolio for the CTO"

**Orchestration:**
1. Collect pre-flight questions
2. Invoke `create-presentation` with style=placemat
3. Use `placemat-body-sidebar` for offering overviews, `placemat-solutions-grid` for comparisons, `placemat-why-built` for strategic rationale
4. Confirm output as `[slug]-reference-[YYYY-MM-DD].html`

### Presenter + Appendix

**Request:** "I want a 12-slide presenter deck with a few dense reference slides at the end"

**Orchestration:**
1. Recommend: "I'll create a Presenter + appendix deck — presenter slides first, then a 'Reference Material' divider, then placemat-style backup slides at the end. This is one file you can share."
2. Invoke `create-presentation` with style=mixed
3. Ensure appendix divider is a dark `title-slide` labeled "Reference Material"
4. Placemat slides use `.slide.placemat.light` (or `.dark`)

### Presentation Including a ROM

**Request:** "Create a presentation to introduce the golden path and include the ROM"

**Orchestration:**
1. Collect pre-flight questions
2. Read available source material and `rom-for-client.md`
3. Invoke `create-presentation` — plan context slides, value prop, timeline using presenter layouts
4. For the ROM content, use the `rom-slide` layout (single dense slide pulling from `rom-for-client.md`)
5. Place the ROM slide after a "Reference Material" divider if mixing with presenter slides

### ROM Slide from Client Report

**Request:** "Create a ROM slide from @rom-for-client.md"

**Orchestration:**
1. Invoke `create-slide` with layout: `rom-slide`, source: `rom-for-client.md`
2. Return the `<div class="slide placemat light">` block

### Convert Markdown to Word

**Request:** "Convert my overview.md to a Word document"

**Orchestration:**
1. Invoke `convert-to-word` with the source file
2. Skill checks pandoc, selects template, confirms output path, runs conversion
3. Report the output file and template used

### Add a Slide to Existing Deck

**Request:** "Add a teal-hero title slide called 'Governance & Production Selection' as slide 7"

**Orchestration:**
1. Invoke `create-slide` with layout: title-slide, theme: teal-hero, title and slide number
2. Return the `<div class="slide">` block for insertion

### Brand Compliance Fix

**Request:** "Apply brand guidelines to my old presentation"

**Orchestration:**
1. Invoke `apply-brand` with the target file
2. Skill audits and fixes violations
3. Report what was changed and the corrected file location

## What NOT to Do

- Don't generate presentations without reading `../../resources/brand-styles/brand-tokens.css` first
- Don't invent CSS variables or colors not in the brand token file
- Don't create slides without the structured footer (footer-classification + footer-center + slide-number)
- Don't omit `boozallen.com` or `© 2026 Booz Allen Hamilton, Inc.` from any slide footer
- Don't omit the classification badge from any slide when the deck is Entrusted, Internal, or Restricted
- Don't use legacy `<div class="brand-mark">` — it is replaced by the footer-center content
- Don't use `teal-hero` for content-heavy slides — only for titles and section dividers
- Don't use `teal-hero` on placemat slides — only `light` or `dark`
- Don't omit the `.placemat` class on placemat-mode slides
- Don't interleave placemat slides mid-presenter-deck — always at the end in the appendix
- Don't assume an output file path — always confirm with the user

- Don't route to `create-react-presentation` without asking the format question first, unless the request explicitly mentions React, animation, or interactivity
- Don't suggest PDF export for React presentations — it is not supported
- Don't skip the format question when intent is ambiguous — most users won't know to ask for React by name

Remember: The role is to **orchestrate** — invoke the right skill for the task, not to generate the HTML directly.