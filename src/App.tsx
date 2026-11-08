import { useLang } from "./i18n/LangContext";
import { useScrollEffects } from "./hooks";
import { Hero, Statement, Work } from "./components/Showcase";
import { Contact, Footer, Nav } from "./components/Chrome";

export function App() {
  const { t, switching } = useLang();
  const { solid } = useScrollEffects();

  return (
    <div className={switching ? "lang-switch" : undefined}>
      <div className="progress" aria-hidden="true"><span /></div>
      <a className="skip" href="#main">{t("skip")}</a>
      <Nav solid={solid} />
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
