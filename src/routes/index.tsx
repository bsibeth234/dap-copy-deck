import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell, HeroFilm, CTA, BELLWETHER } from "@/components/site/Shell";
import { Lineup } from "@/components/site/Lineup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAP · The context layer" },
      {
        name: "description",
        content: "The context layer for institutional intelligence. DAP compiles written investment rules into checks that run at the decision.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Shell>
      <div className="hero">
        <HeroFilm src="/film/home.mp4" />
        <div className="copy">
          <h1>
            Policy compiles.
            <br />
            Governance executes.
            <br />
            Context compounds.
          </h1>
          <p>The context layer for institutional intelligence.</p>
          <p className="proof">
            Bellwether is live. No account.{" "}
            <a href={BELLWETHER} target="_blank" rel="noreferrer">
              Open Bellwether, new tab
            </a>
          </p>
          <div className="links">
            <Link to="/how-it-works">How it works</Link>
            <a href={CTA}>Build Your Context Layer</a>
          </div>
        </div>
      </div>
      <Lineup />
      <section id="offers" className="letter">
        <p className="kicker">Start here</p>
        <p className="seats">CIO, CCO, Head of Risk, GC, COO.</p>
        <div className="offers">
          <a className="tile" href={CTA}>
            <b>Readiness assessment</b>
            <span className="open-body">Board-ready report on where AI already runs.</span>
          </a>
          <a className="tile" href={CTA}>
            <b>Embedded Context Architect</b>
            <span className="open-body">One senior person. Ninety days. Then you own the keys.</span>
          </a>
        </div>
      </section>
      <div className="end">
        <a className="btn-primary" href={CTA}>
          Build Your Context Layer
        </a>
      </div>
    </Shell>
  );
}
