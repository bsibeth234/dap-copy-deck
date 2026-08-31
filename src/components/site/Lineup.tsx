import { useState, type ReactNode } from "react";
import { ProductMark } from "@/components/site/viz";

type Item = {
  id: string;
  k: string;
  t: string;
  line: string;
  more: string;
  panel: ReactNode;
  extra?: ReactNode;
};

const ITEMS: Item[] = [
  {
    id: "overture",
    k: "Pre-trade",
    t: "Overture",
    line: "Checked before the trade.",
    more: "The order that breaches the mandate does not ship. The halt names the clause.",
    extra: (
      <div className="more-acts">
        <a className="quiet" href="https://dap.solutions/docs/overture.pdf" target="_blank" rel="noreferrer">
          Brief, PDF, new tab
        </a>
        <a className="quiet" href="https://dap.solutions/docs/overture-operator-manual.pdf" target="_blank" rel="noreferrer">
          Manual, PDF, new tab
        </a>
      </div>
    ),
    panel: (
      <>
        <p className="kicker">Sample book</p>
        <p>ACME 3.1%</p>
        <p>NORD 2.4%</p>
        <p>HELM 1.8% PASS</p>
        <p>Gate 4.0% · IPS §4.1</p>
      </>
    ),
  },
  {
    id: "resolve",
    k: "Exchange",
    t: "Resolve Exchange",
    line: "Named solvers. Escrow. A sealed outcome.",
    more: "Qualified solvers only. Escrow. The outcome names who solved it.",
    panel: <p>SWIFT confirm. T+1. Named solver.</p>,
  },
  {
    id: "sh4pe",
    k: "Private",
    t: "sh4pe",
    line: "Stays on your machine.",
    more: "Trained and served on your hardware. Nothing leaves the machine.",
    panel: <p>Open weights. Nothing fetched at inference.</p>,
  },
  {
    id: "standard",
    k: "Classification",
    t: "DAP Standard",
    line: "Six facts, one holding.",
    more: "Look-through. Empty fields stay visible. Nothing is a single score.",
    panel: <p>L1 to L6. Only the sector is required.</p>,
  },
];

export function Lineup() {
  const [id, setId] = useState<string>("overture");
  const item = ITEMS.find((p) => p.id === id);

  return (
    <section id="products" className="lineup-wrap">
      <p className="kicker">Products</p>
      <p className="select-hint">Select a product</p>
      <div className="lineup cols-2">
        {ITEMS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={id === p.id ? "on" : ""}
            aria-expanded={id === p.id}
            aria-controls="product-detail"
            onClick={() => setId(p.id)}
          >
            <ProductMark id={p.id} />
            <b>{p.t}</b>
            <span>{p.line}</span>
          </button>
        ))}
      </div>
      {item ? (
        <div className="detail" id="product-detail" role="region" aria-labelledby="product-detail-title">
          <div>
            <p className="kicker">{item.k}</p>
            <h2 id="product-detail-title">{item.t}</h2>
            <p>{item.more}</p>
            {item.extra}
          </div>
          <div className="panel">{item.panel}</div>
        </div>
      ) : null}
    </section>
  );
}
