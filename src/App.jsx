import { useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// Eric Kim's site, rev 2.0: the site as a component datasheet (part EKmega327P).
// One narrow column of prose on graph paper; the typography is the design.
// All content lives in this file, so editing the site means editing prose.
// ---------------------------------------------------------------------------

const EMAIL = 'dohyunkim290106@gmail.com'
const GITHUB = 'https://github.com/EricK-6'
const LINKEDIN = 'https://www.linkedin.com/in/erick06/'

const WORK = [
  {
    name: 'Winnie the Bot',
    year: '2025',
    body:
      'Companion robot that holds your gaze, waves, and talks back: an embedded system ' +
      'that reads as a character, not a circuit board. Dual ATmega328P NANOs run face ' +
      'tracking, arm movement, and voice dialogue simultaneously. 3rd place, UoA ECSE ' +
      'Design Competition.',
    links: [],
  },
  {
    name: 'Spottern!',
    year: '2026',
    body:
      'Statement-level fraud detection: a serverless AWS pipeline of SNS, Lambda, ' +
      'Textract, Bedrock, and DynamoDB, with Claude Opus 4.8 citing the transaction ' +
      'IDs behind every fraud flag.',
    links: [
      { label: 'live', href: 'https://erick-6.github.io/Spottern/' },
      { label: 'repo', href: 'https://github.com/EricK-6/Spottern' },
    ],
  },
  {
    name: 'Sentiment PULSE',
    year: '2026',
    body:
      'Real-time sentiment dashboard: streaming text through Kinesis, Lambda, and ' +
      'Comprehend into DynamoDB, read by a live React dashboard on Amplify.',
    links: [
      { label: 'demo', href: 'https://master.d3t61ak2oiedfz.amplifyapp.com/' },
      { label: 'repo', href: 'https://github.com/EricK-6/sentiment-dashboard' },
    ],
  },
  {
    name: 'Flappy Universe',
    year: '2026',
    body:
      'Flappy Bird in VHDL on an Altera FPGA: a pixel-priority pipeline rendering ' +
      'sprites straight to VGA, no processor in sight.',
    links: [{ label: 'repo', href: 'https://github.com/jpar483/COMPSYS305_MiniProject' }],
  },
  {
    name: 'Smart Energy Monitor',
    year: '2025',
    body:
      'Embedded energy metering on the ATmega328P, with ADC signal conditioning and a ' +
      'validated PCB schematic in Altium Designer.',
    links: [
      { label: 'repo', href: 'https://github.com/uoa-ece209-2025/ec209-2025-project-2025_team_41' },
    ],
  },
]

export default function App() {
  // follow the OS on first visit; remember the visitor's explicit choice after
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      /* private mode */
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* private mode */
    }
  }, [theme])

  return (
    <div className="mx-auto max-w-[42rem] px-6 pb-4 pt-14 sm:pt-20">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-3 focus:py-2 focus:font-mono focus:text-xs dark:focus:bg-paper-dark"
      >
        Skip to content
      </a>

      <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main id="content">
        <Intro />
        <SpecTable />

        <Section id="work" index="01" title="Built and shipped">
          <ul className="space-y-7">
            {WORK.map((w) => (
              <li key={w.name}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold">{w.name}</h3>
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
                    {w.year}
                  </span>
                  {w.links.map((l) => (
                    <Ext key={l.href} href={l.href} mono>
                      {l.label}
                    </Ext>
                  ))}
                </div>
                <p className="mt-1.5 leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {w.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-neutral-600 dark:text-neutral-400">
            More on <Ext href={GITHUB}>GitHub</Ext>, including an Android meal planner and a
            PyQt forecasting desktop app.
          </p>
        </Section>

        <Section id="teaching" index="02" title="Teaching the craft">
          <div className="space-y-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
            <p>
              The constant this year is teaching. I'm a robotics instructor at ciLab,
              coaching school teams for nationwide competitions. Every session is the
              engineering loop in miniature, and watching a team's robot finally complete
              its run beats almost anything else on this page.
            </p>
            <p>
              Around the university I tutor junior engineers at the Korean Engineering Body,
              and I keep coming back to robotics: 40+ volunteer hours at NZRO 2025, then
              staff at NZRO 2026 and the World Robot Olympiad 2026 with CARES.
            </p>
          </div>
        </Section>

        <Section id="reach" index="03" title="Direct line">
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            Email is the direct line, and I read every message. The CVs live at the top:
            swe for software teams, eee for hardware.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-xs">
            <li>
              <a className="link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
            <li>
              <Ext href={GITHUB} mono>
                github
              </Ext>
            </li>
            <li>
              <Ext href={LINKEDIN} mono>
                linkedin
              </Ext>
            </li>
          </ul>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

function Header({ theme, onToggleTheme }) {
  return (
    <header>
      <div className="flex items-center gap-2.5">
        <ChipGlyph />
        <h1 className="font-mono text-sm font-medium uppercase tracking-[0.3em]">
          Eric Kim
          <span className="sr-only">, Dohyun Kim, Computer Systems Engineering student</span>
        </h1>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="print-hidden ml-auto inline-flex h-7 w-7 items-center justify-center border hairline text-neutral-500 transition-colors hover:text-ink dark:text-neutral-400 dark:hover:text-ink-dark"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
      <div className="mt-3.5 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-xs lowercase text-neutral-600 dark:text-neutral-400">
        <nav aria-label="Sections" className="flex gap-6">
          <a className="transition-colors hover:text-ink dark:hover:text-ink-dark" href="#work">
            projects
          </a>
          <a className="transition-colors hover:text-ink dark:hover:text-ink-dark" href="#teaching">
            teaching
          </a>
          <a className="transition-colors hover:text-ink dark:hover:text-ink-dark" href="#reach">
            contact
          </a>
        </nav>
        <div className="ml-auto flex gap-5">
          <a className="link" href="./CV_SWE.pdf" target="_blank" rel="noreferrer">
            cv · swe
            <Glyph>↓</Glyph>
          </a>
          <a className="link" href="./CV_EEE.pdf" target="_blank" rel="noreferrer">
            cv · eee
            <Glyph>↓</Glyph>
          </a>
        </div>
      </div>
      {/* header rule ends in a hollow node, like a net on a schematic */}
      <div className="relative mt-5 border-t hairline">
        <span
          aria-hidden="true"
          className="absolute -top-[3.5px] right-0 h-1.5 w-1.5 border hairline bg-paper dark:bg-paper-dark"
        />
      </div>
    </header>
  )
}

function Intro() {
  return (
    <div className="mt-10 space-y-4 leading-relaxed">
      <p>
        Kia ora! I'm Eric, Dohyun Kim on paper, a penultimate Computer Systems
        Engineering (Hons) student at the University of Auckland. This page is my
        datasheet, and I'm the component.
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        I like the boundary where hardware meets software: microcontrollers with no operating
        system underneath, FPGAs drawing to a screen pixel by pixel, and the cloud pipelines
        that make sense of the data afterwards. My favourite projects are the ones where a
        soldering iron and a deploy script get used in the same week.
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        I'm looking for a summer internship, November 2026 to February 2027. The
        specifications below are current; the{' '}
        <a className="link" href={`mailto:${EMAIL}`}>
          inbox
        </a>{' '}
        is open.
      </p>
    </div>
  )
}

// the one table on the site: quick facts, datasheet style
function SpecTable() {
  return (
    <section aria-label="Specifications" className="mt-10">
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
        Specifications
      </h2>
      <dl className="mt-3 divide-y divide-neutral-300/60 border-y hairline dark:divide-neutral-800/80">
        <SpecRow label="part no.">EKmega327P · rev 2.0</SpecRow>
        <SpecRow label="programme">
          BE (Hons), Computer Systems Engineering, University of Auckland
        </SpecRow>
        <SpecRow label="graduates">November 2027</SpecRow>
        <SpecRow label="focus">
          embedded systems · full stack development · digital hardware design
        </SpecRow>
        <SpecRow label="certified">
          <Ext href="https://www.credly.com/badges/9865f524-64b4-45e4-9f56-8c226ec8308a/public_url">
            AWS Cloud Practitioner
          </Ext>{' '}
          ·{' '}
          <Ext href="https://www.credly.com/badges/e924df22-3bc9-48c2-847d-d6077a5551d0/public_url">
            AWS AI Practitioner
          </Ext>
        </SpecRow>
        <SpecRow label="status">
          <span className="inline-flex items-baseline gap-2">
            {/* the page's single drop of colour */}
            <span
              aria-hidden="true"
              className="mt-[0.45em] inline-block h-1.5 w-1.5 self-start rounded-full bg-emerald-500"
            />
            In stock
          </span>
        </SpecRow>
      </dl>
      {/* the fortune cookie from rev 1, reborn as a datasheet footnote */}
      <p className="mt-2 font-mono text-[10px] text-neutral-500 dark:text-neutral-500">
        note 1 · a clean solder joint is worth a thousand debug sessions.
      </p>
    </section>
  )
}

function SpecRow({ label, children }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 px-1 py-2.5 sm:grid-cols-[8rem_1fr]">
      <dt className="pt-[3px] font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed">{children}</dd>
    </div>
  )
}

function Section({ id, index, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-14">
      <div className="flex items-center gap-4">
        <h2
          id={`${id}-h`}
          className="flex items-baseline gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400"
        >
          <span aria-hidden="true">{index}</span>
          <span>{title}</span>
        </h2>
        <div className="flex-1 border-t border-dashed hairline" />
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-16 flex items-center justify-between gap-4 border-t hairline pb-10 pt-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500">
        <span className="normal-case">EKmega327P</span> · © 2026 Dohyun (Eric) Kim
      </p>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500">
        Auckland, NZ
      </span>
    </footer>
  )
}

// external link: quiet underline + a small ↗, mono variant for link rows
function Ext({ href, mono = false, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`link ${mono ? 'font-mono text-xs' : ''}`}
    >
      {children}
      <Glyph>↗</Glyph>
    </a>
  )
}

function Glyph({ children }) {
  return (
    <span aria-hidden="true" className="ml-0.5 font-mono text-[0.75em]">
      {children}
    </span>
  )
}

// the personal mark: an 8-pin DIP package, top view, notch up
function ChipGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="text-neutral-500 dark:text-neutral-400"
    >
      <rect x="8" y="5" width="8" height="14" rx="1" />
      <path d="M5 8h3M5 12h3M5 16h3M16 8h3M16 12h3M16 16h3" />
      <path d="M10.8 5a1.2 1.2 0 0 0 2.4 0" strokeWidth="1.2" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
