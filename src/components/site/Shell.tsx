import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

const NAV = [
  { l: "Products", to: "/" },
  { l: "How", to: "/how-it-works" },
  { l: "Papers", to: "/documents" },
  { l: "About", to: "/about" },
] as const;

export const CTA = "mailto:bsibeth@dap.solutions?subject=Build%20Your%20Context%20Layer";
export const BELLWETHER = "https://bellwether.dap.solutions";

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className ?? "size-5"} role="img" aria-hidden="true">
      <rect x="18" y="15" width="84" height="12" fill="currentColor" />
      <rect x="18" y="41" width="58" height="12" fill="var(--color-signal)" />
      <rect x="18" y="67" width="84" height="12" fill="currentColor" />
      <rect x="18" y="93" width="44" height="12" fill="currentColor" />
    </svg>
  );
}

export function HeroFilm({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onVis = () => {
      if (document.hidden || reduced) el.pause();
      else void el.play().catch(() => {});
    };
    if (reduced) {
      el.pause();
      return;
    }
    void el.play().catch(() => {});
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="hero-film" aria-hidden="true">
      <video ref={ref} src={src} muted loop playsInline preload="metadata" autoPlay />
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const is = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <div className="site">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top">
        <Link to="/" className="brand" aria-label="DAP home">
          <Mark />
          <b>DAP</b>
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="primary-nav" aria-label="Primary" className={open ? "open" : ""}>
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={is(item.to) ? "on" : ""}
              aria-current={is(item.to) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.l}
            </Link>
          ))}
        </nav>
        <div className="top-acts">
          <a href={BELLWETHER} target="_blank" rel="noreferrer noopener" aria-label="Try Bellwether (opens in a new tab)">
            Try
          </a>
          <a className="top-build" href={CTA} aria-label="Build Your Context Layer">
            Build
          </a>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="foot">
        <span>Dartmouth Advisory Partners · Toronto</span>
        <span>The context layer for institutional intelligence.</span>
        <span>Policy compiles. Governance executes. Context compounds.</span>
      </footer>
    </div>
  );
}

export { Mark };
