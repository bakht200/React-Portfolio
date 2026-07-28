// Satellite icon cards — locked to the same arc centers/radii as PremiumArcPainter

import PremiumArcPainter from './PremiumArcPainter'
import { getSideAngles, pointOnArc } from './orbitGeometry'

const MONO = {
  stroke: 'currentColor',
  strokeWidth: 1.65,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
}

const S = 22

const ICONS = {
  figma: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M8 3h4v6H8a3 3 0 0 1 0-6z" />
      <path {...MONO} d="M12 3h4a3 3 0 0 1 0 6h-4V3z" />
      <path {...MONO} d="M8 9h4v6H8a3 3 0 0 1 0-6z" />
      <path {...MONO} d="M8 15h4a3 3 0 1 1-3 3 3 3 0 0 1 3-3z" />
      <circle cx="16" cy="12" r="3" {...MONO} />
    </svg>
  ),
  framer: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M5 3h14v6H12l7 7H5v-6h7L5 3zM5 16h7v5l-7-5z" />
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M4 6l7 5-7 5V6zM11 11l9-7v14l-9-7z" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path
        {...MONO}
        d="M12 3a9 9 0 1 0 0 18h1.2a2.4 2.4 0 0 0 0-4.8H12a1.8 1.8 0 1 1 0-3.6h4.2A9 9 0 0 0 12 3z"
      />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="9" r="1" fill="currentColor" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path
        {...MONO}
        d="M4 20l4.2-1.1L19 8.1a2.2 2.2 0 0 0 0-3.1L19 5a2.2 2.2 0 0 0-3.1 0L5.1 15.8 4 20z"
      />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M8 7L3 12l5 5M16 7l5 5-5 5M13 5l-2 14" />
    </svg>
  ),
  notion: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path
        {...MONO}
        d="M5 4h11l3 2.5V20H8.5L5 18.2V4zM9 8v9M9 8h7.5"
      />
    </svg>
  ),
  sketch: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M12 3l4 5H8l4-5zM8 8l-4 4 8 9 8-9-4-4H8z" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />
    </svg>
  ),
  webflow: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M3 7l4.5 10L12 7l4.5 10L21 7" />
    </svg>
  ),
  slack: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M8 14a2 2 0 1 1-2-2h2v2zM10 14a2 2 0 1 1 2 2v-2h-2z" />
      <path {...MONO} d="M10 8a2 2 0 1 1 2-2v2h-2zM14 8a2 2 0 1 1 2 2h-2V8z" />
      <path {...MONO} d="M16 10a2 2 0 1 1 2 2v-2h-2zM16 14a2 2 0 1 1-2 2v-2h2z" />
      <path {...MONO} d="M14 16a2 2 0 1 1-2 2v-2h2zM8 16a2 2 0 1 1-2-2h2v2z" />
    </svg>
  ),
  jira: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M12 3l7 7-7 7-7-7 7-7z" />
      <path {...MONO} d="M12 8l4 4-4 4" />
    </svg>
  ),
  cursor: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <path {...MONO} d="M5 4l12 7-5.5 1.5L10 20 5 4z" />
    </svg>
  ),
  prototype: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" {...MONO} />
      <path {...MONO} d="M8 12h8M12 8v8" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" width={S} height={S} aria-hidden="true">
      <circle cx="11" cy="11" r="6" {...MONO} />
      <path {...MONO} d="M16 16l4 4" />
    </svg>
  ),
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
  'palette',
  'pen',
  'layers',
  'sketch',
  'research',
]

const RIGHT_ICONS = [
  'vscode',
  'code',
  'webflow',
  'cursor',
  'slack',
  'jira',
  'prototype',
  'figma',
]

function buildSatellites(side, icons) {
  const { startAngle } = getSideAngles(side)
  const startDeg = (startAngle * 180) / Math.PI
  const count = icons.length
  // Full-circle gap — keeps at least one icon in the visible limb at all times
  const gap = 360 / count
  const reverse = side === 'right'
  // Phase-offset right side by half a slot so L/R don't mirror-empty together
  const phase = side === 'right' ? gap / 2 : 0

  return icons.map((icon, index) => ({
    id: `${side}-${icon}-${index}`,
    ring: ORBIT_RING,
    icon,
    angle: startDeg + phase + gap * index,
    duration: ORBIT_DURATION_S,
    delay: 0,
    reverse,
  }))
}

const LEFT_SATELLITES = buildSatellites('left', LEFT_ICONS)
const RIGHT_SATELLITES = buildSatellites('right', RIGHT_ICONS)

const CARD = 52

function Satellite({ side, item }) {
  const angleRad = (item.angle * Math.PI) / 180
  const { cx, cy, r } = pointOnArc(side, item.ring, angleRad)
  const from = item.reverse ? 360 : 0
  const to = item.reverse ? 0 : 360

  return (
    <g className="satellite-orbit">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={`${from} ${cx} ${cy}`}
        to={`${to} ${cx} ${cy}`}
        dur={`${item.duration}s`}
        begin={`${item.delay}s`}
        repeatCount="indefinite"
      />

      <g transform={`rotate(${item.angle} ${cx} ${cy})`}>
        <g transform={`translate(${cx + r} ${cy})`}>
          <g className="satellite-counter">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`${-from}`}
              to={`${-to}`}
              dur={`${item.duration}s`}
              begin={`${item.delay}s`}
              repeatCount="indefinite"
            />
            <foreignObject
              x={-CARD / 2}
              y={-CARD / 2}
              width={CARD}
              height={CARD}
              className="satellite-foreign"
            >
              <div
                className="floating-planet-face"
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ animationDelay: `${item.delay}s` }}
              >
                <span className="floating-card-icon">{ICONS[item.icon]}</span>
              </div>
            </foreignObject>
          </g>
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
