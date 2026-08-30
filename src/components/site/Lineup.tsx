import { useState, type ReactNode } from "react";
import { ProductMark } from "@/components/site/viz";
import { BELLWETHER } from "@/components/site/Shell";

type Item = {
  id: string;
  k: string;
  t: string;
  line: string;
  status: string;
  more: string;
  panel: ReactNode;
  extra?: ReactNode;
};

const ITEMS: Item[] = [
  {
    id: "overture",
    k: "Allocation",
    t: "Overture",
    line: "Checked before the trade.",
    status: "Built and demonstrated CONFIRM",
    more: "The order that breaches the mandate does not ship. The halt names the clause.",
    extra: (
      <div className="more-acts">
        <a className="quiet" href="https://dap.solutions/docs/overture.pdf" target="_blank" rel="noreferrer">
          Brief
        </a>
        <a className="quiet" href="https://dap.solutions/docs/overture-operator-manual.pdf" target="_blank" rel="noreferrer">
          Manual
        </a>
      </div>
    ),
    panel: (
      <>
        <p>ACME 3.1%</p>
        <p>NORD 2.4%</p>
        <p className="text-signal">HELM 5.5% HALT</p>
        <p className="text-pass">Gate 4.0% · IPS §4.1</p>
      </>
    ),
  },
  {
    id: "resolve",
    k: "Exchange",
    t: "Resolve Exchange",
    line: "A governed venue.",
    status: "Built and demonstrated CONFIRM",
    more: "Qualified solvers only. Escrow. The outcome names who solved it.",
    panel: <p>Match failed SWIFT confirms in T+1</p>,
  },
  {
    id: "sh4pe",
    k: "Sovereign",
    t: "sh4pe",
    line: "Stays on your machine.",
    status: "Built and demonstrated CONFIRM",
    more: "Fine-tune local. Holdouts the trainer cannot reach. Network dark.",
    panel: <p>Open weights. Nothing fetched at inference.</p>,
  },
  {
    id: "racing",
    k: "Physical AI",
    t: "DAP Racing",
    line: "The compiled envelope.",
    status: "Designed CONFIRM",
    more: "Constraints the machine must satisfy before it acts. Frame only.",
    panel: <p className="text-signal">HALT · envelope §2.3</p>,
  },
  {
    id: "falcon",
    k: "Reporting",
    t: "Falcon",
    line: "One source, four filings.",
    status: "Built and demonstrated CONFIRM",
    more: "Canada, the US, the UK and the EU, from the same rulebook.",
    panel: (
      <>
        <p>CA · NI 81-102</p>
        <p>US · Form PF</p>
        <p>UK · FCA</p>
        <p>EU · ESMA</p>
      </>
    ),
  },
  {
    id: "standard",
    k: "Classification",
    t: "DAP Standard",
    line: "Six facts, one holding.",
    status: "Live and public CONFIRM",
    more: "Look-through. Empty fields stay visible. Nothing is a single score.",
    panel: <p>L1 to L6. Only the sector is required.</p>,
  },
  {
    id: "bellwether",
    k: "Change",
    t: "Bellwether",
    line: "Live now. No account.",
    status: "Live and public CONFIRM",
    more: "OSFI, OSC, SEC, FINRA, CFTC, FCA, ESMA and EBA. MIT licence.",
    extra: (
      <a className="quiet" href={BELLWETHER} target="_blank" rel="noreferrer">
        Open Bellwether
      </a>
    ),
    panel: <p>Canada · US · UK · EU</p>,
  },
];

export function Lineup() {
  const [id, setId] = useState<string | null>(null);
  const item = ITEMS.find((p) => p.id === id);

  return (
    <section id="products" className="lineup-wrap">
      <p className="kicker">Products</p>
      <div className="lineup">
        {ITEMS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={id === p.id ? "on" : ""}
            aria-expanded={id === p.id}
            onClick={() => setId((cur) => (cur === p.id ? null : p.id))}
          >
            <ProductMark id={p.id} />
            <b>{p.t}</b>
            <span>{p.line}</span>
          </button>
        ))}
      </div>
      {item ? (
        <div className="detail">
          <div>
            <p className="kicker">{item.k}</p>
            <p className="status">{item.status}</p>
            <h2>{item.line}</h2>
            <p>{item.more}</p>
            {item.extra}
          </div>
          <div className="panel">{item.panel}</div>
        </div>
      ) : null}
    </section>
  );
}
