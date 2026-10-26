import { useEffect, useState } from "react";
import { useLang } from "./i18n/LangContext";
import { useScrollEffects } from "./hooks";
import { Hero, Statement, Work } from "./components/Showcase";
import { Contact, Footer, Nav } from "./components/Chrome";

export function App() {
  const { t, switching } = useLang();
  const [ready, setReady] = useState(false);
  const { solid, hidden } = useScrollEffects();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setReady(true), reduce ? 0 : 900);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => { document.body.classList.toggle("ready", ready); }, [ready]);

  return (
    <div className={switching ? "lang-switch" : undefined}>
      <div className="intro" aria-hidden="true"><span className="intro__mark">I<i />S</span></div>
      <div className="progress" aria-hidden="true"><span /></div>
      <a className="skip" href="#main">{t("skip")}</a>
      <Nav solid={solid} hidden={hidden} />
      <main id="main">
        <Hero />
        <Statement />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
