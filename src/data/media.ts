/*
 * EDIT THIS FILE to add the designer's real work.
 *
 * 1. Drop images/videos into  /public/media  (then use src: "/media/living-01.jpg")
 * 2. Set `src` on a project (and `poster` for videos). Leave `src` empty to show a placeholder.
 * 3. Add or remove projects freely: the grid, filters and full-screen viewer update automatically.
 *
 * room: one of "living" | "bedroom" | "kitchen" | "other"
 * type: "image" | "video"
 * tone: placeholder colour (a-e); ignored once a real src is set.
 */
export type Room = "living" | "bedroom" | "kitchen" | "other";
export interface MediaItem { type: "image" | "video"; src: string; poster?: string }
export interface Project extends MediaItem {
  room: Room; tone: "a" | "b" | "c" | "d" | "e"; year: number; title: { en: string; fa: string };
}

export const hero: MediaItem = { type: "image", src: "" }; // hero photo or looping video

export const projects: Project[] = [
    { room: "living",  type: "image", src: "", tone: "a", year: 2025, title: { en: "Quiet Living Room",   fa: "اتاق نشیمن آرام" } },
    { room: "bedroom", type: "image", src: "", tone: "c", year: 2025, title: { en: "Linen Bedroom",       fa: "اتاق خواب کتانی" } },
    { room: "kitchen", type: "video", src: "", poster: "", tone: "d", year: 2024, title: { en: "Kitchen Walkthrough", fa: "تور آشپزخانه" } },
    { room: "living",  type: "image", src: "", tone: "b", year: 2024, title: { en: "Warm Reading Corner", fa: "گوشه مطالعه گرم" } },
    { room: "other",   type: "image", src: "", tone: "e", year: 2024, title: { en: "Entry & Hallway",     fa: "ورودی و راهرو" } },
    { room: "bedroom", type: "image", src: "", tone: "a", year: 2023, title: { en: "Guest Suite",         fa: "اتاق مهمان" } },
    { room: "kitchen", type: "image", src: "", tone: "c", year: 2023, title: { en: "Dining Space",        fa: "فضای ناهارخوری" } },
    { room: "living",  type: "video", src: "", poster: "", tone: "d", year: 2023, title: { en: "Living Room Reveal",  fa: "رونمایی اتاق نشیمن" } }
  ];
