export type Room = "living" | "bedroom" | "kitchen" | "other";
export type Lang = "en" | "fa";
export type LocalizedText = Record<Lang, string>;

export interface Photo {
  src: string;
  alt: LocalizedText;
}

export interface Comparison {
  id: string;
  title: LocalizedText;
  room: Room;
  before: Photo;
  after: Photo;
}

export interface ProjectPhoto {
  id: string;
  title: LocalizedText;
  room: Room;
  photo: Photo;
}

const picture = (name: string, en: string, fa: string): Photo => ({
  src: `/media/pictures/${name}`,
  alt: { en, fa }
});

export const hero: Photo = picture(
  "kitchen-after.webp",
  "Finished kitchen in warm wood and white",
  "آشپزخانه تکمیل‌شده با چوب گرم و رنگ سفید"
);

export const comparisons: Comparison[] = [
  {
    id: "kitchen-01",
    title: { en: "A quieter kind of kitchen", fa: "آشپزخانه‌ای آرام‌تر" },
    room: "kitchen",
    before: picture("kitchen-before.webp", "Kitchen before its renovation", "آشپزخانه پیش از بازسازی"),
    after: picture("kitchen-after.webp", "Kitchen after its renovation", "آشپزخانه پس از بازسازی")
  },
  {
    id: "kitchen-02",
    title: { en: "A brighter everyday", fa: "روشنایی در زندگی روزمره" },
    room: "kitchen",
    before: picture("kitchen-before1.webp", "Second kitchen before its renovation", "آشپزخانه دوم پیش از بازسازی"),
    after: picture("kitchen-after1.webp", "Second kitchen after its renovation", "آشپزخانه دوم پس از بازسازی")
  },
  {
    id: "living-room",
    title: { en: "Room to slow down", fa: "جایی برای آرام گرفتن" },
    room: "living",
    before: picture("living-room-before.webp", "Living room before its refresh", "اتاق نشیمن پیش از بازطراحی"),
    after: picture("living-room-after.webp", "Living room after its refresh", "اتاق نشیمن پس از بازطراحی")
  }
];

export const inProgress: ProjectPhoto = {
  id: "dresser",
  title: { en: "Walnut, taking shape", fa: "شکل‌گیری کمد گردویی" },
  room: "bedroom",
  photo: picture("dresser-in-progress.webp", "Walnut dressing room during installation", "کمد لباس گردویی هنگام نصب")
};

export const projectSite = picture(
  "building-site.webp",
  "The exterior of a building at a project site",
  "نمای بیرونی ساختمان در محل پروژه"
);
