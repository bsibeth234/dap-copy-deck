# Claude Code handoff: launch the visual DAP site

Paste this whole file as the first message in a Claude Code session opened in the `dap-solutions-site` repo. It stands alone. Do not wait for a second prompt.

Founder: Brendan Sibeth. Mail: bsibeth@dap.solutions. Firm: Dartmouth Advisory Partners, Toronto. Founded January 2025.

## Goal

Replace the current public site at dap.solutions with the visual rewrite. Apple-style top bar. Product lineup on Home. Click to expand. Film in the hero. Small type. Almost no copy until the prospect asks. Bellwether is not the centrepiece. It is a feature of Overture.

The rewrite already exists as a mock. Do not invent a third design. Port it into this repo, keep every deep route and asset that already ships, preview on Vercel, then stop.

## Definition of done

A Vercel preview URL on a branch of `bsibeth234/dap-solutions-site` where:

1. Home, How, Papers, and About match the mock in `bsibeth234/dap-copy-deck` (stills in `screenshots/share/`).
2. Nav is Products, How, Papers, About, and Build. No Try. No Copy deck. No left rail. No numbered sheets.
3. Bellwether appears only inside the Overture product panel, as the change feed that keeps Overture jurisdictionally aware, with Open Bellwether pointing at https://bellwether.dap.solutions.
4. Every existing public URL in `vercel.json` still resolves (200 after redirects). `/aa-1`, `/standard`, `/documents`, `/documents/*`, gated PDFs, `llms.txt`, `llms-full.txt` still work.
5. `scripts/accept.mjs` (updated for this IA) passes with zero fails.
6. Production is NOT promoted. Brendan promotes it himself.

## Inputs

Read these, in this order:

1. This file.
2. Visual mock, public: https://github.com/bsibeth234/dap-copy-deck
   - `src/components/site/Shell.tsx`, `Lineup.tsx`, `Accordion.tsx`, `CompilerDemo.tsx`, `viz.tsx`, `Expand.tsx`
   - `src/routes/index.tsx`, `how-it-works.tsx`, `documents.tsx`, `about.tsx`
   - `src/styles.css` (`@layer components` from `.site` down)
   - `screenshots/share/` stills
   - `public/film/*.mp4` if you need extra loops. Production already has `public/film.mp4` and `public/sh4pe.mp4`. Prefer those. Do not delete them.
3. Live production: https://dap.solutions (what you are replacing, not the target look).
4. Live Bellwether: https://bellwether.dap.solutions (do not rebuild it).
5. Prior handoff in this repo: `handoff/DAP-claude-code-handoff-v3.md`. That v3 seven-sheet sidebar is SUPERSEDED. Keep its hard rules on dashes, spelling, assets, and no-prod-promote. Ignore its nav, sheet count, and Bellwether-as-proof-on-Documents.

When the mock and v3 disagree on look or IA, the mock wins. When they disagree on production safety (assets, gated papers, redirects, no invented clients), v3 and this file win.

## Hard rules

- No em dashes or en dashes anywhere: copy, code, comments, commit messages. Commas, colons, periods, parentheses.
- Canadian spelling. Sentence case in running text.
- Do not touch `film.mp4`, `sh4pe.mp4`, `sh4pe-poster.jpg`, the PDFs in `public/docs/`, `public/documents/`, `content/`, or `public/standard/` except to keep serving them.
- Do not delete any demo, Three.js scene, request-document gate, or paper page. They move behind a click. They are not removed.
- No client names. No accuracy, fidelity, or performance figures.
- No public status labels. The mock still has "Built and demonstrated CONFIRM" on product cards. Strip those from the public site. Do not invent replacements.
- Locked, verbatim:
  - Policy compiles. Governance executes. Context compounds.
  - The context layer for institutional intelligence.
  - Build Your Context Layer
  - Models propose. Humans ratify.
  - mailto:bsibeth@dap.solutions?subject=Build%20Your%20Context%20Layer
