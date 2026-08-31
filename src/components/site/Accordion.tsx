import { useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  body: ReactNode;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="acc">
      {items.map((item) => {
        const on = open === item.id;
        const panelId = `${item.id}-panel`;
        const btnId = `${item.id}-btn`;
        return (
          <div key={item.id} className={on ? "acc-item on" : "acc-item"}>
            <button
              type="button"
              id={btnId}
              className="acc-h"
              aria-expanded={on}
              aria-controls={panelId}
              onClick={() => setOpen(on ? null : item.id)}
            >
              <span className="acc-title">{item.title}</span>
              <span className="acc-state">{on ? "Close" : "Open"}</span>
              <span className="acc-mark" aria-hidden="true" />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={on ? "acc-body open" : "acc-body"}
              inert={!on || undefined}
            >
              <div className="acc-inner">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
