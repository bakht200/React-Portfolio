import { getContentSnapshot } from './content/contentStore'
import { resolveContentAsset } from './content/resolveAsset'

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function getCaseStudies() {
  return getContentSnapshot().caseStudies.map((study) => ({
    ...study,
    image: resolveContentAsset(study.image),
  }))
}

/** @deprecated use getCaseStudies() */
export const CASE_STUDIES = getCaseStudies()

export function getCaseStudyById(id) {
  return getCaseStudies().find((study) => study.id === id)
}

export function getFeaturedCaseStudy() {
  return getCaseStudies().find((study) => study.featured) ?? getCaseStudies()[0]
}

export function getDailyCaseStudy(date = new Date()) {
  const studies = getCaseStudies()
  const dayIndex = Math.floor(date.getTime() / MS_PER_DAY)
  return studies[dayIndex % studies.length]
}

export function caseStudyPath(id) {
  return `/case-studies/${id}`
}

export function caseStudiesListPath() {
  return '/case-studies'
}

export function caseStudyPdfUrl(pdf) {
  if (!pdf) return ''
  if (pdf.startsWith('http')) return pdf
  return resolveContentAsset(pdf)
}
