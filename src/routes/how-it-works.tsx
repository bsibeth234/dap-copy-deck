import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell, HeroFilm, CTA } from "@/components/site/Shell";
import { GateViz } from "@/components/site/viz";
import { CompilerDemo } from "@/components/site/CompilerDemo";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works · DAP" },
      {
        name: "description",
        content: "Your written rules become the check that runs before a trade ships.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <Shell>
      <section className="chapter">
        <HeroFilm src="/film/board.mp4" />
        <div className="copy">
          <p className="kicker">Context layer</p>
          <h1>How you decide</h1>
          <p className="line">How your firm decides, used before trades ship.</p>
        </div>
      </section>

      <section className="chapter">
        <HeroFilm src="/film/gate.mp4" />
        <div className="copy">
          <p className="kicker">Compile</p>
          <h2>Clause becomes check</h2>
          <p className="line">Each written clause becomes a check that runs.</p>
        </div>
      </section>

      <section className="chapter">
        <HeroFilm src="/film/compiler.mp4" />
        <div className="viz-wrap">
          <GateViz />
        </div>
        <div className="copy">
          <p className="kicker">Gate</p>
          <h2>The live check</h2>
          <p className="line">The check that runs before the trade ships.</p>
        </div>
      </section>

      <CompilerDemo />

      <section className="chapter">
        <div className="copy">
          <p className="kicker">Attestation</p>
          <h2>Signed decision record</h2>
          <p className="line">A signed record that anyone can check offline.</p>
          <p className="line">Models propose. Humans ratify.</p>
          <div className="links">
            <a href={CTA}>Build Your Context Layer</a>
            <Link to="/">Products</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
