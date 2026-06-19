import { Link, Navigate, useParams } from 'react-router-dom'
import ProjectsSection from './ProjectsSection'
import SiteChrome from './SiteChrome'
import { getCategoryLabel } from './categories'
import { getProjectById, projectsListPath } from './projects'
import { NAV_BACK_TO_PROJECTS_LIST } from './pageTransition'
import './App.css'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = getProjectById(id)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <SiteChrome />
      <main className="project-detail">
        <div className="project-detail-inner">
          <Link className="project-detail-back" to={projectsListPath()} state={NAV_BACK_TO_PROJECTS_LIST} aria-label="Back to all projects">
            <span aria-hidden="true">←</span>
          </Link>

          <header className="project-detail-header">
            <h1 className="project-detail-title">{project.title}</h1>
            <div className="project-detail-meta">
              <span>{getCategoryLabel(project.categoryId)}</span>
              <span className="project-detail-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{project.tool}</span>
              <span className="project-detail-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{project.year}</span>
            </div>
          </header>

          <hr className="project-detail-divider" />

          <div className="project-detail-hero">
            <img
              src={project.image}
              alt={project.title}
              className="project-detail-image"
            />
          </div>

          <div className="project-detail-content">
            {project.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </main>

      <ProjectsSection
        excludeId={project.id}
        heading="View More Projects"
        showBadge={false}
        variant="more"
        id="projects-related"
      />
      <SiteChrome.Footer />
    </>
  )
}
