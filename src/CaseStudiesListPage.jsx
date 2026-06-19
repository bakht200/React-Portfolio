import { Link } from 'react-router-dom'
import { CASE_STUDIES, caseStudyPath } from './caseStudies'
import { NAV_BACK_TO_CASE_STUDIES, NAV_FORWARD } from './pageTransition'
import SiteChrome from './SiteChrome'
import './App.css'

export default function CaseStudiesListPage() {
  return (
    <>
      <SiteChrome />
      <main className="case-studies-list-page">
        <div className="case-studies-inner case-studies-inner--list">
          <Link className="case-study-back" to="/" state={NAV_BACK_TO_CASE_STUDIES} aria-label="Back to home">
            <span aria-hidden="true">←</span>
          </Link>
          <h1 className="case-studies-heading">All Case Studies</h1>
          <div className="case-studies-grid">
            {CASE_STUDIES.map((study) => (
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
                    <h2 className="case-study-title">{study.title}</h2>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteChrome.Footer />
    </>
  )
}
