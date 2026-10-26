import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/**
 * One scroll loop drives everything: smooth scrolling (Lenis), the hero frame expanding,
 * the statement lighting up word by word, and the project scenes stacking. Values are written
 * straight to CSS variables so React never re-renders while scrolling.
 */
export function useScrollEffects() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let raf = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      const loop = (t: number) => { lenis!.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const target = a.getAttribute("href") === "#top" ? 0 : document.querySelector<HTMLElement>(a.getAttribute("href")!);
      if (target === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.6 });
      else (target instanceof HTMLElement ? target : document.body).scrollIntoView();
    };
    document.addEventListener("click", onClick);

    const update = () => {
      const y = scrollY, vh = innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const root = document.documentElement;
      root.style.setProperty("--progress", String(max > 0 ? y / max : 0));
      setSolid(s => { const n = y > 40; return s === n ? s : n; });
      setHidden(h => { const n = y > last.current && y > 400; return h === n ? h : n; });
      last.current = y;

      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) {
        const span = hero.offsetHeight - vh;
        hero.style.setProperty("--e", String(clamp(y / (span * 0.7))));
      }

      const st = document.querySelector<HTMLElement>(".statement");
      if (st) {
        const r = st.getBoundingClientRect();
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
        st.style.setProperty("--lit", String(p * (st.children.length + 2)));
      }

      document.querySelectorAll<HTMLElement>(".scene").forEach((el, i, all) => {
        const top = el.getBoundingClientRect().top;
        const enter = clamp(1 - top / vh);
        const next = all[i + 1];
        const leave = next ? clamp(1 - next.getBoundingClientRect().top / vh) : 0;
        el.style.setProperty("--enter", String(enter));
        el.style.setProperty("--leave", String(leave));
      });
    };

    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update); removeEventListener("resize", update);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf); lenis?.destroy();
    };
  }, []);

  return { solid, hidden };
}
