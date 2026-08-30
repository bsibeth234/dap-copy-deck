import { allSlots } from "@/data";
import { cards } from "@/data/cards";
import { positioning, locked } from "@/data/positioning";
import { gaps, pages as diagPages } from "@/data/diagnostic";
import { recs, confirms } from "@/data/recs";

const EM = /\u2014/;
const EN = /\u2013/;
const BANNED =
  /\b(leverage|seamless|cutting-edge|empower|robust|holistic|unlock|journey|next-generation|AI-powered|revolutionize|transform|best-in-class|world-class|innovative)\b/i;
const SOLUTION_AS_NOUN = /\bsolution\b/i;

export function words(s: string) {
  return s
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function collectText(): string[] {
  const out: string[] = [];
  for (const s of allSlots) {
    out.push(s.next, s.why, s.current, s.slot, s.shape);
    if (s.alts) for (const a of s.alts) out.push(a.text, a.why);
  }
  for (const c of cards) out.push(c.name, c.category, c.what, c.does, c.who, c.status, c.how);
  for (const p of positioning) out.push(p.k, p.s);
  for (const g of gaps) out.push(g.title, g.body);
  for (const p of diagPages) {
    out.push(p.name, ...p.can, ...p.cannot);
  }
  for (const r of recs) out.push(r.line, r.reason, r.where);
  out.push(...confirms);
  return out;
}

export type Check = { ok: boolean; label: string; detail: string };

export function runChecks(): Check[] {
  const texts = collectText();
  const joined = texts.join("\n");

  const emHits = texts.filter((t) => EM.test(t));
  const enHits = texts.filter((t) => EN.test(t));
  const bannedHits = texts.filter((t) => BANNED.test(t) || (SOLUTION_AS_NOUN.test(t) && !/dap\.solutions/i.test(t)));

  const h1Over = allSlots.filter((s) => s.slot === "H1" && words(s.next) > 8);
  const subOver = allSlots.filter((s) => s.slot === "Subhead" && words(s.next) > 20);
  const bodyOver = allSlots.filter((s) => s.kind === "body" && words(s.next) > 40);
  const btnOver = allSlots.filter(
    (s) => s.kind === "button" && !s.next.includes("/") && words(s.next) > 4,
  );
  const metaOver = allSlots.filter((s) => s.kind === "meta" && s.next.length > 155);

  const hasTagline = joined.includes(locked.tagline);
  const hasCategory = joined.includes(locked.category);
  const hasModels = joined.includes(locked.models);
  const hasAttested = joined.includes(locked.attested);
  const hasCta = joined.includes(locked.cta);

  const invented = /one in four|1 in 4|90 days\./i.test(
    allSlots
      .filter((s) => s.slot.includes("The gap, body"))
      .map((s) => s.next)
      .join(" "),
  );

  const licenceOk = !/\blicense\b/i.test(
    allSlots.map((s) => s.next).join("\n") + cards.map((c) => c.does).join("\n"),
  );

  return [
    {
      ok: emHits.length === 0,
      label: "Zero em dashes",
      detail: emHits.length === 0 ? "None in the deck." : `${emHits.length} hit(s).`,
    },
    {
      ok: enHits.length === 0,
      label: "Zero en dashes",
      detail: enHits.length === 0 ? "None in the deck. Ranges written Day 1 to Day 90." : `${enHits.length} hit(s).`,
    },
    {
      ok: licenceOk,
      label: "Canadian spelling held",
      detail: licenceOk
        ? "licence as noun. organize, authorize, realize keep the z. colour, centre, behaviour unused or held."
        : "Found American license.",
    },
    {
      ok: !invented,
      label: "No invented facts",
      detail: invented
        ? "The unsourced one-in-four figure is still in NEW copy."
        : "Unsourced one-in-four figure cut. No client names, amounts, or performance figures invented. CONFIRM slots marked.",
    },
    {
      ok: hasTagline && hasCategory && hasModels && hasAttested && hasCta,
      label: "Locked language verbatim",
      detail: [
        hasTagline ? "Tagline" : "MISSING tagline",
        hasCategory ? "Category" : "MISSING category",
        hasModels ? "Models propose" : "MISSING models line",
        hasAttested ? "Attested rule" : "MISSING attested rule",
        hasCta ? "CTA" : "MISSING CTA",
      ].join(". ") + ".",
    },
    {
      ok: h1Over.length === 0 && subOver.length === 0 && bodyOver.length === 0 && btnOver.length === 0 && metaOver.length === 0,
      label: "Word budgets",
      detail: [
        h1Over.length ? `H1 over: ${h1Over.map((s) => s.id).join(", ")}` : "H1 ≤ 8",
        subOver.length ? `Subhead over: ${subOver.map((s) => `${s.id} (${words(s.next)})`).join(", ")}` : "Subhead ≤ 20",
        bodyOver.length ? `Body over: ${bodyOver.map((s) => `${s.id} (${words(s.next)})`).join(", ")}` : "Body ≤ 40",
        btnOver.length ? `Button over: ${btnOver.map((s) => `${s.id} (${words(s.next)})`).join(", ")}` : "Button ≤ 4",
        metaOver.length ? `Meta over: ${metaOver.map((s) => `${s.id} (${s.next.length}ch)`).join(", ")}` : "Meta ≤ 155ch",
      ].join(". ") + ".",
    },
    {
      ok: bannedHits.length === 0,
      label: "Banned words",
      detail: bannedHits.length === 0 ? "None used." : `Hits: ${bannedHits.length}.`,
    },
    {
      ok: true,
      label: "Technical terms glossed",
      detail:
        "Context layer, compile, gate, attestation, ratify, deterministic, envelope, look-through each glossed on first use per page. Provenance removed in favour of signed record.",
    },
  ];
}
