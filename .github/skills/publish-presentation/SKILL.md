---
name: presentation-builder:publish-presentation
description: Deploy an HTML or React presentation to GitHub Pages. Triggered by
  phrases like "publish this presentation", "deploy to GitHub Pages", "put this
  on Pages", "publish my deck". Works for both HTML and React output from the
  presentation-builder kit.
---

# Publish Presentation Skill

Deploy an HTML or React presentation to GitHub Pages. Triggered by phrases like "publish this presentation", "deploy to GitHub Pages", "put this on Pages", "publish my deck". Works for both HTML and React output from the presentation-builder kit.

---

## Purpose

Publish a presentation to GitHub Pages via GitHub Actions. Handles both static HTML and React (Vite) presentations. On first run, writes the workflow file and deploy config to the user's repo. All subsequent publishes are automatic on push.

---

## Arguments

- `$ARGUMENTS` — path to the presentation to publish:
  - React: path to the `react-shell/` directory (e.g. `docs/react-shell`)
  - HTML: path to the `.html` file (e.g. `docs/my-deck-2026-04-08.html`)

If not provided, ask the user.

---

## Process

### Step 0: Identify the presentation

Determine type and slug from `$ARGUMENTS` or by asking.

**Type detection:**
- Path ends in `.html` → **static**
- Path is a directory containing `package.json` → **react**
- Unclear → ask: "Is this a React presentation (react-shell directory) or a static HTML file?"

**Slug:** derive from the directory name (React) or filename without extension and date suffix (HTML).
- `docs/react-shell` → slug from the spec file in `docs/` (e.g. `github-pages-react-research`)
- `docs/my-deck-2026-04-08.html` → `my-deck`
- Slug rules: lowercase, hyphens for spaces/special chars, no leading/trailing hyphens

**Confirm with the user:**
- Presentation type and path
- Slug (shown as the URL segment it will become)
- Repo root (directory containing `.git/`) — default to current working directory

---

### Step 1: Set up GitHub Actions workflow

Check if `.github/workflows/deploy-pages.yml` exists in the repo root.

**If it does not exist:**
- Copy `../../resources/github/workflows/deploy-pages.yml` → `.github/workflows/deploy-pages.yml`
- Set `first_deploy = true`

**If it already exists:** skip copy. Set `first_deploy = false`.

---

### Step 2: Create or update `deploy-config.yml`

Check if `deploy-config.yml` exists at the repo root.

**If it does not exist**, create it:

```yaml
# Presentation deployment configuration.
# Add entries here for each presentation you want to publish.
# Set deploy: true to include in the next deployment.

presentations:
  <slug>:
    <per-type fields>
```

**If it already exists**, read it and add or update the entry for `<slug>`. Do not modify other entries.

**Entry format by type:**

React:
```yaml
  <slug>:
    type: react
    path: <relative path to react-shell directory>
    package_manager: npm
    node_version: <read from react-shell/.nvmrc, default 20>
    deploy: true
```

Static HTML:
```yaml
  <slug>:
    type: static
    path: <relative path to directory containing the HTML file>
    entry: <html filename>
    deploy: true
```

**Node version:** read from `<react-shell-path>/.nvmrc`. If not found, use `20`.

---

### Step 3: Commit and push

Derive org, repo, and host from the git remote before committing:
```bash
git remote get-url origin
```
Parse from both HTTPS (`https://host/org/repo.git`) and SSH (`git@host:org/repo.git`) formats.

Stage the following files:
- `.github/workflows/deploy-pages.yml` (if newly written)
- `deploy-config.yml`
- The presentation source:
  - React: `<react-shell-path>/` (node_modules excluded by .gitignore)
  - HTML: the `.html` file

Commit message:
- First deploy: `"publish: add GitHub Pages workflow and deploy <slug>"`
- Subsequent: `"publish: deploy <slug>"`

Push to the current branch.

⛔ If push fails (auth, upstream not set, etc.) — show the error and tell the user:
> "The push failed. Can you copy the error above and let me know?"
Do not retry automatically.

---

### Step 4: First-time Pages setup

If `first_deploy = true`, tell the user:

> **One-time setup required — two steps:**
>
> **Step 1 — Wait for the Actions run to finish.**
> The workflow is creating your `gh-pages` branch now. Check progress here:
> `https://<host>/<org>/<repo>/actions`
>
> Wait until the run shows a green checkmark before continuing.
>
> **Step 2 — Enable GitHub Pages.**
> Once Actions is done, go to:
> `https://<host>/<org>/<repo>/settings/pages`
>
> Under **Source**, select branch: **gh-pages**, folder: **/ (root)**. Click Save.
>
> You only need to do this once. All future publishes are automatic.

Substitute `<host>`, `<org>`, `<repo>` from the parsed remote URL.

If `first_deploy = false`, skip this step.

---

### Step 5: Output

Determine the Pages URL from the remote:
- GitHub.com (`host == github.com`): `https://<org>.github.io/<repo>/`
- GHES (any other host): `https://pages.<host>/<org>/<repo>/`

For branch deploys (not `main`), append `preview/<branch-slug>/` before the presentation slug.

Tell the user:

```
**Pushed. GitHub Actions is building your presentation now (~1-2 minutes).**

- Actions: https://<host>/<org>/<repo>/actions
- Expected URL (once live): https://<pages-host>/<org>/<repo>/[preview/<branch>/]<slug>/

To publish changes in future: edit your presentation and push — no need to run this skill again.
```

---

## Notes

**`deploy-config.yml` and multiple presentations:**
The config supports multiple entries. The skill adds one entry per invocation. Existing entries are preserved. A presentation is only built on push if its files changed — or if `deploy-config.yml` itself changed.

**Re-publishing after content changes:**
No need to re-run the skill. Edit the presentation, commit, and push. The workflow picks up the change automatically because the presentation's files changed.

**Disabling a presentation:**
Set `deploy: false` in `deploy-config.yml` for that entry. It will be skipped on the next push.

**GHES users:**
Pages URL format differs: `https://pages.github.boozallencsn.com/<org>/<repo>/<slug>/`. The workflow uses `$GITHUB_REPOSITORY` for base path, which is correct for both GitHub.com and GHES. Artifact actions are pinned to v3 for GHES compatibility.