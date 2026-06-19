import { Link, Navigate, useParams } from 'react-router-dom'
import CaseStudiesSection from './CaseStudiesSection'
import SiteChrome from './SiteChrome'
import CaseStudyPdfViewer from './CaseStudyPdfViewer'
import { caseStudiesListPath, caseStudyPdfUrl, getCaseStudyById } from './caseStudies'
import { NAV_BACK_TO_CASE_STUDIES_LIST } from './pageTransition'
import './App.css'

export default function CaseStudyDetailPage() {
  const { id } = useParams()
  const study = getCaseStudyById(id)

  if (!study) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <SiteChrome />
      <main className="case-study-detail">
        <div className="case-study-detail-inner">
          <Link className="case-study-back" to={caseStudiesListPath()} state={NAV_BACK_TO_CASE_STUDIES_LIST} aria-label="Back to all case studies">
            <span aria-hidden="true">←</span>
          </Link>

          <header className="case-study-detail-header">
            <h1 className="case-study-detail-title">{study.title}</h1>
            <div className="case-study-detail-meta">
              <time dateTime={study.dateTime}>{study.date}</time>
              <span className="case-study-detail-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{study.time}</span>
            </div>
          </header>

          <hr className="case-study-detail-divider" />

          <div className="case-study-detail-hero">
            <img
              src={study.image}
              alt={study.title}
              className="case-study-detail-image"
            />
          </div>

          <CaseStudyPdfViewer
            fileUrl={caseStudyPdfUrl(study.pdf)}
            title={study.title}
          />
        </div>
      </main>

      <CaseStudiesSection
        excludeId={study.id}
        bordered
        id="case-studies-related"
      />
      <SiteChrome.Footer />
    </>
  )
}
