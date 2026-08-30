export function CompilerViz({ active, onPick }: { active?: string; onPick?: (id: string) => void }) {
  const planes = [
    { id: "classification", y: 18, label: "CLASSIFICATION" },
    { id: "policy", y: 58, label: "POLICY" },
    { id: "research", y: 98, label: "RESEARCH" },
    { id: "attestation", y: 138, label: "ATTESTATION", signal: true },
  ];
  return (
    <svg viewBox="0 0 280 200" className="viz" aria-label="Four planes of the compiler">
      <line className="trace" x1="140" y1="8" x2="140" y2="188" />
      {planes.map((p) => {
        const on = active === p.id;
        return (
          <g
            key={p.id}
            className={onPick ? (on ? "plane on" : "plane") : undefined}
            role={onPick ? "button" : undefined}
            tabIndex={onPick ? 0 : undefined}
            onClick={onPick ? () => onPick(p.id) : undefined}
            onKeyDown={
              onPick
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onPick(p.id);
                    }
                  }
                : undefined
            }
          >
            <rect
              x="36"
              y={p.y}
              width="208"
              height="32"
              fill={on ? "var(--color-ink)" : "var(--color-paper-light)"}
              stroke={p.signal ? "var(--color-signal)" : "var(--color-rule)"}
            />
            <text
              x="140"
              y={p.y + 21}
              textAnchor="middle"
              fill={on ? "var(--color-paper)" : p.signal ? "var(--color-signal)" : "var(--color-ink)"}
              fontSize="11"
              letterSpacing="1.4"
              fontFamily="var(--font-mono)"
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function GateViz() {
  return (
    <svg viewBox="0 0 420 160" className="viz" aria-label="Holdings against a 4 percent gate">
      <text x="16" y="22" fill="var(--color-muted)" fontSize="10" letterSpacing="1.6" fontFamily="var(--font-mono)">
        LIVE BOOK · IPS §4.1
      </text>
      <line x1="16" y1="40" x2="404" y2="40" stroke="var(--color-rule)" />
      {[
        { n: "ACME", w: 0.78, y: 58 },
        { n: "NORD", w: 0.6, y: 92 },
        { n: "HELM", w: 1.12, y: 126, halt: true },
      ].map((row) => (
        <g key={row.n}>
          <text x="16" y={row.y + 11} fill="var(--color-ink-soft)" fontSize="11" fontFamily="var(--font-mono)">
            {row.n}
          </text>
          <rect x="80" y={row.y} width="260" height="14" fill="var(--color-paper-sunk)" />
          <rect
            className={row.halt ? "bar halt" : "bar"}
            x="80"
            y={row.y}
            width={260 * Math.min(row.w, 1)}
            height="14"
            fill={row.halt ? "var(--color-signal)" : "var(--color-ink)"}
          />
          <text x="352" y={row.y + 11} fill={row.halt ? "var(--color-signal)" : "var(--color-muted)"} fontSize="10" fontFamily="var(--font-mono)">
            {row.halt ? "HALT" : `${(row.w * 4).toFixed(1)}%`}
          </text>
        </g>
      ))}
      <line x1="288" y1="40" x2="288" y2="148" stroke="var(--color-signal)" strokeDasharray="2 3" />
      <text x="292" y="38" fill="var(--color-signal)" fontSize="9" letterSpacing="1.2" fontFamily="var(--font-mono)">
        4.0%
      </text>
    </svg>
  );
}

export function NinetyViz({ active, onPick }: { active?: string; onPick?: (id: string) => void }) {
  const days = [
    { id: "assess", n: "01", l: "Assess" },
    { id: "compile", n: "02", l: "Compile" },
    { id: "run", n: "03", l: "Run" },
    { id: "transfer", n: "04", l: "Transfer" },
  ];
  return (
    <svg viewBox="0 0 560 90" className="viz" aria-label="Day 1 to Day 90">
      <line x1="40" y1="44" x2="520" y2="44" stroke="var(--color-rule)" />
      {days.map((d, i) => {
        const x = 70 + i * 140;
        const on = active === d.id;
        return (
          <g
            key={d.id}
            className={on ? "plane on" : "plane"}
            role="button"
            tabIndex={0}
            onClick={() => onPick?.(d.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPick?.(d.id);
              }
            }}
          >
            <circle cx={x} cy="44" r="10" fill={on ? "var(--color-signal)" : "var(--color-ink)"} />
            <text x={x} y="24" textAnchor="middle" fill="var(--color-muted)" fontSize="10" letterSpacing="1.4" fontFamily="var(--font-mono)">
              {d.n}
            </text>
            <text x={x} y="78" textAnchor="middle" fill={on ? "var(--color-ink)" : "var(--color-ink-soft)"} fontSize="12" fontFamily="var(--font-display)">
              {d.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ProductMark({ id }: { id: string }) {
  if (id === "overture") {
    return (
      <svg viewBox="0 0 120 48" className="mark" aria-hidden="true">
        <rect x="8" y="28" width="24" height="12" fill="var(--color-ink)" />
        <rect x="40" y="20" width="24" height="20" fill="var(--color-ink)" />
        <rect x="72" y="8" width="24" height="32" fill="var(--color-signal)" />
        <line x1="8" y1="8" x2="112" y2="8" stroke="var(--color-signal)" />
      </svg>
    );
  }
  if (id === "resolve") {
    return (
      <svg viewBox="0 0 120 48" className="mark" aria-hidden="true">
        <circle cx="30" cy="24" r="8" fill="var(--color-ink-soft)" />
        <circle cx="60" cy="24" r="8" fill="var(--color-ink)" />
        <circle cx="90" cy="24" r="8" fill="var(--color-signal)" />
      </svg>
    );
  }
  if (id === "sh4pe") {
    return (
      <svg viewBox="0 0 120 48" className="mark" aria-hidden="true">
        <rect x="28" y="8" width="64" height="32" fill="none" stroke="var(--color-ink)" />
        <rect x="40" y="18" width="40" height="12" fill="var(--color-paper-sunk)" />
      </svg>
    );
  }
  if (id === "racing") {
    return (
      <svg viewBox="0 0 120 48" className="mark" aria-hidden="true">
        <path d="M16 36 L60 8 L104 36" fill="none" stroke="var(--color-signal)" />
        <circle cx="60" cy="28" r="6" fill="var(--color-ink)" />
      </svg>
    );
  }
  if (id === "falcon") {
    return (
      <svg viewBox="0 0 120 48" className="mark" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={12 + i * 26} y="12" width="20" height="24" fill="none" stroke={i === 0 ? "var(--color-signal)" : "var(--color-ink)"} />
        ))}
      </svg>
    );
  }
  if (id === "standard") {
    return (
      <svg viewBox="0 0 120 48" className="mark" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={10 + i * 18} y="16" width="12" height="16" fill={i === 1 ? "var(--color-ink)" : "var(--color-paper-sunk)"} stroke="var(--color-rule)" />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 48" className="mark" aria-hidden="true">
      <circle cx="24" cy="24" r="4" className="pulse" fill="var(--color-signal)" />
      <line x1="32" y1="24" x2="108" y2="24" stroke="var(--color-rule)" />
      <circle cx="56" cy="24" r="3" fill="var(--color-ink-soft)" />
      <circle cx="84" cy="24" r="3" fill="var(--color-ink-soft)" />
    </svg>
  );
}
