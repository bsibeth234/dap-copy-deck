import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell, HeroFilm, CTA, BELLWETHER } from "@/components/site/Shell";
import { Lineup } from "@/components/site/Lineup";
import { Accordion } from "@/components/site/Accordion";

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

const OFFERS = [
  {
    id: "assess",
    title: "Readiness assessment",
    body: "Where AI already runs. What an examiner would find today. Take it to your board.",
  },
  {
    id: "architect",
    title: "Embedded Context Architect",
    body: "One senior person. Ninety days. Then you own the keys.",
  },
];

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
          <div className="links">
            <Link to="/how-it-works">How it works</Link>
            <a href={BELLWETHER} target="_blank" rel="noreferrer">
              Try Bellwether
            </a>
          </div>
        </div>
      </div>
      <Lineup />
      <div className="letter">
        <p className="kicker">Offers</p>
        <Accordion items={OFFERS} />
      </div>
      <div className="end">
        <a className="btn-primary" href={CTA}>
          Build Your Context Layer
        </a>
      </div>
    </Shell>
  );
}
