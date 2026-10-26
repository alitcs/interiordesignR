import { hero, projects, type MediaItem, type Project } from "../data/media";
import { useLang } from "../i18n/LangContext";

export function Placeholder({ tone = "a", label }: { tone?: string; label?: boolean }) {
  const { t } = useLang();
  return (
    <div className={`ph ph--${tone}`}>
      <span className="ph__win" />
      {label && <span className="ph__label">{t("work.soon")}</span>}
    </div>
  );
}

function Media({ item, tone, label }: { item: MediaItem; tone?: string; label?: boolean }) {
  if (!item.src) return <Placeholder tone={tone} label={label} />;
  if (item.type === "video") return <video src={item.src} poster={item.poster} autoPlay muted loop playsInline />;
  return <img src={item.src} alt="" decoding="async" />;
}

export function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" id="top">
      <div className="hero__stick">
        <p className="hero__eyebrow">{t("hero.eyebrow")}</p>
        <h1 className="hero__title">
          <span className="hl hl--a"><span>{t("hero.l1")}</span></span>
          <span className="hl hl--b"><span dangerouslySetInnerHTML={{ __html: t("hero.l2") }} /></span>
        </h1>
        <div className="hero__frame"><div className="hero__img"><Media item={hero} tone="a" /></div></div>
        <a className="cue" href="#statement"><span className="cue__line" /><span>{t("hero.scroll")}</span></a>
      </div>
    </section>
  );
}

export function Statement() {
  const { t } = useLang();
  const words = t("statement").split(" ");
  return (
    <section className="statement-wrap" id="statement">
      <p className="statement" style={{ ["--n" as string]: words.length }}>
        {words.map((w, i) => <span key={i} style={{ ["--i" as string]: i }}>{w} </span>)}
      </p>
    </section>
  );
}

function Scene({ p, i, total }: { p: Project; i: number; total: number }) {
  const { lang, t } = useLang();
  const n = (x: number) => String(x).padStart(2, "0");
  return (
    <article className="scene" style={{ zIndex: i + 1 }}>
      <div className="scene__inner">
        <div className="scene__media"><Media item={p} tone={p.tone} label /></div>
        <div className="scene__shade" />
        <div className="scene__text">
          <div className="scene__meta">
            <span>{n(i + 1)} / {n(total)}</span>
            <span>{t(`room.${p.room}`)} · {p.year}</span>
          </div>
          <h2>{p.title[lang]}</h2>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section className="work" id="work">
      {projects.map((p, i) => <Scene key={p.title.en} p={p} i={i} total={projects.length} />)}
    </section>
  );
}
