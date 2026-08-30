import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, HeroFilm, CTA, BELLWETHER } from "@/components/site/Shell";
import { Lineup } from "@/components/site/Lineup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAP · The context layer" },
      {
        name: "description",
        content: "DAP compiles your written investment rules into checks that run at the decision.",
      },
    ],
  }),
  component: Home,
});

function Offers() {
  const [open, setOpen] = useState<string | null>(null);
  const items = [
    {
      k: "Offer 01",
      t: "Readiness assessment",
      p: "Where AI already runs. What an examiner would find today. Take it to your board.",
    },
    {
      k: "Offer 02",
      t: "Embedded Context Architect",
      p: "One senior person. Ninety days. Then you own the keys.",
    },
  ];
  return (
    <section className="offers">
      {items.map((item) => {
        const on = open === item.k;
        return (
          <button
            key={item.k}
            type="button"
            aria-expanded={on}
            onClick={() => setOpen(on ? null : item.k)}
          >
            <span className="kicker">{item.k}</span>
            <b>{item.t}</b>
            {on ? <span className="open-body">{item.p}</span> : null}
          </button>
        );
      })}
    </section>
  );
}

function Home() {
  return (
    <Shell>
      <div className="hero">
        <HeroFilm src="/film/home.mp4" />
        <div className="copy">
          <p className="kicker">For the CIO and the CCO</p>
          <h1>
            Policy compiles.
            <br />
            Governance executes.
            <br />
            Context compounds.
          </h1>
          <p>Written rules that halt a trade.</p>
          <div className="links">
            <Link to="/how-it-works">How it works</Link>
            <a href={BELLWETHER} target="_blank" rel="noreferrer">
              Try Bellwether
            </a>
          </div>
        </div>
      </div>
      <Lineup />
      <Offers />
      <div className="end">
        <a className="btn-primary" href={CTA}>
          Build Your Context Layer
        </a>
      </div>
    </Shell>
  );
}
