import { useMemo, useRef, useState } from "react";

const HOLDINGS = ["Listed equity", "Corporate bond", "Private fund interest"] as const;
const WEIGHTS = ["3.2%", "4.0%", "5.5%"] as const;
const LIMIT = 4.0;

function toNum(w: string) {
  return Number.parseFloat(w);
}

export function CompilerDemo() {
  const [holding, setHolding] = useState<(typeof HOLDINGS)[number]>("Listed equity");
  const [weight, setWeight] = useState<(typeof WEIGHTS)[number]>("3.2%");
  const [proposed, setProposed] = useState(false);
  const [record, setRecord] = useState<string | null>(null);
  const hold = useRef<number | null>(null);

  const pass = toNum(weight) <= LIMIT;
  const payload = useMemo(
    () => ({
      holding,
      proposed: `Raise single-issuer weight to ${weight}`,
      limit: "Single-issuer concentration, max 4.0% · IPS §4.1 v3",
      result: pass ? "PASS" : "HALT",
      clause: pass ? null : "IPS §4.1 v3",
    }),
    [holding, weight, pass],
  );

  const approve = async () => {
    if (!proposed) return;
    const body = JSON.stringify({ ...payload, signed: new Date().toISOString() });
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body));
    const hash = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
    setRecord(`${body}\nSHA-256 ${hash}`);
  };

  return (
    <div className="demo-panel">
      <p className="kicker">Compile a decision</p>

      <div className="cd-row">
        <span className="k">Holding</span>
        <div className="seg">
          {HOLDINGS.map((h) => (
            <button key={h} type="button" className={holding === h ? "on" : ""} onClick={() => { setHolding(h); setProposed(false); setRecord(null); }}>
              {h}
            </button>
          ))}
        </div>
      </div>
      <div className="cd-row">
        <span className="k">Proposed</span>
        <div>
          <p className="mb-2 text-sm text-ink-soft">Raise single-issuer weight</p>
          <div className="seg">
            {WEIGHTS.map((w) => (
              <button key={w} type="button" className={weight === w ? "on" : ""} onClick={() => { setWeight(w); setProposed(false); setRecord(null); }}>
                to {w}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="cd-row">
        <span className="k">Limit</span>
        <p className="text-sm">Single-issuer concentration, max 4.0% · IPS §4.1 v3</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="btn-ghost" onClick={() => { setProposed(true); setRecord(null); }}>
          Propose
        </button>
        <button
          type="button"
          className="btn-primary"
          onMouseDown={() => {
            hold.current = window.setTimeout(() => { void approve(); }, 650);
          }}
          onMouseUp={() => { if (hold.current) window.clearTimeout(hold.current); }}
          onMouseLeave={() => { if (hold.current) window.clearTimeout(hold.current); }}
          onTouchStart={() => {
            hold.current = window.setTimeout(() => { void approve(); }, 650);
          }}
          onTouchEnd={() => { if (hold.current) window.clearTimeout(hold.current); }}
        >
          Approve, press and hold
        </button>
        <button
          type="button"
          className="btn-ghost"
          disabled={!record}
          onClick={() => {
            if (!record) return;
            const blob = new Blob([record], { type: "text/plain" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "decision-record.txt";
            a.click();
          }}
        >
          Download record
        </button>
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        {!proposed ? "Nothing has been proposed yet." : pass ? "Proposed. Within the gate." : "Proposed. This would halt. The halt names IPS §4.1 v3."}
      </p>
      <div className="record">
        {record ? record : "No record yet. Propose, then approve."}
      </div>
      <p className="mt-3 text-xs text-muted">Demonstration. Produced by this page. Not an institutional record.</p>
    </div>
  );
}
