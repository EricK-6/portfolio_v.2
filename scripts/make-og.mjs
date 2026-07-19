import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

// Regenerates public/og-image.png (the datasheet social preview).
// sharp is not a project dependency — install it temporarily to run:
//   npm i --no-save sharp && node scripts/make-og.mjs
// Bump the ?v= query on the og:image URLs in index.html afterwards so
// LinkedIn/Twitter refetch the cached image.

// 1200x630 OG image: the datasheet's front page, paper theme.
const W = 1200
const H = 630
const SANS = 'Segoe UI, Helvetica, Arial, sans-serif'
const MONO = 'Consolas, Menlo, Courier New, monospace'
const PAPER = '#f7f6f3'
const CHIP_FILL = '#fbfaf8'
const INK = '#1c1917'
const EMERALD = '#10b981'
const GREY_400 = '#a8a29e'
const GREY_500 = '#78716c'
const GREY_600 = '#57534e'
const HAIRLINE = 'rgba(28, 25, 23, 0.18)'
const GRID = 'rgba(28, 25, 23, 0.05)'

const LX = 58 // left margin
const RX = 1142 // right margin
const TABLE_R = 760 // spec table right edge

// spec table: label baseline + value, dividers drawn between rows
const specRow = (y, label, value) => `
  <text x="${LX}" y="${y}" font-family="${MONO}" font-size="14" letter-spacing="3" fill="${GREY_500}">${label}</text>
  <text x="${LX + 186}" y="${y}" font-family="${SANS}" font-size="21" fill="${INK}">${value}</text>`

// DIP-8 pin configuration, top view, notch up — the joke pinout
const CHIP_CX = 962
const CHIP_X = 884, CHIP_Y = 312, CHIP_W = 156, CHIP_H = 216
const PIN_YS = [352, 400, 448, 496]
const LEFT_PINS = ['VCC', 'EMBED', 'FPGA', 'CLOUD'] // pins 1-4
const RIGHT_PINS = ['GND', 'TEACH', 'REACT', 'SOLDER'] // pins 8-5

const pins = PIN_YS.map((c, i) => `
  <rect x="858" y="${c - 6}" width="26" height="12" fill="${CHIP_FILL}" stroke="${INK}" stroke-width="1.5"/>
  <rect x="${CHIP_X + CHIP_W}" y="${c - 6}" width="26" height="12" fill="${CHIP_FILL}" stroke="${INK}" stroke-width="1.5"/>
  <text x="896" y="${c + 4}" font-family="${MONO}" font-size="12" fill="${GREY_400}">${i + 1}</text>
  <text x="${CHIP_X + CHIP_W - 12}" y="${c + 4}" font-family="${MONO}" font-size="12" fill="${GREY_400}" text-anchor="end">${8 - i}</text>
  <text x="846" y="${c + 5}" font-family="${MONO}" font-size="15" fill="${GREY_600}" text-anchor="end">${LEFT_PINS[i]}</text>
  <text x="1078" y="${c + 5}" font-family="${MONO}" font-size="15" fill="${GREY_600}">${RIGHT_PINS[i]}</text>`).join('\n')

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="${GRID}" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- engineering graph paper -->
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- header: chip mark + name, part number right -->
  <g transform="translate(58, 56) scale(1.5)" fill="none" stroke="${GREY_500}" stroke-width="1.5" stroke-linecap="round">
    <rect x="8" y="5" width="8" height="14" rx="1"/>
    <path d="M5 8h3M5 12h3M5 16h3M16 8h3M16 12h3M16 16h3"/>
    <path d="M10.8 5a1.2 1.2 0 0 0 2.4 0" stroke-width="1.2"/>
  </g>
  <text x="112" y="80" font-family="${MONO}" font-size="17" letter-spacing="6" fill="${GREY_500}">ERIC KIM</text>
  <text x="${RX}" y="80" font-family="${MONO}" font-size="18" letter-spacing="2" fill="${GREY_600}" text-anchor="end">EKmega327P</text>

  <!-- header rule, ending in the hollow node from the site -->
  <line x1="${LX}" y1="106" x2="${RX}" y2="106" stroke="${HAIRLINE}" stroke-width="1.5"/>
  <rect x="${RX - 8}" y="102" width="8" height="8" fill="${PAPER}" stroke="${GREY_500}" stroke-width="1.2"/>

  <!-- title block -->
  <text x="${LX - 2}" y="196" font-family="${SANS}" font-size="56" font-weight="bold" fill="${INK}">Dohyun (Eric) Kim<tspan fill="${EMERALD}">_</tspan></text>
  <text x="${LX}" y="240" font-family="${SANS}" font-size="22" fill="${GREY_600}">Computer Systems Engineering (Hons) · University of Auckland</text>

  <!-- specifications -->
  <line x1="${LX}" y1="300" x2="${TABLE_R}" y2="300" stroke="${HAIRLINE}" stroke-width="1.5"/>
  ${specRow(338, 'PART NO.', 'EKmega327P · rev 2.0')}
  <line x1="${LX}" y1="358" x2="${TABLE_R}" y2="358" stroke="${HAIRLINE}" stroke-width="1"/>
  ${specRow(394, 'FOCUS', 'Embedded · Full stack · Digital hardware')}
  <line x1="${LX}" y1="414" x2="${TABLE_R}" y2="414" stroke="${HAIRLINE}" stroke-width="1"/>
  ${specRow(450, 'GRADUATES', 'November 2027')}
  <line x1="${LX}" y1="470" x2="${TABLE_R}" y2="470" stroke="${HAIRLINE}" stroke-width="1"/>
  <text x="${LX}" y="506" font-family="${MONO}" font-size="14" letter-spacing="3" fill="${GREY_500}">STATUS</text>
  <circle cx="${LX + 192}" cy="500" r="5.5" fill="${EMERALD}"/>
  <text x="${LX + 208}" y="506" font-family="${SANS}" font-size="21" fill="${INK}">In stock · open to internships, summer 26/27</text>
  <line x1="${LX}" y1="526" x2="${TABLE_R}" y2="526" stroke="${HAIRLINE}" stroke-width="1.5"/>
  <text x="${LX}" y="560" font-family="${MONO}" font-size="13" fill="${GREY_500}">note 1 · a clean solder joint is worth a thousand debug sessions.</text>

  <!-- package: DIP-8 top view -->
  <text x="${CHIP_CX}" y="296" font-family="${MONO}" font-size="14" letter-spacing="4" fill="${GREY_500}" text-anchor="middle">PACKAGE · DIP-8</text>
  <rect x="${CHIP_X}" y="${CHIP_Y}" width="${CHIP_W}" height="${CHIP_H}" rx="4" fill="${CHIP_FILL}" stroke="${INK}" stroke-width="2"/>
  <path d="M${CHIP_CX - 15} ${CHIP_Y}a15 15 0 0 0 30 0" fill="none" stroke="${INK}" stroke-width="2"/>
  ${pins}
  <text x="${CHIP_CX}" y="560" font-family="${MONO}" font-size="13" letter-spacing="3" fill="${GREY_500}" text-anchor="middle">TOP VIEW</text>

  <!-- url -->
  <text x="${W / 2}" y="600" font-family="${MONO}" font-size="16" letter-spacing="4" fill="${GREY_500}" text-anchor="middle">erick-6.github.io/portfolio_v.2</text>
</svg>`

await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H)
  .png()
  .toFile(fileURLToPath(new URL('../public/og-image.png', import.meta.url)))
console.log('og-image.png written')
