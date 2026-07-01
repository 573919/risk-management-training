# GitHub Copilot's Presentation Builder

Create branded HTML slide decks, Word documents, and presentations using CivilTech / Booz Allen Hamilton brand guidelines.

## Quick Start

This activity generates branded slide presentations in two formats: self-contained `.html` decks (viewable in any browser, exportable to PDF) and animated React apps (deployed via GitHub Pages). It also produces branded `.docx` Word documents. Use the skills to create full presentations, individual slides, audit brand compliance, or convert Markdown to Word.

## How to Use

Ask Copilot using natural language prompts:

**To create a complete branded presentation**, ask Copilot:
> "Create a 10-slide executive presentation from @context.md using presentation-builder-instructions.md"

**To create an animated React presentation**, ask Copilot:
> "Create a React presentation with scroll-driven animations using presentation-builder-instructions.md"

**To add or modify individual slides**, ask Copilot:
> "Create a two-column slide comparing manual vs AI-assisted SDLC using presentation-builder-instructions.md"

**To fix branding on an existing deck**, ask Copilot:
> "Apply brand guidelines to @my-old-deck.html using presentation-builder-instructions.md"

**To convert Markdown to Word**, ask Copilot:
> "Convert this markdown to a branded Word document using presentation-builder-instructions.md"

**Files installed to `.github/`:**
- `presentation-builder-instructions.md` — Orchestrator for coordinating presentation workflows
- `skills/` — Skill definitions for presentation generation and brand compliance
- `copilot-instructions.md` — Merged quality rules for brand-consistent output
- `resources/` — Brand CSS, logos, visual patterns, slide engine JS, HTML layout templates, Word templates
- `presentation-builder-readme.md` — This file

## Installation

```bash
npx @civiltech/copilot-presentation-builder
```

### Manual (Git clone)

```bash
git clone git@github.boozallencsn.com:civiltech/ai-sdlc-kits.git
cp -r ai-sdlc-kits/kits/presentation-builder/copilot/* .github/
```

### Verifying Installation

After installation, confirm the skill files are in place:
```bash
ls .github/skills/create-presentation/SKILL.md
```

Then ask Copilot: "Create a presentation about [topic] using presentation-builder-instructions.md"

## Prerequisites

