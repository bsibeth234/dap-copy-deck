import { useMemo, useState } from "react";
import { Download, Check, Copy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { allSlots, pages as pageNames } from "@/data";
import { pages as diagPages, gaps } from "@/data/diagnostic";
import { positioning, shortDefinition, locked } from "@/data/positioning";
import { cards } from "@/data/cards";
import { recs, confirms } from "@/data/recs";
import { buildMarkdown } from "@/lib/markdown";
import { runChecks, words } from "@/lib/checks";
import type { Slot } from "@/data/types";

const PARTS = [
  { id: "p1", n: "01", label: "Diagnostic" },
  { id: "p2", n: "02", label: "Positioning" },
  { id: "p3", n: "03", label: "Copy deck" },
  { id: "p4", n: "04", label: "Product cards" },
  { id: "p5", n: "05", label: "Recommendations" },
  { id: "p6", n: "06", label: "Self-check" },
] as const;

function downloadMarkdown() {
  const blob = new Blob([buildMarkdown()], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "DAP-copy-deck.md";
  a.click();
  URL.revokeObjectURL(url);
}

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted hover:bg-rule/40 hover:text-ink"
      onClick={() => {
        void navigator.clipboard.writeText(text);
        setDone(true);
        window.setTimeout(() => setDone(false), 1200);
      }}
    >
      {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {done ? "Copied" : "Copy NEW"}
    </button>
  );
}

function Flag({ children, tone }: { children: string; tone: "lock" | "new" | "confirm" }) {
  const cls =
    tone === "lock"
      ? "bg-ink text-paper"
      : tone === "new"
        ? "bg-fresh-soft text-fresh"
        : "bg-warn-soft text-warn";
  return (
    <span className={`rounded-sm px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${cls}`}>
      {children}
    </span>
  );
}

function SlotCard({ slot }: { slot: Slot }) {
  return (
    <article className="break-inside-avoid rounded-md border border-rule bg-sheet p-4 sm:p-5">
      <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-display text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            {slot.slot}
          </p>
          <p className="mt-0.5 text-xs text-faint">{slot.shape}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {slot.locked ? <Flag tone="lock">Locked</Flag> : null}
          {slot.recommendedNew ? <Flag tone="new">New slot</Flag> : null}
          {slot.confirm ? <Flag tone="confirm">Confirm</Flag> : null}
          <CopyBtn text={slot.next} />
        </div>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="mb-1 font-display text-[10px] font-semibold tracking-[0.16em] text-faint uppercase">
            Current
          </p>
          <p className="text-sm leading-relaxed text-muted">{slot.current}</p>
        </div>
        <div className="border-t border-rule pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-4">
          <p className="mb-1 font-display text-[10px] font-semibold tracking-[0.16em] text-fresh uppercase">
            New
          </p>
          <p className="text-sm leading-relaxed text-ink">{slot.next}</p>
          {slot.alts?.map((a) => (
            <div key={a.rank} className="mt-3 border-t border-rule pt-3">
              <p className="mb-1 font-display text-[10px] font-semibold tracking-[0.16em] text-signal uppercase">
                Alternate {a.rank}
              </p>
              <p className="text-sm font-medium text-ink">{a.text}</p>
              <p className="mt-1 text-xs text-muted">{a.why}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 border-t border-rule pt-3 text-sm text-muted">
        <span className="font-display text-[10px] font-semibold tracking-[0.16em] text-faint uppercase">
          Why{" "}
        </span>
        {slot.why}
      </p>
    </article>
  );
}

export function Deck() {
  const [part, setPart] = useState<string>("p1");
  const [page, setPage] = useState<string>("01 Home");
  const checks = useMemo(() => runChecks(), []);
  const pageSlots = allSlots.filter((s) => s.page === page);
  const allPass = checks.every((c) => c.ok);

  return (
    <div className="deck-root min-h-dvh bg-paper text-ink">
      <aside className="no-print fixed inset-y-0 left-0 hidden w-[220px] flex-col border-r border-rule bg-ink text-paper lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="font-display text-[11px] font-semibold tracking-[0.2em] text-signal uppercase">
            DAP
          </p>
          <p className="mt-1 font-display text-lg font-semibold leading-tight">Copy deck</p>
          <p className="mt-1 text-xs text-white/50">28 August 2026</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Parts">
          {PARTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPart(p.id)}
              className={`flex items-baseline gap-3 rounded-md px-3 py-2.5 text-left ${
                part === p.id ? "bg-white/10 text-paper" : "text-white/60 hover:bg-white/5 hover:text-paper"
              }`}
            >
              <span className="font-display text-[11px] tracking-[0.14em] text-signal">{p.n}</span>
              <span className="text-sm">{p.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4">
          <Link
            to="/"
            className="mb-2 flex h-11 w-full items-center justify-center rounded-md bg-paper text-sm font-semibold text-ink hover:bg-white"
          >
            Word preview
          </Link>
          <button
            type="button"
            onClick={downloadMarkdown}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-signal text-sm font-semibold text-paper hover:bg-signal/90"
          >
            <Download className="size-4" />
            Download .md
          </button>
        </div>
      </aside>

      <header className="no-print sticky top-0 z-20 border-b border-rule bg-paper/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-signal uppercase">
              DAP
            </p>
            <p className="font-display text-base font-semibold">Copy deck</p>
          </div>
          <button
            type="button"
            onClick={downloadMarkdown}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-signal px-3 text-sm font-semibold text-paper"
          >
            <Download className="size-4" />
            Download
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto px-3 pb-3">
          {PARTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPart(p.id)}
              className={`h-10 shrink-0 rounded-md px-3 text-sm ${
                part === p.id ? "bg-ink text-paper" : "bg-sheet text-muted"
              }`}
            >
              {p.n} {p.label}
            </button>
          ))}
        </div>
      </header>

      <main className="lg:ml-[220px]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
          {part === "p1" ? <Part1 /> : null}
          {part === "p2" ? <Part2 /> : null}
          {part === "p3" ? (
            <Part3 page={page} setPage={setPage} slots={pageSlots} />
          ) : null}
          {part === "p4" ? <Part4 /> : null}
          {part === "p5" ? <Part5 /> : null}
          {part === "p6" ? <Part6 checks={checks} allPass={allPass} /> : null}
        </div>
      </main>
    </div>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
      {children}
    </p>
  );
}

function H({ children }: { children: string }) {
  return (
    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function Part1() {
  return (
    <section>
      <Kicker>Part 01</Kicker>
      <H>Diagnostic</H>
      <p className="mt-3 max-w-prose text-muted">
        First-time CIO. Eight seconds on the first screen. Never heard of the firm. Blunt, because the outside reviewer already was.
      </p>
      <div className="mt-8 grid gap-4">
        {diagPages.map((p) => (
          <article key={p.n} className="rounded-md border border-rule bg-sheet p-5">
            <p className="font-display text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
              {p.n} · {p.path}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold">{p.name}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-fresh uppercase">
                  Can answer
                </p>
                <ul className="mt-2 space-y-2 text-sm text-ink">
                  {p.can.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
                  Cannot answer
                </p>
                <ul className="mt-2 space-y-2 text-sm text-ink">
                  {p.cannot.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
      <h3 className="mt-12 font-display text-2xl font-semibold">Five gaps, ranked</h3>
      <ol className="mt-4 space-y-5">
        {gaps.map((g) => (
          <li key={g.n} className="border-t border-rule pt-5">
            <p className="font-display text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
              Gap {g.n}
            </p>
            <p className="mt-1 font-display text-xl font-semibold">{g.title}</p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{g.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Part2() {
  return (
    <section>
      <Kicker>Part 02</Kicker>
      <H>Positioning core</H>
      <p className="mt-3 max-w-prose text-muted">
        The reusable source of truth. Seven lines, one sentence each. Use this before you write anything else.
      </p>
      <blockquote className="mt-8 border-l-2 border-signal pl-4">
        <p className="font-display text-xl font-medium leading-snug text-ink">{shortDefinition}</p>
        <p className="mt-2 text-xs tracking-[0.14em] text-muted uppercase">Short form</p>
      </blockquote>
      <ol className="mt-8 space-y-6">
        {positioning.map((p, i) => (
          <li key={p.k} className="border-t border-rule pt-5">
            <p className="font-display text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
              {String(i + 1).padStart(2, "0")} · {p.k}
            </p>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-ink">{p.s}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 rounded-md border border-rule bg-sheet p-5">
        <p className="font-display text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          Locked, verbatim
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>{locked.tagline}</li>
          <li>{locked.category}</li>
          <li>{locked.models}</li>
          <li>{locked.attested}</li>
          <li>{locked.cta}</li>
        </ul>
      </div>
    </section>
  );
}

function Part3({
  page,
  setPage,
  slots,
}: {
  page: string;
  setPage: (p: string) => void;
  slots: Slot[];
}) {
  return (
    <section>
      <Kicker>Part 03</Kicker>
      <H>Copy deck</H>
      <p className="mt-3 max-w-prose text-muted">
        Every text slot. Same shape as the live site. Home H1 carries two ranked alternates. Recommended new slots are marked.
      </p>
      <div className="no-print mt-6 flex gap-1 overflow-x-auto pb-1">
        {pageNames.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            className={`h-10 shrink-0 rounded-md px-3 text-sm ${
              page === p ? "bg-ink text-paper" : "bg-sheet text-muted hover:text-ink"
            }`}
          >
            {p.replace(/^\d\d /, "")}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-faint">
        {slots.length} slots · {slots.filter((s) => s.next !== s.current).length} changed ·{" "}
        {slots.filter((s) => s.recommendedNew).length} new
      </p>
      <div className="mt-4 grid gap-4">
        {slots.map((s) => (
          <SlotCard key={s.id} slot={s} />
        ))}
      </div>
    </section>
  );
}

function Part4() {
  return (
    <section>
      <Kicker>Part 04</Kicker>
      <H>Product and service cards</H>
      <p className="mt-3 max-w-prose text-muted">
        The definition of the product line. A prospect could read only these cards and still buy. Status labels are proposed, not assigned.
      </p>
      <div className="mt-8 grid gap-4">
        {cards.map((c) => (
          <article key={c.name} className="rounded-md border border-rule bg-sheet p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">{c.name}</h3>
              <span className="rounded-sm bg-warn-soft px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-warn uppercase">
                {c.status}
              </span>
            </div>
            <p className="mt-1 font-display text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
              {c.category}
            </p>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
                  What it is
                </dt>
                <dd className="mt-1 text-ink">{c.what}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
                  What it does for you
                </dt>
                <dd className="mt-1 text-ink">{c.does}</dd>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
                    Who buys it
                  </dt>
                  <dd className="mt-1 text-ink">{c.who}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
                    How you get it
                  </dt>
                  <dd className="mt-1 text-ink">{c.how}</dd>
                </div>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function Part5() {
  return (
    <section>
      <Kicker>Part 05</Kicker>
      <H>Recommendations outside the copy</H>
      <p className="mt-3 max-w-prose text-muted">
        Slots to add, remove or reorder. One line each, one reason. Then the founder decisions, all marked CONFIRM.
      </p>
      <ol className="mt-8 space-y-5">
        {recs.map((r, i) => (
          <li key={`${r.action}-${r.where}`} className="border-t border-rule pt-5">
            <p className="font-display text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
              {String(i + 1).padStart(2, "0")} · {r.action} · {r.where}
            </p>
            <p className="mt-2 text-base text-ink">{r.line}</p>
            <p className="mt-1 text-sm text-muted">{r.reason}</p>
          </li>
        ))}
      </ol>
      <h3 className="mt-12 font-display text-2xl font-semibold">CONFIRM</h3>
      <p className="mt-2 text-sm text-muted">These need a founder decision before the words go live.</p>
      <ol className="mt-4 space-y-3">
        {confirms.map((c, i) => (
          <li key={c} className="rounded-md border border-warn/30 bg-warn-soft/40 px-4 py-3 text-sm">
            <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-warn uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="ml-2 text-ink">{c}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Part6({
  checks,
  allPass,
}: {
  checks: ReturnType<typeof runChecks>;
  allPass: boolean;
}) {
  const changed = allSlots.filter((s) => s.next !== s.current).length;
  return (
    <section>
      <Kicker>Part 06</Kicker>
      <H>Self-check</H>
      <p className="mt-3 max-w-prose text-muted">
        Run against this deck, not against memory. If a check fails, the copy is not done.
      </p>
      <p
        className={`mt-6 inline-flex rounded-md px-3 py-1.5 text-sm font-semibold ${
          allPass ? "bg-fresh-soft text-fresh" : "bg-signal/15 text-signal"
        }`}
      >
        {allPass ? "All checks passed." : "Fix the failures before this goes to the site."}
      </p>
      <ul className="mt-6 space-y-3">
        {checks.map((c) => (
          <li key={c.label} className="rounded-md border border-rule bg-sheet px-4 py-3">
            <p className="flex items-center gap-2 font-display text-sm font-semibold">
              <span className={c.ok ? "text-fresh" : "text-signal"}>{c.ok ? "PASS" : "FAIL"}</span>
              {c.label}
            </p>
            <p className="mt-1 text-sm text-muted">{c.detail}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-muted">
        {allSlots.length} slots. {changed} changed. {allSlots.filter((s) => s.recommendedNew).length} recommended
        new. {allSlots.filter((s) => s.confirm).length} marked CONFIRM. Average NEW body{" "}
        {Math.round(
          allSlots.filter((s) => s.kind === "body").reduce((n, s) => n + words(s.next), 0) /
            Math.max(1, allSlots.filter((s) => s.kind === "body").length),
        )}{" "}
        words.
      </p>
    </section>
  );
}
