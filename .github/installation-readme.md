# GitHub Copilot's Presentation Builder

## Quick Start

The Presentation Builder helps you create professional presentations with consistent branding and formatting. Simply describe your topic and let Copilot generate a complete slide deck with proper structure, visual hierarchy, and brand compliance.

## How to Use

Ask Copilot using natural language prompts:

**To create a new presentation**, ask Copilot:
> "Create a 10-slide presentation about [your topic] using presentation-builder-instructions.md"

**To build a presentation with specific requirements**, ask Copilot:
> "Build a presentation covering [topic] with executive summary, key findings, and recommendations using presentation-builder-instructions.md"

**To export a presentation**, ask Copilot:
> "Export the current presentation to Word format using presentation-builder-instructions.md"

**Files installed to `.github/`:**
- `presentation-builder-instructions.md` - Orchestrator for coordinating presentation workflows
- `skills/` - Skill definitions for presentation creation
- `presentation-builder-readme.md` - This file

Note: When referencing skills in prompts, use the instructions file which coordinates them.

---

## Prerequisites

**Node.js + npm** (required for npx) - Required to access the internal Nexus npm registry and install the kit

**macOS:**
```bash
brew install node
```
No Homebrew? Install it first: [brew.sh](https://brew.sh)

**Windows:** Download the installer from [nodejs.org](https://nodejs.org)

Verify (either platform):
```bash
node --version    # v14+
npm --version     # 6+
```

**pandoc >= 3.0** *(optional — only needed for Word export)*
- macOS: `brew install pandoc`
- Windows/other: [pandoc.org/installing](https://pandoc.org/installing.html)

## Install

### Cursor, Cline, and Copilot

Open a terminal at your repository root, then run the following commands.

**Step 1 — Register the internal kit registry** *(one-time per machine, macOS and Windows):*
```bash
npm config set @civiltech:registry https://nexus.boozallencsn.com/repository/civiltech-npm-internal/
```

**Step 2 — Install the kit:**
```bash
npx @civiltech/copilot-presentation-builder
```

Installs skills, agents, rules, and brand resources into `.github/`.

Add `--global` to install for all projects: `npx @civiltech/copilot-presentation-builder --global`

## Verify Installation

**macOS/Linux:**
```bash
ls .github/skills/create-presentation/SKILL.md
```

**Windows:**
```powershell
dir .github\skills\create-presentation\SKILL.md
```

Having trouble? See [Troubleshooting](https://github.boozallencsn.com/civiltech/ai-sdlc-kits/tree/main/docs/troubleshooting.md)