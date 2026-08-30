import { allSlots, pages } from "@/data";
import { positioning, shortDefinition, locked } from "@/data/positioning";
import { pages as diagPages, gaps } from "@/data/diagnostic";
import { cards } from "@/data/cards";
import { recs, confirms } from "@/data/recs";
import { runChecks } from "./checks";

export function buildMarkdown() {
  const lines: string[] = [];
  const w = (s: string) => lines.push(s);

  w("# DAP copy deck");
  w("");
  w("Site messaging rewrite for Dartmouth Advisory Partners.");
  w("Audited against the live site on 28 August 2026.");
  w("Prepared for Brendan Sibeth, founder and managing partner.");
  w("");
  w("Layout, page order, demos, animation, film, fonts and palette stay as they are. This deck changes words, not boxes.");
  w("");

  w("## Part 1. Diagnostic");
  w("");
  for (const p of diagPages) {
    w(`### ${p.n} ${p.name} (${p.path})`);
    w("");
    w("After the first screen, a first-time CIO **can**:");
    w("");
    for (const c of p.can) w(`- ${c}`);
    w("");
    w("They **cannot**:");
    w("");
    for (const c of p.cannot) w(`- ${c}`);
    w("");
  }
  w("### Five gaps, ranked");
  w("");
  for (const g of gaps) {
    w(`**${g.n}. ${g.title}** ${g.body}`);
    w("");
  }

  w("## Part 2. Positioning core");
  w("");
  w(`Short form: ${shortDefinition}`);
  w("");
  for (const p of positioning) {
    w(`**${p.k}.** ${p.s}`);
    w("");
  }
  w("Locked language, keep verbatim:");
  w("");
  w(`- Tagline: ${locked.tagline}`);
  w(`- Category: ${locked.category}`);
  w(`- ${locked.models}`);
  w(`- ${locked.attested}`);
  w(`- CTA: ${locked.cta}`);
  w("");

  w("## Part 3. Copy deck");
  w("");
  for (const page of pages) {
    w(`### ${page}`);
    w("");
    for (const s of allSlots.filter((x) => x.page === page)) {
      w(`#### ${s.slot}`);
      w("");
      w(`Shape: ${s.shape}`);
      w("");
      w(`CURRENT: ${s.current}`);
      w("");
      w(`NEW: ${s.next}`);
      w("");
      if (s.alts) {
        for (const a of s.alts) {
          w(`ALTERNATE ${a.rank}: ${a.text}`);
          w("");
          w(`WHY (alt ${a.rank}): ${a.why}`);
          w("");
        }
      }
      w(`WHY: ${s.why}`);
      w("");
      const flags = [
        s.locked ? "locked" : "",
        s.recommendedNew ? "recommended new slot" : "",
        s.confirm ? "CONFIRM" : "",
      ].filter(Boolean);
      if (flags.length) {
        w(`Flags: ${flags.join(", ")}`);
        w("");
      }
    }
  }

  w("## Part 4. Product and service cards");
  w("");
  for (const c of cards) {
    w(`### ${c.name}`);
    w("");
    w(`- Category label: ${c.category}`);
    w(`- What it is: ${c.what}`);
    w(`- What it does for you: ${c.does}`);
    w(`- Who buys it: ${c.who}`);
    w(`- Status: ${c.status}`);
    w(`- How you get it: ${c.how}`);
    w("");
  }

  w("## Part 5. Recommendations outside the copy");
  w("");
  w("### Slots to add, remove or reorder");
  w("");
  for (const r of recs) {
    w(`- **${r.action}** · ${r.where}. ${r.line} Reason: ${r.reason}`);
  }
  w("");
  w("### CONFIRM, founder decisions");
  w("");
  confirms.forEach((c, i) => {
    w(`${i + 1}. ${c}`);
  });
  w("");

  w("## Part 6. Self-check");
  w("");
  for (const c of runChecks()) {
    w(`- ${c.ok ? "PASS" : "FAIL"} ${c.label}. ${c.detail}`);
  }
  w("");

  return lines.join("\n");
}
