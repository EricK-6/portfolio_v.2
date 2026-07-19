# Eric Kim's portfolio — rev 2.0, "the datasheet"

Hey, I'm **Dohyun (Eric) Kim**, a Computer Systems Engineering (Hons) student at the University of Auckland. This is my personal site — the thing I point recruiters at while hunting for internships.

🔗 **Live at [erick-6.github.io/portfolio_v.2](https://erick-6.github.io/portfolio_v.2/)** (new domain TBD; rev 1 stays at [erickk.cloud](https://erickk.cloud/))

Rev 2.0 is a deliberate about-face from rev 1 (a 3D "space mode" with a boarding-pass hero, terminal dock and command palette — it lives on in git history). The new site is typography-first and styled like a **component datasheet**, because that's the kind of engineer I am:

- One narrow column of prose on faint engineering graph paper.
- Mono, numbered section labels (`01 · SELECTED WORK`) and hairline rules.
- A **SPECIFICATIONS** table for the quick facts — programme, graduation, focus, certs.
- Part number `EK-2027`, an 8-pin DIP chip as the site mark and favicon.
- Exactly one drop of colour: the emerald "in stock" status dot.
- Light (paper) and dark (graphite) themes, following the OS and remembered after a toggle.

No images, no animation frameworks, no router — the writing carries the site.

## Built with

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Self-hosted fonts (Inter + JetBrains Mono via Fontsource)
- Hosted on **GitHub Pages**, deployed automatically with GitHub Actions

## Running it locally

```bash
npm install      # first time only
npm run dev      # start the dev server
```

Then open http://localhost:5173.

## Building for production

```bash
npm run build    # outputs the static site into dist/
npm run preview  # serve that build locally to double-check it
```

## Deploying

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): lint, build, publish `dist/` to `gh-pages`. Manual fallback: `npm run deploy`.

> **On `base`:** `vite.config.js` uses `base: './'` so the build works wherever it's served from.

## How it's laid out

```
├── .github/workflows/deploy.yml   # auto-deploy on push to main
├── public/
│   ├── CV_SWE.pdf                 # the two CVs linked from “reach me”
│   ├── CV_EEE.pdf
│   ├── chip.svg                   # favicon (the DIP-8 mark)
│   └── 404.html                   # matching minimal 404
├── src/
│   ├── App.jsx                    # the whole site: content + components
│   ├── main.jsx                   # fonts + mount
│   └── index.css                  # Tailwind base, graph paper, link styles
├── tailwind.config.js             # paper/ink palette, Inter + JetBrains Mono
└── vite.config.js
```

## Editing the content

Everything lives in [`src/App.jsx`](src/App.jsx): the intro prose, the `WORK` array, the spec table rows, the teaching section. Edit the text, save, done. The CVs are plain files in `public/` — replace and push.

## Notes to self

- The old maximalist site is at tag/commit history before the rev 2.0 redesign — `git log` is the museum.
- Contact is a plain `mailto:` now (no Formspree form in rev 2.0).
- `public/CV_*.pdf` are public once deployed — keep redacted versions if needed.
