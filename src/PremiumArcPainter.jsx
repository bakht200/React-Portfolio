/**
 * PremiumArcPainter — concentric orbit segments (left + right).
 * Geometry shared with FloatingCards satellites via orbitGeometry.js
 */

import {
  ARC_COUNT,
  BLEED,
  STROKE,
  VIEW_H,
  VIEW_W,
  buildSideArcs,
} from './orbitGeometry'

function SideArcs({ side }) {
  const paths = buildSideArcs(side)
  const fadeId = `orbit-fade-${side}`
  const maskId = `orbit-mask-${side}`
  const vFadeId = `orbit-vfade-${side}`
  const vMaskId = `orbit-vmask-${side}`

  const maskX = side === 'left' ? 0 : VIEW_W * 0.58
  const maskW = VIEW_W * 0.42
  const maskY = -BLEED
  const maskH = VIEW_H + BLEED * 2

  return (
    <g className={`premium-arc-side premium-arc-side--${side}`}>
      <defs>
        {/* Horizontal fade keeps the center clear */}
        <linearGradient
          id={fadeId}
          gradientUnits="userSpaceOnUse"
          x1={side === 'left' ? 0 : VIEW_W}
          y1="0"
          x2={side === 'left' ? VIEW_W * 0.38 : VIEW_W * 0.62}
          y2="0"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Vertical fade softens top/bottom so arcs don't hard-clip */}
        <linearGradient
          id={vFadeId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={maskY}
          x2="0"
          y2={maskY + maskH}
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="12%" stopColor="#fff" stopOpacity="1" />
          <stop offset="78%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={maskId}>
          <rect x={maskX} y={maskY} width={maskW} height={maskH} fill={`url(#${fadeId})`} />
        </mask>
        <mask id={vMaskId}>
          <rect x={0} y={maskY} width={VIEW_W} height={maskH} fill={`url(#${vFadeId})`} />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <g mask={`url(#${vMaskId})`}>
          {paths.map((arc) => (
            <path
              key={arc.key}
              d={arc.d}
              fill="none"
              stroke={STROKE}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={arc.opacity}
              vectorEffect="nonScalingStroke"
              className="premium-orbit-stroke"
            />
          ))}
        </g>
      </g>
    </g>
  )
}

export default function PremiumArcPainter({ className = '', children }) {
  return (
    <svg
      className={`premium-arc-painter${className ? ` ${className}` : ''}`}
      viewBox={`0 ${-BLEED} ${VIEW_W} ${VIEW_H + BLEED * 2}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <SideArcs side="left" />
      <SideArcs side="right" />
      {children}
    </svg>
  )
}

export { ARC_COUNT }
