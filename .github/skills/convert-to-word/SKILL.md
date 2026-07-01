---
name: presentation-builder:convert-to-word
description: Convert a Markdown document to a branded Word (.docx) file using
  BAH templates and pandoc. Triggered by phrases like "convert this md to Word",
  "export as Word doc", "generate a Word document from", "make a docx from".
---

# Convert Markdown to Word Document

## Purpose

Convert a Markdown file into a professionally formatted Word document using one of the Booz Allen Hamilton `.dotx` reference templates and pandoc.

## Prerequisites

- **pandoc >= 3.0** must be installed on the system.
  - macOS: `brew install pandoc`
  - Other: https://pandoc.org/installing.html
  - Verify: `pandoc --version`

If pandoc is not installed, inform the user and provide the install instructions above. Do not attempt conversion without it.

## Arguments

`$ARGUMENTS` — One or more of:
- Path to the source Markdown file (required)
- Template preference: `proposal`, `report`, or `fact-sheet` (optional)
- Output path or filename (optional)

## Process

### 1. Verify pandoc

Run `pandoc --version` to confirm it is available. If the command fails, stop and provide installation instructions from the Prerequisites section.

### 2. Read the Source File

Read the Markdown file specified in $ARGUMENTS. Understand its structure and content to inform template selection.

### 3. Select the Template

Three BAH Word templates are available:

| Template | File | Best for |
|----------|------|----------|
| **Proposal** | `../../resources/templates/ms-word/Proposal_US.dotx` | Formal, detailed documents with multiple sections — proposals, SOWs, technical volumes |
| **Report** | `../../resources/templates/ms-word/Report_US.dotx` | Perspective pieces, analysis, findings, white papers |
| **Fact Sheet** | `../../resources/templates/ms-word/Fact Sheet_US.dotx` | Single-page summaries, one-pagers, capability briefs |

**Selection logic:**
1. If the user specified a template in $ARGUMENTS, use it.
2. Otherwise, infer from the document:
   - Long, multi-section documents with formal structure → Proposal
   - Analysis, findings, or perspective content → Report
   - Short summaries or single-page content → Fact Sheet
3. Present the suggested template to the user with a one-line reason, and ask them to confirm or choose a different one before proceeding.

### 4. Determine Output Path

- If the user specified an output path, use it.
- Otherwise, default to the same directory as the source file with a `.docx` extension.
- Filename convention: same base name as the source, e.g. `overview.md` -> `overview.docx`

Confirm the output path with the user before proceeding.

### 5. Run pandoc

Execute the conversion using the `--reference-doc` flag to apply the BAH template styling and `--lua-filter` for proper table widths:

```bash
pandoc "$SOURCE_MD" \
  --lua-filter="../../resources/filters/table-widths.lua" \
  --reference-doc="$TEMPLATE_PATH" \
  -o "$OUTPUT_DOCX"
```

Where:
- `$SOURCE_MD` is the path to the input Markdown file
- `$TEMPLATE_PATH` is the absolute path to the selected `.dotx` file from `../../resources/templates/ms-word/`
- `$OUTPUT_DOCX` is the confirmed output path

### 6. Confirm Output

After successful conversion, report:
- Output file path
- Template used
- Any pandoc warnings

## Error Handling

**pandoc not installed:**
```
pandoc is required for Word conversion but is not installed.

Install it with:
  brew install pandoc          (macOS)
  https://pandoc.org/installing.html  (other platforms)
```

**Source file not found:**
```
Cannot convert: the source file was not found at [path].
Please provide the path to an existing Markdown file.
```

**pandoc conversion fails:**
Report the full pandoc error output and suggest checking the Markdown for syntax issues that may not convert cleanly (e.g. raw HTML blocks, complex table structures).