- Palette stays: graphite `#15171a`, cream `#ece8df`, vermilion `#d8412f`. Archivo, Hanken Grotesk, JetBrains Mono.
- Prefer cutting words over adding them.
- Do not copy `/deck`, copy-deck data files, or Grok PWA chrome into the public site.
- Do not run `vercel --prod`. Do not merge to main. Do not change domains.

## What the public site is (after launch)

Nav, left to right: Products (`/#products`), How (`/how-it-works`), Papers (`/documents`), About (`/about`). Right: Build (the mailto).

| Route | What the prospect sees |
|---|---|
| `/` | Film. Tagline only. How it works · Products. Lineup: Overture, Resolve Exchange, sh4pe, DAP Racing, Falcon, DAP Standard. Click a product for the rest. Offers accordion: Readiness assessment, Embedded Context Architect. End CTA. |
| `/how-it-works` | Four chapters: How you decide. Clause becomes check. The live check. Signed decision record. Then the compiler / compile-a-decision demo already in this repo. |
| `/documents` | Paper titles. Click for one line and Open. Keep the existing paper routes and the request-document gate. |
| `/about` | Film. H1 Dartmouth Advisory Partners. Accordion: Who we are, What we do, Why it exists, About the founder. Copy is in the mock `src/routes/about.tsx`, verbatim. LinkedIn: https://www.linkedin.com/in/bsibeth/ |

Overture expand must include a Feature block:

> Bellwether. The change feed that keeps Overture jurisdictionally aware. OSFI, OSC, SEC, FINRA, CFTC, FCA, ESMA and EBA. No account. Open Bellwether · Brief · Manual.

Brief and Manual already live at `/docs/overture.pdf` and `/docs/overture-operator-manual.pdf`.

Do not put Try in the nav. Do not put Try Bellwether on the home hero. Do not list Bellwether as a product tile. Do not list Bellwether as a paper row.

## Step 0: verify state before building

1. `git status`, `git log --oneline -15`, `cat .vercel/project.json`. Confirm `projectId` is `prj_lBy60u2PwskcysLRSlirCxVAP2qT` (team `team_F2VXhczsuq945ktCdDb9wSeE`). If not, stop and report.
2. `vercel whoami`. If not logged in, stop and ask Brendan.
3. Map `src/routes/**` and `vercel.json`. Report the live route list.
4. Clone or fetch `bsibeth234/dap-copy-deck` (public). Confirm you can open `src/routes/index.tsx` and `screenshots/share/home.png`.
5. Confirm the email-gated paper route still signs URLs. Do not break it.
6. Confirm `public/film.mp4` and `public/sh4pe.mp4` exist and are not modified.
7. If anything contradicts this prompt, STOP and report before building.

## Step 1: port the mock into this repo

Branch: `v4-visual-site`.

Port look and IA from dap-copy-deck into this TanStack Start app. Do not replace the whole repo with the Grok sandbox. This repo is the ship target.

Carry across, adapted to this tree:

- Top shell from the mock. Drop Try. Keep Build.
- Home lineup and offers.
- How chapters. Keep `src/components/compile-a-decision.tsx` (or the current compiler demo) on How, behind the chapters, not as the first screen.
- Papers index as accordion titles. Keep `src/routes/documents/*` article pages, AA-1, Standard.
- About accordion with the four blocks from the mock, verbatim.
- Accordion interaction: one open at a time, chevron, body hidden until click.

Preserve and re-home (do not delete):

- Overture runtime, Resolve runtime, sh4pe video, Falcon/Standard visuals: show them in the matching product expand panel.
- Living Policy demo: How, chapter "Clause becomes check" or Open detail there.
- Request document modal and gated PDFs.
- `/aa-1`, `/standard`, paper HTML/PDF, `public/llms.txt`, `public/llms-full.txt`.
- Favicons and `og.jpg`. Update OG copy to the tagline if it still says something else.

Regenerate `llms.txt` / `llms-full.txt` from the new visible copy.

## Step 2: redirects

Keep every existing `vercel.json` redirect working. Update only these destinations so they match the new IA:

