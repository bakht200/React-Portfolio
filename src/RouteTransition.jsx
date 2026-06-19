import { useLayoutEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AboutPage from './AboutPage'
import CaseStudiesListPage from './CaseStudiesListPage'
import CaseStudyDetailPage from './CaseStudyDetailPage'
import ProjectDetailPage from './ProjectDetailPage'
import ProjectsListPage from './ProjectsListPage'
import ScrollFab from './ScrollFab'
import { getTransitionDirection } from './pageTransition'

export default function RouteTransition({ homePage }) {
  const location = useLocation()
  const previousPathRef = useRef(location.pathname)
  const directionRef = useRef('forward')

  if (previousPathRef.current !== location.pathname) {
    directionRef.current =
      location.state?.direction ??
      getTransitionDirection(location, previousPathRef.current)
    previousPathRef.current = location.pathname
  }

  useLayoutEffect(() => {
    if (
      location.pathname.startsWith('/case-studies') ||
      location.pathname.startsWith('/projects') ||
      location.pathname === '/about'
    ) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div
      key={location.pathname}
      className={`page-transition page-transition--${directionRef.current}`}
    >
      <Routes location={location}>
        <Route path="/" element={homePage} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/case-studies" element={<CaseStudiesListPage />} />
        <Route path="/case-studies/:id" element={<CaseStudyDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <ScrollFab />
    </div>
  )
}
