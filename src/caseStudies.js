import bentoOne from './assets/bento-1.jpg'
import bentoTwo from './assets/bento-2.jpg'
import bentoThree from './assets/bento-3.jpg'
import projectOne from './assets/project-1.jpg'
import projectTwo from './assets/project-2.jpg'

const CASE_STUDY_PDF = 'case-studies/pomhealthcasestudy.pdf'

export const CASE_STUDIES = [
  {
    id: 'ff-galaxy-hrms',
    title: 'FF Galaxy HRMS',
    date: 'Nov 10, 2024',
    dateTime: '2024-11-10',
    time: '9:30 AM',
    image: bentoOne,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'designer-developer-collab',
    title: 'Bridging the Gap: Collaboration Between Designers and Developers',
    date: 'Jun 15, 2024',
    dateTime: '2024-06-15',
    time: '2:00 PM',
    image: bentoTwo,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'user-centered-design',
    title: 'User-Centered Design: Why It Matters and How to Implement It',
    date: 'Jun 13, 2024',
    dateTime: '2024-06-13',
    time: '11:15 AM',
    image: projectOne,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'pom-health-platform',
    title: 'POM Health Platform',
    date: 'Oct 22, 2024',
    dateTime: '2024-10-22',
    time: '11:00 AM',
    image: bentoThree,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'ai-product-discovery',
    title: 'AI Product Discovery Framework',
    date: 'Sep 5, 2024',
    dateTime: '2024-09-05',
    time: '3:45 PM',
    image: projectTwo,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'fintech-onboarding',
    title: 'Fintech Onboarding at Scale',
    date: 'Aug 18, 2024',
    dateTime: '2024-08-18',
    time: '10:20 AM',
    image: bentoOne,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'inventory-ops-redesign',
    title: 'Inventory & Ops Dashboard Redesign',
    date: 'Jul 30, 2024',
    dateTime: '2024-07-30',
    time: '1:15 PM',
    image: bentoTwo,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'ecommerce-conversion',
    title: 'E-Commerce Conversion Optimization',
    date: 'Jul 8, 2024',
    dateTime: '2024-07-08',
    time: '4:00 PM',
    image: projectOne,
    pdf: CASE_STUDY_PDF,
  },
  {
    id: 'enterprise-hcm-rollout',
    title: 'Enterprise HCM Rollout Strategy',
    date: 'Jun 1, 2024',
    dateTime: '2024-06-01',
    time: '9:00 AM',
    image: bentoThree,
    pdf: CASE_STUDY_PDF,
  },
]

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function getCaseStudyById(id) {
  return CASE_STUDIES.find((study) => study.id === id)
}

export function getDailyCaseStudy(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / MS_PER_DAY)
  return CASE_STUDIES[dayIndex % CASE_STUDIES.length]
}

export function caseStudyPath(id) {
  return `/case-studies/${id}`
}

export function caseStudiesListPath() {
  return '/case-studies'
}

export function caseStudyPdfUrl(pdf) {
  const base = import.meta.env.BASE_URL
  return `${base}${pdf}`
}
