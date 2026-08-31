import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell, HeroFilm, CTA } from "@/components/site/Shell";
import { CompilerViz, GateViz } from "@/components/site/viz";
import { CompilerDemo } from "@/components/site/CompilerDemo";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works · DAP" },
      {
        name: "description",
        content: "How your firm decides, compiled into checks that run. Models propose. Humans ratify.",
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
          <h1>How your firm decides</h1>
        </div>
      </section>

      <section className="chapter type-only">
        <div className="viz-wrap">
          <CompilerViz />
        </div>
        <div className="copy">
          <p className="kicker">Compile</p>
          <h2>Clause becomes check</h2>
        </div>
      </section>

      <section className="chapter type-only">
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

      <section className="chapter type-only">
        <div className="copy">
          <p className="kicker">Attestation</p>
          <h2>Signed decision record</h2>
          <p className="line">A signed record that anyone can check offline.</p>
          <p className="line">Models propose. Humans ratify.</p>
        </div>
      </section>

      <section className="chapter type-only limits">
        <div className="copy">
          <p className="kicker">Limitations</p>
          <h2>What we will not attest</h2>
          <p className="line">Only deterministic evaluation over ratified inputs may be attested.</p>
          <div className="links">
            <a href={CTA}>Build Your Context Layer</a>
            <Link to="/">Products</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
