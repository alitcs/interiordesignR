export type Room = "living" | "bedroom" | "kitchen" | "closet";
export type Lang = "en" | "fa";
export type LocalizedText = Record<Lang, string>;
export type MediaStage = "before" | "after" | "inprogress" | "before-after";

export interface ProjectMedia {
  src: string;
  stage: MediaStage;
  video: boolean;
}

export interface Project {
  id: string;
  room: Room;
  media: ProjectMedia[];
}

const media = (project: string, file: string): ProjectMedia => {
  const stem = file.slice(0, file.lastIndexOf(".")).toLowerCase();
  const stage: MediaStage = stem.startsWith("inprogress")
    ? "inprogress"
    : stem.startsWith("before&after")
      ? "before-after"
      : stem.startsWith("before")
        ? "before"
        : "after";

  return {
    src: `/projects/projects/${project}/${file}`,
    stage,
    video: file.endsWith(".mp4")
  };
};

const project = (
  id: string,
  room: Room,
  files: string[]
): Project => ({
  id,
  room,
  media: files.map(file => media(id, file))
});

export const projects: Project[] = [
  project("project1-kitchen", "kitchen", [
    "after.webp", "before.webp", "inprogress.jpg", "inprogress1.jpg", "inprogress2.jpg",
    "inprogress3.jpg", "inprogress4.jpg", "inprogress5.jpg", "inprogress6.jpg",
    "inprogress7.jpg", "inprogress8.jpg"
  ]),
  project("project2-living-room", "living", ["after.webp", "before.webp"]),
  project("project3-kitchen", "kitchen", [
    "after.mp4", "after1.jpg", "after2.jpg", "before1.jpg", "before2.jpg"
  ]),
  project("project4-kitchen", "kitchen", [
    "inprogress.jpg", "inprogress1.jpg", "inprogress2.jpg", "inprogress3.jpg",
    "inprogress4.jpg", "inprogress5.jpg", "inprogress6.jpg"
  ]),
  project("project5-kitchen", "kitchen", ["inprogress.jpg"]),
  project("project6-closet", "closet", ["after.jpg", "after.mp4", "after1.jpg"]),
  project("project7-closet", "closet", ["after.jpg"]),
  project("project8-closet", "closet", ["after.jpg"]),
  project("project9-closet", "closet", ["after.jpg"]),
  project("project10-kitchen", "kitchen", [
    "after.jpg", "after1.jpg", "after2.jpg", "after3.jpg"
  ]),
  project("project11-living-room", "living", ["after.jpg", "after1.jpg"]),
  project("project12-living-room", "living", [
    "after.jpg", "after1.jpg", "after2.jpg", "before&after.mp4", "inprogress.jpg", "inprogress1.jpg"
  ]),
  project("project13-closet", "closet", [
    "inprogress.jpg", "inprogress.mp4", "inprogress1.jpg", "inprogress2.jpg"
  ])
];

export const beforeAfterProjects = projects.flatMap(project => {
  const before = project.media.filter(item => item.stage === "before" && !item.video);
  const after = project.media.filter(item => item.stage === "after" && !item.video);

  // Show one comparison per project, even when it has multiple matching image pairs.
  return before.flatMap(beforeImage => {
    const beforeName = beforeImage.src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
    const beforeKey = beforeName.replace(/^before/i, "").toLowerCase();
    const afterImage = after.find(item => {
      const afterName = item.src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
      return afterName.replace(/^after/i, "").toLowerCase() === beforeKey;
    });

    return afterImage ? [{ project, before: beforeImage, after: afterImage }] : [];
  }).slice(0, 1);
});

export const hero = {
  src: "/projects/projects/temp.webp",
  alt: {
    en: "Renovated kitchen in warm wood and pale stone",
    fa: "آشپزخانه بازسازی‌شده با چوب گرم و سنگ روشن"
  } satisfies LocalizedText
};

export const siteVisit = {
  src: "/projects/projects/building-site-id-.webp",
  alt: {
    en: "Avesta building, a project site",
    fa: "ساختمان آوستا، محل اجرای یکی از پروژه‌ها"
  } satisfies LocalizedText
};
