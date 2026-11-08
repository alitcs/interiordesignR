import { useState, type FormEvent } from "react";
import { useLang } from "../i18n/LangContext";

export function Nav({ solid }: { solid: boolean }) {
  const { t, lang, toggle } = useLang();
  return (
    <header className={`nav${solid ? " is-solid" : ""}`}>
      <a className="brand" href="#top" aria-label={t("brand")}>
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
          <rect x="1" y="1" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M10 23V15a6 6 0 0 1 12 0v8M7 23h18" stroke="currentColor" strokeWidth="1.6" fill="none" />
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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const body = new URLSearchParams();
    for (const [key, value] of fields) {
      if (typeof value === "string") body.append(key, value);
    }

    setStatus("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Unable to submit project inquiry", error);
      setStatus("error");
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <p className="eyebrow">{t("contact.eyebrow")}</p>
        <h2 dangerouslySetInnerHTML={{ __html: t("contact.title") }} />
        <form className="contact__form" name="project-inquiry" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="project-inquiry" />
          <div className="contact__honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="bot-field" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="contact__form-intro">{t("contact.cta")}</p>
          <label htmlFor="contact-name">{t("contact.name")}</label>
          <input id="contact-name" name="name" autoComplete="name" required />
          <label htmlFor="contact-email">{t("contact.email")}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="contact-message">{t("contact.message")}</label>
          <textarea id="contact-message" name="message" rows={4} required />
          <button className="contact__submit" type="submit" disabled={status === "sending"}>
            <span>{status === "sending" ? t("contact.sending") : t("contact.send")}</span><span aria-hidden="true">↗</span>
          </button>
          <p className="contact__status" role="status" aria-live="polite">
            {status === "success" ? t("contact.success") : status === "error" ? t("contact.error") : ""}
          </p>
        </form>
        <p className="contact__details">{t("contact.micro")}</p>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot">
      <a className="foot__brand" href="#top"><span className="foot__mark">IS</span><span>{t("brand")}</span></a>
      <span>© {new Date().getFullYear()} {t("brand")}</span>
      <a className="foot__top" href="#top">{t("foot.top")} <span aria-hidden="true">↑</span></a>
    </footer>
  );
}
