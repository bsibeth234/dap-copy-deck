import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell, CTA, HeroFilm } from "@/components/site/Shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · DAP" },
      { name: "description", content: "Brendan Sibeth. DAP, Toronto, January 2025." },
    ],
  }),
  component: Page,
});

const FACTS = [
  { k: "Who", t: "CIOs and CCOs.", p: "Pensions, asset managers, OCIOs, insurers, family offices." },
  { k: "How", t: "Consulting self-funds the product.", p: "No patents. Open formats. You keep the keys." },
  { k: "Rule", t: "Models propose. Humans ratify.", p: "" },
  { k: "Proof", t: "Public, then CONFIRM.", p: "Bellwether, AA-1, Living Policy Architecture, DAP Standard 2026.2. Client names CONFIRM." },
];

function Page() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Shell>
      <section className="chapter">
        <HeroFilm src="/film/home.mp4" />
        <div className="copy">
          <p className="kicker">About</p>
          <h1>He sold the stack you already run.</h1>
          <p className="line">Brendan Sibeth · Toronto · January 2025</p>
          <div className="links">
            <a href={CTA}>Build Your Context Layer</a>
            <a href="https://www.linkedin.com/in/bsibeth/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      <div className="facts">
        {FACTS.map((f) => {
          const on = open === f.k;
          return (
            <button key={f.k} type="button" onClick={() => setOpen(on ? null : f.k)} aria-expanded={on}>
              <span className="k">{f.k}</span>
              <span>
                {f.t}
                {on && f.p ? <span className="mt-1 block text-ink-soft">{f.p}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}
