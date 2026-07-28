/**
 * Shared orbit geometry — arcs and satellites use the same centers + radii.
 */

export const VIEW_W = 1200
export const VIEW_H = 900
export const BLEED = 160
export const ARC_COUNT = 5
export const STROKE = '#E6E6E6'

export const RADIUS_STEP = VIEW_H * 0.088
export const BASE_RADIUS = VIEW_H * 0.4

export function getSideCenter(side) {
  const cy = VIEW_H / 2
  const cx =
    side === 'left'
      ? VIEW_W * 0.2 - BASE_RADIUS
      : VIEW_W * 0.8 + BASE_RADIUS
  return { cx, cy }
}

export function getArcRadius(index) {
  return BASE_RADIUS + index * RADIUS_STEP
}

/** Left: east limb. Right: west limb. Extends past top/bottom. */
export function getSideAngles(side) {
  if (side === 'left') {
    return { startAngle: -Math.PI / 2 - 0.4, endAngle: Math.PI / 2 + 0.4 }
  }
  return { startAngle: (3 * Math.PI) / 2 + 0.4, endAngle: Math.PI / 2 - 0.4 }
}

export function cubicArcPath(cx, cy, r, startAngle, endAngle) {
  const segments = []
  let a0 = startAngle
  const total = endAngle - startAngle
  const steps = Math.max(1, Math.ceil(Math.abs(total) / (Math.PI / 2)))
  const step = total / steps

  for (let i = 0; i < steps; i += 1) {
    const a1 = a0 + step
    segments.push(cubicSegment(cx, cy, r, a0, a1))
    a0 = a1
  }

  const first = segments[0]
  const parts = [`M ${first.x0} ${first.y0}`]
  for (const s of segments) {
    parts.push(`C ${s.cp1x} ${s.cp1y}, ${s.cp2x} ${s.cp2y}, ${s.x1} ${s.y1}`)
  }
  return parts.join(' ')
}

function cubicSegment(cx, cy, r, a0, a1) {
  const delta = a1 - a0
  const t = (4 / 3) * Math.tan(delta / 4)
  const cos0 = Math.cos(a0)
  const sin0 = Math.sin(a0)
  const cos1 = Math.cos(a1)
  const sin1 = Math.sin(a1)
  const x0 = cx + r * cos0
  const y0 = cy + r * sin0
  const x1 = cx + r * cos1
  const y1 = cy + r * sin1

  return {
    x0,
    y0,
    x1,
    y1,
    cp1x: x0 - r * sin0 * t,
    cp1y: y0 + r * cos0 * t,
    cp2x: x1 + r * sin1 * t,
    cp2y: y1 - r * cos1 * t,
  }
}

export function buildSideArcs(side) {
  const { cx, cy } = getSideCenter(side)
  const { startAngle, endAngle } = getSideAngles(side)
  const paths = []

  for (let i = 0; i < ARC_COUNT; i += 1) {
    const r = getArcRadius(i)
    paths.push({
      d: cubicArcPath(cx, cy, r, startAngle, endAngle),
      opacity: 0.92 - i * 0.07,
      key: `${side}-${i}`,
      cx,
      cy,
      r,
      index: i,
    })
  }
  return paths
}

/** Point on arc in viewBox coords (same math as path). */
export function pointOnArc(side, ringIndex, angleRad) {
  const { cx, cy } = getSideCenter(side)
  const r = getArcRadius(ringIndex)
  return {
    cx,
    cy,
    r,
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}
