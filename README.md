# Interior Studio

React + TypeScript (Vite) site with English / Persian (RTL) support. One straight scroll: hero, work, contact.

```
npm install
npm run dev       # local dev
npm run build     # type-check + production build to dist/
```

- **Add work:** put photos in `public/media/pictures/`, then update `src/data/media.ts`. Keep matching before/after photos paired in `comparisons`; add active jobs to `inProgress`. Archived video files and their posters are kept in `media-archive/` and are not included in the site.
- **Edit copy / translations:** `src/i18n/strings.ts`.
- **Inquiries:** enable form detection for the site in Netlify and deploy the site. Submissions to `project-inquiry` appear in Netlify Forms; configure a form notification there when an email address is available. The visible React form and the static form definition in `index.html` must use the same name and fields. Local Vite does not process submissions.
- **Deploy:** connect the repo to Netlify (settings are in `netlify.toml`).
