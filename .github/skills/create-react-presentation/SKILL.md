---
name: presentation-builder:create-react-presentation
description: Generate an animated React presentation with scroll-driven parallax
  and fade-in effects. Triggered by phrases like "create a React presentation",
  "build an interactive deck", "I want animation in my presentation", "make
  slides with animations". Takes a topic or source document and guides the user
  through spec → sections.tsx generation. No React knowledge required.
---

# React Presentation Builder

## Quick Start

Generate animated React presentations with scroll-driven parallax and fade-in effects. Takes a topic or source document and guides you through spec → sections.tsx generation. No React knowledge required.

## How to Use

Ask Copilot using natural language prompts:

**To create a new React presentation**, ask Copilot:
> "Create a React presentation about [topic] for [audience] using presentation-builder-instructions.md"

**To build from existing content**, ask Copilot:
> "Build an interactive presentation deck from @context.md using presentation-builder-instructions.md"

**To regenerate after editing the spec**, ask Copilot:
> "Rebuild the presentation from spec using presentation-builder-instructions.md"

**To add diagrams to your presentation**, ask Copilot:
> "Add interactive diagrams to my presentation using presentation-builder-instructions.md"

**Files installed to `.github/`:**
- `presentation-builder-instructions.md` - Orchestrator for coordinating the presentation workflow
- `presentation-builder-readme.md` - This file

Note: PDF export is not supported for React presentations — the animations are fundamentally at odds with static capture. For PDF output, use the HTML deck builder instead.

---

## Workflow Overview

1. **Pre-flight Setup** — Collect data classification, design involvement level, output location, diagram preferences, and secondary logo
2. **First-Run Setup** — Copy React shell template and run npm install
3. **Build the Spec** — Create or walk through the presentation specification
4. **Generate sections.tsx** — Transform spec into React components
5. **Preview** — Run the dev server and view in browser
6. **Optional Publish** — Deploy to GitHub Pages

---

## Reference

### Write Scope

**ONLY write files inside `<output-location>/`.**

Writable paths:
- `<output-location>/react-shell/**`
- `<output-location>/[slug]-spec.md`

All other files and directories are read-only.

### Slug Rules

When deriving a slug from the presentation title:
- Lowercase all characters
- Replace spaces and special characters with hyphens
- Remove leading/trailing hyphens
- Example: `"AI Transformation Roadmap"` → `"ai-transformation-roadmap"`

### Slide Variants

| Variant | Visual | Use for |
|---------|--------|---------|
| `hero` | Teal background with Ripple SVG pattern, white title and subtitle, centered | Title / opening slide |
| `dark` | Dark blue-gray (#0d1117) background | Emphasis, closing slide |
| `accent` | Light teal-tinted background | Key points |
| `break` | Teal background, centered white text | Section dividers |
| `default` | White background | Standard content |

### Slide Count Guidance

- Executive brief: 8–12 slides
- Full briefing: 12–18 slides
- Deep dive: 18–25 slides

### Diagram Options

| Option | Notes |
|--------|-------|
| `none` | No diagram |
| `mermaid` | Mermaid diagram — adds dependency and generates syntax |
| `react-flow` | Interactive animated diagram — requires react-flow-diagram kit |