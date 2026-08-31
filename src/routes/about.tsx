import { createFileRoute } from "@tanstack/react-router";
import { Shell, CTA, HeroFilm } from "@/components/site/Shell";
import { Accordion } from "@/components/site/Accordion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · DAP" },
      {
        name: "description",
        content:
          "Dartmouth Advisory Partners is a Toronto firm that builds investment infrastructure around institutions. Founded January 2025.",
      },
    ],
  }),
  component: Page,
});

const BLOCKS = [
  {
    id: "who",
    title: "Who we are",
    body: "Dartmouth Advisory Partners is a Toronto firm that builds investment infrastructure around institutions rather than selling them systems they must conform to. Founded January 2025.",
  },
  {
    id: "what",
    title: "What we do",
    body: "Conventional implementations fail in a predictable place. The vendor's model is fixed, so the institution's data and its governance policies have to be remapped to fit it. That remapping is the implementation, and it is why the work is quoted in quarters and why the system needs constant supervision afterward: nothing in it was ever shaped like the institution. DAP starts from the other end. The firm takes an institution's existing policies and procedures as the parameters and builds to the records it already keeps. What follows, classification, policy evaluation, research, attestation, describes the institution's real holdings rather than a mapped copy of them. Work quoted elsewhere in quarters ships here in weeks. Models propose. Humans ratify.",
  },
  {
    id: "why",
    title: "Why it exists",
    body: "Thirteen years of selling and implementing these systems is thirteen years of watching where they break, and of watching institutions absorb the cost of the break as though it were normal. The firm exists on the conviction that a system parameterised from the outset by a firm's own governance does not need to be forced into place, and does not need to be watched once it is.",
  },
  {
    id: "founder",
    title: "About the founder",
    body: "Brendan Sibeth spent thirteen years in institutional investment technology across TD Bank, SS&C GlobeOp, MSCI and Burgiss, working back, middle and front office end to end. That span gave him a full view of the vendor landscape, what each system genuinely did, where the competitive claims ran out, and the operational headaches an institution inherits once the implementation is signed off. He founded Dartmouth Advisory Partners in January 2025 and builds its systems himself. Active in digital assets since 2014.",
  },
];

function Page() {
  return (
    <Shell>
      <section className="chapter">
        <HeroFilm src="/film/home.mp4" />
        <div className="copy">
          <p className="kicker">About</p>
          <h1>Dartmouth Advisory Partners</h1>
        </div>
      </section>
      <article className="letter">
        <Accordion items={BLOCKS} />
        <div className="links">
          <a href={CTA}>Build Your Context Layer</a>
          <a href="https://www.linkedin.com/in/bsibeth/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </article>
    </Shell>
  );
}
