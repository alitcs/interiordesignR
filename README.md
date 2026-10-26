# Interior Studio

React + TypeScript (Vite) site with English / Persian (RTL) support. One straight scroll: hero, work, contact.

```
npm install
npm run dev       # local dev
npm run build     # type-check + production build to dist/
```

- **Add work:** put files in `public/media/`, then edit `src/data/media.ts` (`src: "/media/your-file.jpg"`).
- **Edit copy / translations:** `src/i18n/strings.ts`.
- **Contact details:** `src/components/Chrome.tsx` (`Contact`).
- **Deploy:** connect the repo to Netlify (settings are in `netlify.toml`).
