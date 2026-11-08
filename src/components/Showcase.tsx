import { useState } from "react";
import { comparisons, hero, inProgress, projectSite, type Comparison, type Photo } from "../data/media";
import { useLang } from "../i18n/LangContext";

function Image({ photo, className = "", eager = false }: { photo: Photo; className?: string; eager?: boolean }) {
  const { lang } = useLang();
  return <img className={className} src={photo.src} alt={photo.alt[lang]} decoding="async" loading={eager ? "eager" : "lazy"} />;
}

export function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" id="top">
      <div className="hero__image"><Image photo={hero} eager /></div>
      <div className="hero__veil" />
      <div className="hero__content">
        <p className="hero__eyebrow"><span className="hero__dot" />{t("hero.eyebrow")}</p>
        <h1 className="hero__title">
          <span>{t("hero.l1")}</span>
          <span dangerouslySetInnerHTML={{ __html: t("hero.l2") }} />
        </h1>
        <div className="hero__bottom">
          <p>{t("hero.intro")}</p>
          <a className="hero__link" href="#work"><span>{t("hero.explore")}</span><span aria-hidden="true">↘</span></a>
        </div>
      </div>
      <div className="hero__index" aria-hidden="true"><span>01</span><i /><span>03</span></div>
    </section>
  );
}

export function Statement() {
  const { t } = useLang();
  return (
    <section className="manifesto" aria-label={t("statement.label")}>
      <p className="eyebrow">{t("statement.label")}</p>
      <p className="manifesto__copy">{t("statement")}</p>
      <span className="manifesto__mark" aria-hidden="true">I<i />S</span>
    </section>
  );
}

function ComparisonCard({ id, title, room, before, after }: Comparison) {
  const { lang, t } = useLang();
  const [split, setSplit] = useState(50);

  return (
    <article className={`comparison-card comparison-card--${id}`} id={`project-${id}`}>
      <div className="comparison-card__topline">
        <span className="comparison-card__number">{String(comparisons.findIndex(item => item.id === id) + 1).padStart(2, "0")}</span>
        <span>{t(`room.${room}`)}</span>
      </div>
      <div className="comparison-card__image" style={{ ["--split" as string]: `${split}%` }}>
        <Image photo={before} className="comparison-card__before" />
        <div className="comparison-card__reveal">
          <Image photo={after} className="comparison-card__after" />
        </div>
        {split >= 15 && <span className="comparison-card__label comparison-card__label--before">{t("work.before")}</span>}
        {split <= 85 && <span className="comparison-card__label comparison-card__label--after">{t("work.after")}</span>}
        <span className="comparison-card__divider" aria-hidden="true">
          <span className="comparison-card__handle">↔</span>
        </span>
        <span className="comparison-card__hint" aria-hidden="true">{t("work.drag")}</span>
        <input
          className="comparison-card__control"
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={event => setSplit(Number(event.target.value))}
          aria-label={`${t("work.compare")} — ${title[lang]}`}
          aria-valuetext={`${t("work.before")}: ${split}%, ${t("work.after")}: ${100 - split}%`}
        />
      </div>
      <div className="comparison-card__caption">
        <h3>{title[lang]}</h3>
        <span>{t("work.drag")}</span>
      </div>
    </article>
  );
}

export function Work() {
  const { lang, t } = useLang();
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <header className="work__intro">
        <div className="work__intro-index"><span>01</span><span>{t("work.eyebrow")}</span></div>
        <h2 id="work-title">{t("work.title")}</h2>
        <p>{t("work.intro")}</p>
      </header>

      <div className="comparison-grid">
        {comparisons.map(project => <ComparisonCard key={project.id} {...project} />)}
      </div>

      <section className="work__progress" aria-labelledby="progress-title">
        <div className="work__progress-copy">
          <p className="eyebrow">{t("work.inProgress")}</p>
          <h2 id="progress-title">{inProgress.title[lang]}</h2>
          <p>{t("work.inProgressNote")}</p>
          <span className="work__progress-tag"><i />{t("work.status.inProgress")}</span>
        </div>
        <div className="work__progress-image"><Image photo={inProgress.photo} /></div>
        <span className="work__progress-index" aria-hidden="true">02</span>
      </section>

      <figure className="site-card">
        <Image photo={projectSite} />
        <figcaption>
          <span>{t("work.siteTag")}</span>
          <span>{t("work.siteTitle")}</span>
        </figcaption>
      </figure>
    </section>
  );
}
