// Satellite icon cards — locked to the same arc centers/radii as PremiumArcPainter

import PremiumArcPainter from './PremiumArcPainter'
import { getSideAngles, pointOnArc } from './orbitGeometry'

// Prefix with BASE_URL so icons resolve under GitHub Pages (/React-Portfolio/)
const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const ICONS = {
  figma: asset('orbit-icons/figma.png'),
  framer: asset('orbit-icons/framer.png'),
  notion: asset('orbit-icons/notion.png'),
  paintBoard: asset('orbit-icons/paint-board.png'),
  penTool: asset('orbit-icons/pen-tool.png'),
  dashboard: asset('orbit-icons/dashboard.png'),
  idea: asset('orbit-icons/idea.png'),
  photoshop: asset('orbit-icons/photoshop.png'),
  aiWeb: asset('orbit-icons/ai-web.png'),
  chatgpt: asset('orbit-icons/chatgpt.png'),
  claude: asset('orbit-icons/claude.png'),
  css: asset('orbit-icons/css.png'),
  tailwind: asset('orbit-icons/tailwind.png'),
  behance: asset('orbit-icons/behance.png'),
  dribbble: asset('orbit-icons/dribbble.png'),
  pinterest: asset('orbit-icons/pinterest.png'),
  smartphone: asset('orbit-icons/smartphone.png'),
  aiAudio: asset('orbit-icons/ai-audio.png'),
}

/**
 * All icons on the 2nd arc only (ring index 1).
 * Equal spacing around the full 360° orbit so the visible limb
 * never goes empty (gap ≤ visible window ⇒ always ≥ 1 on-screen).
 */
const ORBIT_RING = 1
const ORBIT_DURATION_MS = 55000
const ORBIT_DURATION_S = ORBIT_DURATION_MS / 1000

const LEFT_ICONS = [
  'figma',
  'framer',
  'notion',
  'paintBoard',
  'penTool',
  'dashboard',
  'idea',
  'photoshop',
  'aiWeb',
]

const RIGHT_ICONS = [
  'chatgpt',
  'claude',
  'css',
  'tailwind',
  'behance',
  'dribbble',
  'pinterest',
  'smartphone',
  'aiAudio',
]

function buildSatellites(side, icons) {
  const { startAngle } = getSideAngles(side)
  const startDeg = (startAngle * 180) / Math.PI
  const count = icons.length
  const gap = 360 / count
  const reverse = side === 'right'
  const phase = side === 'right' ? gap / 2 : 0

  return icons.map((icon, index) => ({
    id: `${side}-${icon}-${index}`,
    ring: ORBIT_RING,
    icon,
    angle: startDeg + phase + gap * index,
    duration: ORBIT_DURATION_S,
    reverse,
  }))
}

const LEFT_SATELLITES = buildSatellites('left', LEFT_ICONS)
const RIGHT_SATELLITES = buildSatellites('right', RIGHT_ICONS)

const CARD = 52

function Satellite({ side, item }) {
  const angleRad = (item.angle * Math.PI) / 180
  const { cx, cy, x, y } = pointOnArc(side, item.ring, angleRad)

  return (
    <g
      className={`satellite-orbit${item.reverse ? ' satellite-orbit--reverse' : ''}`}
      style={{
        '--orbit-cx': `${cx}px`,
        '--orbit-cy': `${cy}px`,
        '--orbit-duration': `${item.duration}s`,
      }}
    >
      <g transform={`translate(${x} ${y})`}>
        <g className="satellite-counter">
          <foreignObject
            x={-CARD / 2}
            y={-CARD / 2}
            width={CARD}
            height={CARD}
            className="satellite-foreign"
          >
            <div className="floating-planet-face" xmlns="http://www.w3.org/1999/xhtml">
              <span className="floating-card-icon">
                <img src={ICONS[item.icon]} alt="" draggable="false" />
              </span>
            </div>
          </foreignObject>
        </g>
      </g>
    </g>
  )
}

function Satellites({ side, items }) {
  return (
    <g className={`satellites satellites--${side}`}>
      {items.map((item) => (
        <Satellite key={item.id} side={side} item={item} />
      ))}
    </g>
  )
}

export default function FloatingCards() {
  return (
    <div className="floating-cards" aria-hidden="true">
      <PremiumArcPainter>
        <Satellites side="left" items={LEFT_SATELLITES} />
        <Satellites side="right" items={RIGHT_SATELLITES} />
      </PremiumArcPainter>
    </div>
  )
}
