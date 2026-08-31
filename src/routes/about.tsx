import { createFileRoute } from "@tanstack/react-router";
import { Shell, CTA } from "@/components/site/Shell";
import { Accordion } from "@/components/site/Accordion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · DAP" },
      {
        name: "description",
        content: "He sold the stack you already run. Toronto. January 2025. For CIO and CCO desks.",
      },
    ],
  }),
  component: Page,
});

const BLOCKS = [
  {
    id: "who",
    title: "Who we are",
    body: "A Toronto firm that builds investment infrastructure around institutions rather than selling them systems they must conform to. Founded January 2025.",
  },
  {
    id: "what",
    title: "What we do",
    body: "Conventional implementations remap an institution to a vendor model. DAP starts from the other end: existing policies and procedures as the parameters, built to the records the firm already keeps. Classification, policy evaluation, research, attestation. Models propose. Humans ratify.",
  },
  {
    id: "why",
    title: "Why it exists",
    body: "Thirteen years of selling and implementing these systems is thirteen years of watching where they break. The firm exists because a system parameterised from the outset by a firm's own governance does not need to be forced into place.",
  },
  {
    id: "founder",
    title: "About the founder",
    body: "Brendan Sibeth spent thirteen years in institutional investment technology and quantitative data analytics. Senior roles at MSCI Burgiss and SS&C GlobeOp. Earlier at TD Bank and Green Street. He sold the stack at Burgiss and GlobeOp. He founded Dartmouth Advisory Partners in January 2025 and builds its systems himself.",
  },
];

function Page() {
  return (
    <Shell>
      <section className="chapter type-only">
        <div className="copy">
          <p className="kicker">About</p>
          <h1>He sold the stack you already run.</h1>
          <p className="line">Toronto. January 2025. For CIO and CCO desks.</p>
        </div>
      </section>
      <article className="letter">
        <Accordion items={BLOCKS} />
        <div className="links">
          <a href={CTA}>Build Your Context Layer</a>
          <a href="https://www.linkedin.com/in/bsibeth/" target="_blank" rel="noreferrer noopener">
            LinkedIn, new tab
          </a>
        </div>
      </article>
    </Shell>
  );
}
