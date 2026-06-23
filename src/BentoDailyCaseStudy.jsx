import { Link } from 'react-router-dom'
import { caseStudyPath, getFeaturedCaseStudy } from './caseStudies'
import { NAV_FORWARD } from './pageTransition'

export default function BentoDailyCaseStudy() {
  const study = getFeaturedCaseStudy()

  return (
    <article className="bento-card bento-feature bento-feature--case-study">
      <Link
        className="bento-case-study-link"
        to={caseStudyPath(study.id)}
        state={NAV_FORWARD}
      >
        <div className="bento-case-study-media">
          <img src={study.image} alt={study.title} loading="lazy" />
          <span className="bento-case-study-media-shade" aria-hidden="true" />
        </div>
        <div className="bento-case-study-panel">
          <span className="bento-case-study-eyebrow">Featured Case Study</span>
          <time className="bento-case-study-date" dateTime={study.dateTime}>
            {study.date}
          </time>
          <h3 className="bento-case-study-title">{study.title}</h3>
          {study.excerpt && (
            <p className="bento-case-study-excerpt">{study.excerpt}</p>
          )}
          <span className="bento-case-study-cta">
            Read case study
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
