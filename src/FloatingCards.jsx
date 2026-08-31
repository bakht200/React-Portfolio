// Satellite icon cards — locked to the same arc centers/radii as PremiumArcPainter

import PremiumArcPainter from './PremiumArcPainter'
import { useContent } from './content/ContentContext'
import { getSideAngles, pointOnArc } from './orbitGeometry'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const ICONS = {
  figma: asset('orbit-icons/figma.svg'),
  framer: asset('orbit-icons/framer.svg'),
  notion: asset('orbit-icons/notion.svg'),
  paintBoard: asset('orbit-icons/paint-board.svg'),
  penTool: asset('orbit-icons/pen-tool.svg'),
  dashboard: asset('orbit-icons/dashboard.svg'),
  idea: asset('orbit-icons/idea.svg'),
  photoshop: asset('orbit-icons/photoshop.svg'),
  aiWeb: asset('orbit-icons/ai-web.svg'),
  chatgpt: asset('orbit-icons/chatgpt.svg'),
  claude: asset('orbit-icons/claude.svg'),
  css: asset('orbit-icons/css.svg'),
  tailwind: asset('orbit-icons/tailwind.svg'),
  behance: asset('orbit-icons/behance.svg'),
  dribbble: asset('orbit-icons/dribbble.svg'),
  pinterest: asset('orbit-icons/pinterest.svg'),
  smartphone: asset('orbit-icons/smartphone.svg'),
  aiAudio: asset('orbit-icons/ai-audio.svg'),
}

const ORBIT_RING = 1
const CARD = 52

function buildSatellites(side, icons, durationMs) {
  const { startAngle } = getSideAngles(side)
  const startDeg = (startAngle * 180) / Math.PI
  const count = icons.length
  if (count === 0) return []
  const gap = 360 / count
  const reverse = side === 'right'
  const phase = side === 'right' ? gap / 2 : 0
  const duration = durationMs / 1000

  return icons.map((icon, index) => ({
    id: `${side}-${icon}-${index}`,
    ring: ORBIT_RING,
    icon,
    angle: startDeg + phase + gap * index,
    duration,
    reverse,
  }))
}

function Satellite({ item }) {
  const angleRad = (item.angle * Math.PI) / 180
  const { cx, cy, x, y } = pointOnArc(item.side, item.ring, angleRad)

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
        <Satellite key={item.id} item={{ ...item, side }} />
      ))}
    </g>
  )
}

export default function FloatingCards() {
  const { content } = useContent()
  const { leftIcons, rightIcons, durationMs } = content.orbit

  const leftSatellites = buildSatellites('left', leftIcons, durationMs)
  const rightSatellites = buildSatellites('right', rightIcons, durationMs)

  return (
    <div className="floating-cards" aria-hidden="true">
      <PremiumArcPainter>
        <Satellites side="left" items={leftSatellites} />
        <Satellites side="right" items={rightSatellites} />
      </PremiumArcPainter>
    </div>
  )
}
