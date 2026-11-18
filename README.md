# Akashveer Singh — Portfolio

Personal portfolio of **Akashveer Singh**, an aspiring AI/ML Engineer and B.Tech Computer Science student at Jawaharlal Nehru University.

It's a static single-page site with a dedicated case-study page for each project.

## Stack

| Concern    | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | React 19 + TypeScript                                      |
| Build      | Vite 8                                                     |
| Styling    | Tailwind CSS v4 (design tokens in `src/styles/index.css`)  |
| Motion     | Motion (`motion/react`), with reduced-motion support       |
| Routing    | React Router (`/` and `/projects/:slug`)                   |
| Icons      | Lucide, plus inline SVG brand icons                        |
| Fonts      | Geist and Geist Mono (Google Fonts)                        |

There's no backend, and no environment variables are required.

## Project structure

```
├── index.html              # meta, Open Graph, fonts
├── public/
│   ├── favicon.svg         # AS monogram
│   └── robots.txt
├── vercel.json             # SPA rewrite so /projects/* deep links work
└── src/
    ├── main.tsx / App.tsx  # router + layout shell
    ├── styles/index.css    # tokens, base styles, keyframes
    ├── data/               # all content lives here
    │   ├── profile.ts
    │   ├── projects.ts     # project copy, verified against each repo
    │   ├── skills.ts       # skill groups + which projects use each skill
    │   └── socialLinks.ts
    ├── hooks/              # useActiveSection, useScrolled, useDocumentTitle
    ├── lib/scroll.ts
    ├── pages/              # HomePage, ProjectPage (case study), NotFoundPage
    └── components/
        ├── layout/         # Navbar, Footer
        ├── sections/       # Hero, About, Projects, Skills, Education, Contact
        ├── hero/           # PipelineVisual (Data → Models → Apps SVG)
        ├── projects/       # FeaturedProject, ProjectCard, ProjectLinks, visuals/*
        └── ui/             # Button, Reveal, SectionHeading, SectionLink, Tag, BrandIcons
```

## Run locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serves dist/ locally
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects **Vite** automatically: the build command is `npm run build` and the output directory is `dist`.
4. Deploy. `vercel.json` rewrites every route to `index.html`, so case-study URLs such as `/projects/ai-career-coach` work on refresh and when shared.

Or use the CLI: `npx vercel` for a preview, then `npx vercel --prod`.

## Updating content

All copy lives in `src/data/`:

- **Add a résumé or email.** Add the URL to `socialLinks.ts` and render it in `Contact.tsx`. Per the brief, the site has no résumé button or email until real ones exist.
- **Add real screenshots.** Put optimised `.webp` files in `src/assets/`, then use them in place of the illustration in `ProjectVisual.tsx`. Every current visual is labelled "Illustration" so it can't be mistaken for a product screenshot.
- **Add an Open Graph image.** Add a 1200×630 PNG to `public/` and set `og:image` and `twitter:image` in `index.html`, using absolute URLs on your final domain.

## Content accuracy

Project descriptions were checked against the public repositories. Where something couldn't be verified, it was left out or labelled:

- **AI Career Coach:** the README gives inconsistent test totals (213, 227 and 229), so the site states the number of test modules (15) instead.
- **Housing Price Predictor:** the README's R² figures appear only on the case-study page, marked as reported without a documented evaluation split.
- **Image Classification System:** the repository publishes no accuracy metrics, so none are shown.
- **Rally for Big Cats:** the repository (`finalproject`) has four contributors. The site credits Akashveer with the frontend, the donation interface and the payment UX only.
