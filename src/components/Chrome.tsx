import { useLang } from "../i18n/LangContext";

export function Nav({ solid, hidden }: { solid: boolean; hidden: boolean }) {
  const { t, lang, toggle } = useLang();
  return (
    <header className={`nav${solid ? " is-solid" : ""}${hidden ? " is-hidden" : ""}`}>
      <a className="brand" href="#top" aria-label={t("brand")}>
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
          <rect width="32" height="32" fill="currentColor" />
          <path d="M10 23V15a6 6 0 0 1 12 0v8M7 23h18" stroke="var(--bg)" strokeWidth="1.6" fill="none" />
        </svg>
        <span>{t("brand")}</span>
      </a>
      <div className="nav__end">
        <button className="lang" type="button" onClick={toggle} aria-label={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}>
          {t("lang.other")}
        </button>
        <a className="btn btn--small" href="#contact">{t("cta.contact")}</a>
      </div>
    </header>
  );
}

export function Contact() {
  const { t } = useLang();
  return (
    <section className="contact" id="contact">
      <p className="eyebrow">{t("contact.eyebrow")}</p>
      <h2 dangerouslySetInnerHTML={{ __html: t("contact.title") }} />
      <div className="contact__links">
        <a href="tel:+10000000000" dir="ltr"><span>+1 (000) 000-0000</span><i /></a>
        <a href="mailto:hello@example.com"><span>hello@example.com</span><i /></a>
      </div>
      <p className="micro">{t("contact.micro")}</p>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} {t("brand")}</span>
      <a href="#top">{t("foot.top")}</a>
    </footer>
  );
}
