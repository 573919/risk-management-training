---
name: presentation-builder:create-presentation
description: Generate a complete branded HTML slide deck. Triggered by phrases
  like "create a presentation", "build a deck", "make slides about", "generate a
  presentation from". Takes a topic or source document and produces a single
  self-contained HTML file using CivilTech/BAH brand guidelines.
---

# Presentation Builder

## Quick Start

Generate complete, branded HTML slide decks using CivilTech / Booz Allen Hamilton brand guidelines. Produces a single self-contained `.html` file viewable in any browser and printable to PDF.

## How to Use

Ask Copilot using natural language prompts:

**To create a presentation from a topic**, ask Copilot:
> "Create a presentation about AI adoption for federal agencies using presentation-builder-instructions.md for an executive audience"

**To build a deck from source material**, ask Copilot:
> "Build a slide deck from @context.md using presentation-builder-instructions.md with 12 slides for a technical audience"

**To generate a reference placemat**, ask Copilot:
> "Generate a reference placemat document using presentation-builder-instructions.md for the AI services offering"

**To create a presenter deck with appendix**, ask Copilot:
> "Create a presenter deck with reference appendix using presentation-builder-instructions.md about cloud migration"

**Files installed to `.github/`:**
- `presentation-builder-instructions.md` - Main guidance for presentation generation
- `presentation-builder-readme.md` - This file

Note: Reference the instructions file in prompts for complete presentation building workflows.

---

## Reference

### What This Creates

A single self-contained HTML file with:
- CivilTech/BAH brand-compliant styling
- Keyboard and click navigation
- Print-to-PDF support (Cmd+P / Ctrl+P → Save as PDF, Landscape, No margins)
- Multiple slide layout types for various content needs

### Supported Arguments

When requesting a presentation, you can specify:
- A topic or title (e.g., "AI adoption for federal agencies")
- A source file to base content on (e.g., `@context.md`, `@notes.md`)
- Audience specification (e.g., "for executives", "for a technical audience")
- Slide count (e.g., "10 slides", "12-15 slides")
- Theme preference for title slide (e.g., "teal-hero title", "dark opener")
- Style preference (e.g., "presenter deck", "placemat", "with reference appendix")

### Presentation Styles

| Style | Description |
|-------|-------------|
| **Presenter deck** | Sparse slides supporting spoken narrative. 8–25 slides. |
| **Reference placemat** | Dense, self-contained reference document. 15–35 slides. |
| **Presenter + appendix** | Main presenter slides followed by placemat reference section. |
| **Two separate files** | Independent presenter deck and companion placemat document. |

### Available Slide Layouts

**Presenter layouts:** title-slide, content-slide, two-column-slide, faq-grid-slide, stats-slide, timeline-slide, maturity-model-slide, features-grid-slide, process-steps-slide, quad-grid-slide

**Placemat layouts:** placemat-body-sidebar, placemat-solutions-grid, placemat-why-built, rom-slide