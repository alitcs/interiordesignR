import { useEffect, useState } from "react";
import Lenis from "lenis";

/**
 * Keep scroll progress and header state in sync without rerendering on every scroll event.
 */
export function useScrollEffects() {
  const [solid, setSolid] = useState(false);

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

  return { solid };
}