| Source | New destination |
|---|---|
| `/built` | `/#products` |
| `/sockets` | `/#products` |
| `/runtimes` | `/#products` |
| `/runtimes/:slug` | `/#products` |
| `/chest` | `/#products` |
| `/platform` | `/#products` |
| `/living-policy` | `/how-it-works` |
| `/outcomes` | `/how-it-works` |
| `/canadian-pension-plans` | `/how-it-works` |
| `/enforcement-vs-monitoring` | `/how-it-works` |
| `/policy-as-code` | `/how-it-works` |
| `/embedded-architect` | `/#products` (Offers). You may keep a thin page that scrolls to Offers instead. |
| `/engage` | same as embedded-architect |
| `/advisory` | same |
| `/start` | same |
| `/fractional-ai-partner` | same |
| `/bellwether` | `https://bellwether.dap.solutions` (external, permanent) |

Leave `/aa-1`, `/documents`, `/documents/*`, `/standard`, `/home` → `/`.

`/proof` and `/evidence` → `/how-it-works` (drop `#approve` if that anchor is gone; add `id="approve"` on the compiler demo if it is easy).

## Step 3: acceptance script

Update `scripts/accept.mjs` to take a base URL. PASS or FAIL each. Non-zero exit on any fail.

1. `/` h1, whitespace collapsed, is exactly "Policy compiles. Governance executes. Context compounds."
2. `/` does not contain the word "Try" in the header.
3. `/` does not contain "Copy deck".
4. `/` product names include Overture, Resolve Exchange, sh4pe, DAP Racing, Falcon, DAP Standard.
5. `/` does not list Bellwether as a product tile (the word may appear only after Overture is expanded, or not in the default HTML).
6. `/about` contains "Who we are", "What we do", "Why it exists", "About the founder".
7. `/about` contains "Founded January 2025" and "Brendan Sibeth".
8. `/documents` contains "Models are commodities.", "Discovery is the bottleneck", "Living Policy Architecture", "AA-1".
9. `/how-it-works` contains "Classification" or "Clause becomes check", and "Models propose. Humans ratify."
10. Every nav route returns 200. Every redirect in Step 2 returns 200 after follow.
11. `/aa-1` returns 200. `/standard` returns 200.
12. No route body contains U+2014 or U+2013.
13. No route contains, as whole words, case-insensitive: unlock, unleash, empower, supercharge, seamless, cutting-edge, next-gen, best-in-class, exciting, thrilled, passionate, journey, ecosystem, synergy.
14. `/` references a film (`film.mp4` or `/film/home.mp4`).
15. Primary CTA string "Build Your Context Layer" appears on `/`.

## Step 4: preview, verify, stop

1. `vercel` preview. Never `--prod`. Capture the URL.
2. `node scripts/accept.mjs <preview-url>`. Fix and redeploy until zero fails.
3. Headless screenshots at 1280 and 390 of `/`, `/how-it-works`, `/documents`, `/about`, plus Home with Overture open. Save to `audit/screens/v4/`.
4. Commit on `v4-visual-site`. Message: "Launch visual public site. Bellwether sits inside Overture."
5. Push the branch.

STOP. Do not merge. Do not `vercel --prod`. Do not edit custom domains.

## Report back (exact format)

- Preview URL:
- Branch and last commit hash:
- Step 0 findings:
- Acceptance: N of 15 pass (paste output)
- Components carried over (list) and components archived (list, with reasons):
- Redirects changed (table):
- Human steps needed:
- Screenshots path:

## Human steps (Brendan only)

1. `vercel login` if Step 0 asks for it.
2. Open the preview URL. Click Products, Overture, How, a paper, About the founder. Say go or name the change.
3. Promote: merge `v4-visual-site` to `main` (Vercel deploys production from main).
4. After promote, hit dap.solutions, www.dap.solutions, a paper URL, `/aa-1`, `/standard`, and https://bellwether.dap.solutions.
5. Optional: point compiler.dap.solutions at `/how-it-works`. Do not do this in this pass unless Brendan says so.

## Do not do

- Do not make Bellwether the home CTA.
- Do not restore the left numbered rail.
- Do not ship the copy deck.
- Do not invent clients, case studies, or metrics.
- Do not restyle to a second palette.
- Do not overwrite dap.solutions from `dap-copy-deck` by force-pushing that repo onto this one.