- **pandoc >= 3.0** — required for the `convert-to-word` skill. Install with `brew install pandoc` (macOS) or see [pandoc.org/installing](https://pandoc.org/installing.html). Not needed for HTML slide generation.

## Available Skills

| Skill | Purpose |
|-------|---------|
| **create-presentation** | Generate a complete branded HTML slide deck from a topic or source document |
| **create-react-presentation** | Generate an animated React presentation with scroll-driven parallax and fade-in effects |
| **create-slide** | Generate a single slide using a specified layout |
| **apply-brand** | Audit an existing HTML presentation and fix brand violations |
| **convert-to-word** | Convert a Markdown document to a branded Word (.docx) using BAH templates *(requires pandoc)* |
| **publish-presentation** | Deploy an HTML or React presentation to GitHub Pages |

### Skill Triggers

| Say This | Skill Invoked |
|----------|---------------|
| "Create a presentation about X" / "Build a deck from @notes.md" | `create-presentation` |
| "Create a React presentation" / "I want animations in my deck" | `create-react-presentation` |
| "Add a slide" / "Make a two-column slide comparing X vs Y" | `create-slide` |
| "Apply brand guidelines" / "Fix the branding on @deck.html" | `apply-brand` |
| "Convert this markdown to Word" / "Export as docx" | `convert-to-word` |
| "Publish this presentation" / "Deploy to GitHub Pages" | `publish-presentation` |

## End-to-End Flow

**HTML deck:**
```
source material (topic, @context.md, rom-for-client.md)
                ↓
          create-presentation → presentation.html
                ↓
          apply-brand (audit & fix)
                ↓
          create-slide (add/replace individual slides)
                ↓
          publish-presentation → live on GitHub Pages
```

**React presentation:**
```
source material (topic, @context.md)
                ↓
          create-react-presentation → spec → sections.tsx → npm run dev
                ↓
          publish-presentation → GitHub Actions builds + deploys → live on GitHub Pages
```

**Word document:**
```
Markdown source → convert-to-word → document.docx
```

Skills can be used independently or chained.

## Presentation Styles

| Style | Description | Slides |
|-------|-------------|--------|
| **Presenter deck** *(default)* | Sparse, whitespace-heavy for spoken narrative | 8-25 |
| **Reference placemat** | Dense, self-contained reference material | 15-35 |
| **Presenter + appendix** | Presenter slides + reference appendix in one file | 13-40 |
| **Two separate files** | `-deck.html` + `-reference.html` | Both |

## Available Layouts

### Presenter Mode (sparse)

| Layout | Best For |
|--------|----------|
| `title-slide` | Opening, closing, section dividers |
| `content-slide` | Narrative, bullet points, quotes |
| `two-column-slide` | Comparisons, before/after |
| `faq-grid-slide` | Q&A, objections, 4-part framing |
| `stats-slide` | Key metrics, big numbers |
| `timeline-slide` | Phased approach, roadmap |
| `maturity-model-slide` | 4-level capability progression |
| `features-grid-slide` | 3-up icon+title+text cards |
| `process-steps-slide` | Numbered sequential steps |
| `quad-grid-slide` | 2x2 numbered components |

### Placemat Mode (dense)

| Layout | Best For |
|--------|----------|
| `placemat-body-sidebar` | Prose body + resources sidebar |
| `placemat-solutions-grid` | Multi-solution comparison table |
| `placemat-why-built` | Overview + 3 strategic drivers |
| `rom-slide` | ROM one-pager (3-column: scope/benefits/estimate) |

## ROM Integration

When source material includes a `rom-for-client.md` (produced by the ROM builder kit), the `rom-slide` layout presents the full ROM one-pager as a single dense slide within a deck. Use it in the placemat/appendix section of a mixed presentation or as a standalone reference slide.

Example prompt: "Create a ROM slide from @rom-for-client.md using presentation-builder-instructions.md"

## PDF Export (HTML decks only)

Generated HTML decks include print CSS. To export as PDF:

1. Open the `.html` file in a browser
2. **Cmd+P** (macOS) or **Ctrl+P** (Windows/Linux)
3. Select "Save as PDF", set Landscape orientation, margins to None

React presentations do not support PDF export — animations are incompatible with static capture. Use `create-presentation` (HTML) if PDF output is required.

## Workflow

1. **Pre-flight** — Collect data classification, design involvement, output path, style
2. **Plan** — Design slide sequence and layout choices
3. **Generate** — Read brand resources, produce self-contained HTML
4. **Deliver** — Write file, confirm location, summarize decisions

## Components

### Resources
- `resources/brand-styles/brand-tokens.css` — Color palette, typography, layout classes, print CSS
- `resources/slide-engine.js` — Keyboard/click navigation script
- `resources/logos/` — Approved BAH wordmark SVGs and PNGs
- `resources/visual-patterns/` — Decorative SVG patterns and organic forms
- `resources/templates/slides/` — 14 HTML slide layout templates
- `resources/templates/ms-word/` — 3 BAH `.dotx` Word templates (Proposal, Report, Fact Sheet)

## Publish to GitHub Pages

Both HTML and React presentations can be published to GitHub Pages via the `publish-presentation` skill.

### How it works

Ask Copilot: "Publish this presentation using presentation-builder-instructions.md" or "Deploy to GitHub Pages using presentation-builder-instructions.md".

The skill:
1. Sets up a GitHub Actions workflow in your repo (one-time, automatic)
2. Registers the presentation for deployment
3. Commits and pushes to GitHub
4. Actions builds and deploys — your site is live in ~1-2 minutes

### First-time setup (one-time per repo)

After the first push, Actions creates a `gh-pages` branch. You then need to tell GitHub to serve Pages from it:

1. **Wait** for the Actions run to complete (check the Actions tab)
2. Go to **Settings → Pages**
3. Set Source to branch **`gh-pages`**, folder **`/ (root)`**
4. Click Save

You only do this once. All future publishes are automatic on push.

### Publishing again

No need to run the skill again. Edit your presentation, commit, and push. The workflow detects the changed files and redeploys automatically.

### Multiple presentations

Each time you run `publish-presentation` for a new presentation, the skill registers it alongside existing ones. Each presentation gets its own URL:

```
https://<org>.github.io/<repo>/<slug>/           # GitHub.com
https://pages.<host>/<org>/<repo>/<slug>/        # GHES
```

### Branch deploys (preview)

Pushing from a non-`main` branch deploys to a preview URL:
```
https://<pages-host>/<org>/<repo>/preview/<branch-slug>/<slug>/
```
Merging to `main` promotes to the production URL.

## Secondary Logo Support

Both HTML and React presentations support an optional secondary/client logo displayed in the footer alongside the Booz Allen branding.

During pre-flight setup, you'll be asked: "Is there a secondary logo to display alongside Booz Allen?"

- If yes: provide light and dark variants of the logo file
- The logo appears in the footer-left zone alongside an optional display name
- The BAH copyright remains in the footer-center on every slide

For React presentations, logo files are copied to `public/logos/`. For HTML decks, logos are base64-encoded inline.

## Showcase

Open `resources/showcase.html` in a browser to see a visual gallery of all available:
- Logo variants and their color context rules
- Visual patterns and organic forms
- Slide layout types (presenter and placemat)
- Chrome elements (breadcrumb nav, footer, classification badges)
- Color palette swatches
- Gradient title treatments on light and dark backgrounds