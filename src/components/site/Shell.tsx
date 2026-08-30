import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

const NAV = [
  { l: "Products", to: "/#products" },
  { l: "How", to: "/how-it-works" },
  { l: "Papers", to: "/documents" },
  { l: "About", to: "/about" },
] as const;

export const CTA = "mailto:bsibeth@dap.solutions?subject=Build%20Your%20Context%20Layer";
export const BELLWETHER = "https://bellwether.dap.solutions";

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className ?? "size-5"} role="img" aria-label="DAP">
      <rect x="18" y="15" width="84" height="12" fill="currentColor" />
      <rect x="18" y="41" width="58" height="12" fill="var(--color-signal)" />
      <rect x="18" y="67" width="84" height="12" fill="currentColor" />
      <rect x="18" y="93" width="44" height="12" fill="currentColor" />
    </svg>
  );
}

export function HeroFilm({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(false);
      ref.current?.pause();
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (on) void el.play().catch(() => setOn(false));
    else el.pause();
  }, [on]);

  return (
    <>
      <div className="hero-film" aria-hidden="true">
        <video ref={ref} src={src} muted loop playsInline preload="metadata" />
      </div>
      <button type="button" className="film-pause" onClick={() => setOn((v) => !v)}>
        {on ? "Pause" : "Play"}
      </button>
    </>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const is = (to: string) => {
    if (to === "/#products") return pathname === "/" && hash === "products";
    if (to === "/") return pathname === "/";
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <div className="site">
      <header className="top">
        <Link to="/" className="brand" aria-label="DAP home">
          <Mark />
          <b>DAP</b>
        </Link>
        <nav aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.to} href={item.to} className={is(item.to) ? "on" : ""}>
              {item.l}
            </a>
          ))}
        </nav>
        <div className="top-acts">
          <a href={BELLWETHER} target="_blank" rel="noreferrer">
            Try
          </a>
          <a className="top-build" href={CTA}>
            Build
          </a>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="foot">
        <span>Dartmouth Advisory Partners · Toronto</span>
        <span>Policy compiles. Governance executes. Context compounds.</span>
        <Link to="/deck">Copy deck</Link>
      </footer>
    </div>
  );
}

export { Mark };
