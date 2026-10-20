# Sachin Jaiswal — Portfolio

Personal portfolio built with Next.js 16 (App Router) and Tailwind CSS v4.
Live at [sachindev.engineer](https://www.sachindev.engineer).

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

Everything shown on the site lives in **`src/data/site.js`**:

| What | Where in `site.js` |
| --- | --- |
| Name, bio, photo, links, resume | `profile` |
| Competitive programming stats | `cpStats` |
| About text, principles, quick facts | `about` |
| Internship / education | `experience`, `education` |
| Projects | `projects` — `featured: true` puts it in the card grid; a `caseStudy` block creates `/projects/<slug>` |
| Awards and hackathons | `achievements`, `hackathons` |
| Skills | `skills` |

Static files:

- `public/projects/` — project screenshots
- `public/certificates/` — full certificates, plus 320px thumbnails in `thumbs/`
- `public/Sachin_Jaiswal_Resume.pdf` — the Resume button

## How it works

- **GitHub activity** (`src/lib/github.js`) is fetched on the server and refreshed every 12 hours.
- **⌘K command menu** (`src/components/CommandMenu.js`) — navigation, case studies, links, copy email, theme.
- **Theme** — light/dark from system preference, toggle saved in `localStorage`, applied before paint.
- **SEO** — generated Open Graph images, `sitemap.xml` and `robots.txt` (site URL is `SITE_URL` in `site.js`).
