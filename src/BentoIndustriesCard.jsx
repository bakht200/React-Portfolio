import { INDUSTRY_CATEGORIES } from './categories'

export default function BentoIndustriesCard() {
  const looped = [...INDUSTRY_CATEGORIES, ...INDUSTRY_CATEGORIES]

  return (
    <article className="bento-card bento-industries">
      <h3 className="bento-industries-title">Industries we work with</h3>
      <div className="bento-industries-marquee" aria-label="Industry categories">
        <ul className="bento-industries-track">
          {looped.map((category, index) => (
            <li
              key={`${category.id}-${index}`}
              className="bento-industries-item"
              aria-hidden={index >= INDUSTRY_CATEGORIES.length}
            >
              <span className="bento-industries-dot" aria-hidden="true" />
              <span className="bento-industries-label">{category.label}</span>
              <span className="bento-industries-dot" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
