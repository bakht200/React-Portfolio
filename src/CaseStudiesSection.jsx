import { Link } from 'react-router-dom'
import { COLLAPSED_ITEM_COUNT } from './categories'
import {
  CASE_STUDIES,
  caseStudiesListPath,
  caseStudyPath,
} from './caseStudies'
import { NAV_FORWARD } from './pageTransition'

export default function CaseStudiesSection({
  excludeId = null,
  heading = 'Recent Case Studies',
  showViewAll = true,
  bordered = false,
  id = 'case-studies',
}) {
  const pool = excludeId
    ? CASE_STUDIES.filter((study) => study.id !== excludeId)
    : CASE_STUDIES

  const visibleStudies = pool.slice(0, COLLAPSED_ITEM_COUNT)
  const canViewAll = showViewAll && pool.length > COLLAPSED_ITEM_COUNT

  return (
    <section className="case-studies-section" id={id}>
      <div className="case-studies-inner">
        <h2 className="case-studies-heading">{heading}</h2>
        <div
          className={`case-studies-grid${bordered ? ' case-studies-grid--bordered' : ''}`}
        >
          {visibleStudies.map((study) => (
            <article className="case-study-card" key={study.id}>
              <Link
                className="case-study-link"
                to={caseStudyPath(study.id)}
                state={NAV_FORWARD}
              >
                <div className="case-study-image-wrap">
                  <img
                    className="case-study-image"
                    src={study.image}
                    alt={study.title}
                    loading="lazy"
                  />
                </div>
                <div className="case-study-body">
                  <time className="case-study-date" dateTime={study.dateTime}>
                    {study.date}
                  </time>
                  <h3 className="case-study-title">{study.title}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {canViewAll && (
          <Link
            className="projects-view-all"
            to={caseStudiesListPath()}
            state={NAV_FORWARD}
          >
            View all Case Studies
          </Link>
        )}
      </div>
    </section>
  )
}
