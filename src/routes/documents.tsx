import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Papers · DAP" },
      { name: "description", content: "Versioned papers. Read these first." },
    ],
  }),
  component: Page,
});

const ROWS = [
  {
    k: "Aug 2026",
    t: "Models are commodities.",
    p: "Which rule governed the last decision, and can you prove it?",
    href: "https://dap.solutions/documents/models-are-commodities.pdf",
  },
  {
    k: "Thesis",
    t: "Discovery is the bottleneck",
    p: "The scarce skill is knowing which questions to ask.",
    href: "https://dap.solutions/documents/discovery-is-the-bottleneck",
  },
  {
    k: "v1.1",
    t: "Living Policy Architecture",
    p: "Written policy compiled into checks that run.",
    href: "https://dap.solutions/documents/living-policy-architecture",
  },
  {
    k: "SSRN",
    t: "Policy-coupled decision attestation",
    p: "Sealed records anyone can reproduce.",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7108538",
  },
  {
    k: "Open",
    t: "AA-1",
    p: "Which controls a firm runs, at what level.",
    href: "https://dap.solutions/aa-1",
  },
  {
    k: "Live",
    t: "Bellwether",
    p: "Regulatory change. No account.",
    href: "https://bellwether.dap.solutions",
  },
];

function Page() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Shell>
      <div className="papers">
        <p className="kicker">Papers</p>
        <h1 className="mt-2 font-display text-xl font-semibold">The argument, in writing.</h1>
        {ROWS.map((r) => {
          const on = open === r.t;
          return (
            <div key={r.t}>
              <button
                type="button"
                className="row"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : r.t)}
              >
                <span className="meta">{r.k}</span>
                <b>{r.t}</b>
              </button>
              {on ? (
                <p className="open-body">
                  {r.p}{" "}
                  <a className="quiet" href={r.href} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
