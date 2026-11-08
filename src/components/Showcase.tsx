import { useEffect, useRef, useState } from "react";
import { beforeAfterProjects, hero, projects, type Project, type ProjectMedia } from "../data/media";
import { useLang } from "../i18n/LangContext";

function MediaView({ item, alt, className, preview = false }: { item: ProjectMedia; alt: string; className?: string; preview?: boolean }) {
  return item.video
    ? <video className={className} src={item.src} aria-label={alt} muted loop autoPlay={!preview} playsInline preload="metadata" />
    : <img className={className} src={item.src} alt={alt} loading="lazy" decoding="async" />;
}

function coverFor(project: Project): ProjectMedia {
  const images = project.media.filter(item => !item.video);
  return images.find(item => item.stage === "after")
    ?? images.find(item => item.stage === "inprogress")
    ?? images.find(item => item.stage === "before")
    ?? images[0];
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { t } = useLang();
  const cover = coverFor(project);
  const title = t(`room.${project.room}`);

  return (
    <article className="project-card">
      <button className="project-card__open" type="button" onClick={onOpen} aria-label={`${t("work.openProject")} ${title}, ${index + 1}`}>
        <div className="project-card__visual">
          <MediaView item={cover} alt={`${title} — ${t(`work.stage.${cover.stage}`)}`} />
          <span className="project-card__index"><span>{t("work.projectLabel")}</span><span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></span>
          <span className="project-card__overlay" aria-hidden="true">
            <span>{t("work.viewProject")}</span><span className="project-card__overlay-arrow">↗</span>
          </span>
        </div>
        <span className="project-card__caption">
          <span className="project-card__title">{title}</span>
          <span className="project-card__explore" aria-hidden="true">↗</span>
        </span>
      </button>
    </article>
  );
}

function BeforeAfterCard({ project, before, after, index }: {
  project: Project;
  before: ProjectMedia;
  after: ProjectMedia;
  index: number;
}) {
  const { t } = useLang();
  const [split, setSplit] = useState(50);
  const room = t(`room.${project.room}`);

  return (
    <article className="before-after-card">
      <div className="before-after-card__image" style={{ clipPath: "inset(0)" }}>
        <img className="before-after-card__before" src={before.src} alt={`${room} — ${t("work.stage.before")}`} loading="lazy" decoding="async" />
        <div className="before-after-card__reveal" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <img className="before-after-card__after" src={after.src} alt={`${room} — ${t("work.stage.after")}`} loading="lazy" decoding="async" />
        </div>
        <span className="before-after-card__label before-after-card__label--before">{t("work.stage.before")}</span>
        <span className="before-after-card__label before-after-card__label--after">{t("work.stage.after")}</span>
        <span className="before-after-card__divider" style={{ left: `${split}%` }} aria-hidden="true">
          <span>↔</span>
        </span>
        <input
          className="before-after-card__control"
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={event => setSplit(Number(event.target.value))}
          aria-label={`${t("work.compare")} — ${room} ${index + 1}`}
          aria-valuetext={`${t("work.stage.before")}: ${100 - split}%, ${t("work.stage.after")}: ${split}%`}
        />
      </div>
      <div className="before-after-card__caption">
        <span className="before-after-card__number">{t("work.projectLabel")} {String(index + 1).padStart(2, "0")}</span>
        <h3>{room}</h3>
        <span className="before-after-card__hint">{t("work.dragCompare")}</span>
      </div>
    </article>
  );
}

function ProjectViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const active = project.media[activeIndex];
  const alt = `${t(`room.${project.room}`)} — ${t(`work.stage.${active.stage}`)}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    viewerRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setActiveIndex(index => (index + 1) % project.media.length);
      if (event.key === "ArrowLeft") setActiveIndex(index => (index - 1 + project.media.length) % project.media.length);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, project.media.length]);

  return (
    <div className="project-viewer" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="project-viewer__panel"
        role="dialog"
        aria-modal="true"
        aria-label={t(`room.${project.room}`)}
        ref={viewerRef}
        tabIndex={-1}
      >
        <header className="project-viewer__header">
          <div>
            <p className="eyebrow">{t(`room.${project.room}`)}</p>
            <h2>{t(`room.${project.room}`)}</h2>
          </div>
          <button className="project-viewer__close" type="button" onClick={onClose} aria-label={t("work.closeProject")}>×</button>
        </header>
        <div className="project-viewer__media">
          <MediaView item={active} alt={alt} />
          <span className={`project-card__status project-card__status--${active.stage}`}>
            <i aria-hidden="true" />{t(`work.stage.${active.stage}`)}
          </span>
          {project.media.length > 1 && (
            <div className="project-viewer__counter">{String(activeIndex + 1).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}</div>
          )}
        </div>
        <div className="project-viewer__rail" aria-label={t("work.projectMedia")}>
          {project.media.map((item, index) => (
            <button
              className={`project-viewer__thumb${index === activeIndex ? " is-active" : ""}`}
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${t(`work.stage.${item.stage}`)} ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <MediaView item={item} alt="" preview />
              {item.video && <span className="project-viewer__play" aria-hidden="true">▶</span>}
              <span>{t(`work.stage.${item.stage}`)}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  return (
    <section className="hero" id="top">
      <div className="hero__image"><img src={hero.src} alt={hero.alt[lang]} decoding="async" /></div>
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
      <div className="hero__index" aria-hidden="true"><span>01</span><i /><span>13</span></div>
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

export function Work() {
  const { t } = useLang();
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = grid.querySelectorAll<HTMLElement>(".project-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach(card => card.classList.add("is-visible"));
      return;
    }

    grid.classList.add("has-reveal");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    cards.forEach(card => observer.observe(card));
    return () => {
      observer.disconnect();
      grid.classList.remove("has-reveal");
    };
  }, []);

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <header className="work__intro">
        <div className="work__intro-index"><span>01</span><span>{t("work.eyebrow")}</span></div>
        <h2 id="work-title">{t("work.title")}</h2>
        <p>{t("work.intro")}</p>
      </header>
      {beforeAfterProjects.length > 0 && (
        <section className="before-after" aria-labelledby="before-after-title">
          <div className="before-after__intro">
            <p className="eyebrow">{t("work.comparisonEyebrow")}</p>
            <h2 id="before-after-title">{t("work.comparisonTitle")}</h2>
            <p>{t("work.compareIntro")}</p>
          </div>
          <div className="before-after__grid">
            {beforeAfterProjects.map((comparison, index) => (
              <BeforeAfterCard key={comparison.before.src} {...comparison} index={index} />
            ))}
          </div>
        </section>
      )}
      <div className="project-grid" ref={gridRef}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={() => setOpenProject(project)}
          />
        ))}
      </div>
      {openProject && <ProjectViewer project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}
