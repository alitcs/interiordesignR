import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { STRINGS, type Lang } from "./strings";

interface Ctx { lang: Lang; t: (k: string) => string; toggle: () => void; switching: boolean }
const LangCtx = createContext<Ctx>(null!);
export const useLang = () => useContext(LangCtx);

const initial = (): Lang => {
  try {
    const s = localStorage.getItem("lang");
    if (s === "fa" || s === "en") return s;
  } catch { /* storage unavailable */ }
  return /^fa/i.test(navigator.language) ? "fa" : "en";
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "fa" ? "rtl" : "ltr";
    document.title = lang === "fa" ? "طراحی داخلی R — فضاهایی زیبا برای زیستن" : "Interior Design R — Considered interiors, beautifully made";
  }, [lang]);

  const toggle = useCallback(() => {
    setSwitching(true);
    setTimeout(() => {
      setLang(l => {
        const n = l === "en" ? "fa" : "en";
        try { localStorage.setItem("lang", n); } catch { /* ignore */ }
        return n;
      });
      setSwitching(false);
    }, 180);
  }, []);

  const value = useMemo<Ctx>(() => ({
    lang, toggle, switching,
    t: k => STRINGS[lang][k] ?? STRINGS.en[k] ?? k
  }), [lang, toggle, switching]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}
