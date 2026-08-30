import { useState, type ReactNode } from "react";

export type Tile = {
  k: string;
  t: string;
  p: ReactNode;
};

export function Tiles({ items, cols = "four" }: { items: Tile[]; cols?: "two" | "four" }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className={`cap ${cols}`}>
      {items.map((item) => {
        const on = open === item.k;
        return (
          <div key={item.k} className={on ? "on" : ""}>
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? null : item.k)}
            >
              <span className="kicker">{item.k}</span>
              <b>{item.t}</b>
            </button>
            <span className={`tile-body ${on ? "open" : ""}`} inert={!on || undefined}>
              <span className="tile-inner">{item.p}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Reveal({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="reveal">
      <button type="button" className="btn-step" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : label}
      </button>
      <div className={`tile-body ${open ? "open" : ""}`}>
        <div className="tile-inner">{children}</div>
      </div>
    </div>
  );
}
