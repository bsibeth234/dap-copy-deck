import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Accordion } from "@/components/site/Accordion";

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
    id: "models",
    title: "Models are commodities.",
    body: (
      <>
        Which rule governed the last decision, and can you prove it?{" "}
        <a className="quiet" href="https://dap.solutions/documents/models-are-commodities.pdf" target="_blank" rel="noreferrer">
          Open
        </a>
      </>
    ),
  },
  {
    id: "discovery",
    title: "Discovery is the bottleneck",
    body: (
      <>
        The scarce skill is knowing which questions to ask.{" "}
        <a className="quiet" href="https://dap.solutions/documents/discovery-is-the-bottleneck" target="_blank" rel="noreferrer">
          Open
        </a>
      </>
    ),
  },
  {
    id: "lpa",
    title: "Living Policy Architecture",
    body: (
      <>
        Written policy compiled into checks that run.{" "}
        <a className="quiet" href="https://dap.solutions/documents/living-policy-architecture" target="_blank" rel="noreferrer">
          Open
        </a>
      </>
    ),
  },
  {
    id: "ssrn",
    title: "Policy-coupled decision attestation",
    body: (
      <>
        Sealed records anyone can reproduce.{" "}
        <a className="quiet" href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7108538" target="_blank" rel="noreferrer">
          Open
        </a>
      </>
    ),
  },
  {
    id: "aa1",
    title: "AA-1",
    body: (
      <>
        Which controls a firm runs, at what level.{" "}
        <a className="quiet" href="https://dap.solutions/aa-1" target="_blank" rel="noreferrer">
          Open
        </a>
      </>
    ),
  },
  {
    id: "bellwether",
    title: "Bellwether",
    body: (
      <>
        Regulatory change. No account.{" "}
        <a className="quiet" href="https://bellwether.dap.solutions" target="_blank" rel="noreferrer">
          Open
        </a>
      </>
    ),
  },
];

function Page() {
  return (
    <Shell>
      <div className="papers">
        <p className="kicker">Papers</p>
        <h1 className="mt-2 mb-4 font-display text-xl font-semibold">The argument, in writing.</h1>
        <Accordion items={ROWS} />
      </div>
    </Shell>
  );
}
