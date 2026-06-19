import { Link } from 'react-router-dom'
import {
  COLLAPSED_ITEM_COUNT,
  getCategoryLabel,
} from './categories'
import { NAV_FORWARD } from './pageTransition'
import { PROJECTS, projectPath, projectsListPath } from './projects'

export default function ProjectsSection({
  excludeId = null,
  heading = 'My Latest Projects',
  showBadge = true,
  showViewAll = true,
  variant = 'default',
  id = 'projects',
}) {
  const pool = excludeId
    ? PROJECTS.filter((project) => project.id !== excludeId)
    : PROJECTS

  const visibleProjects = pool.slice(0, COLLAPSED_ITEM_COUNT)
  const canViewAll = showViewAll && pool.length > COLLAPSED_ITEM_COUNT

  const gridClassName =
    variant === 'more' ? 'more-projects-grid' : 'projects-grid'

  return (
    <section
      className={`projects-section${variant === 'more' ? ' more-projects-section' : ''}`}
      id={id}
    >
      <div className="projects-inner">
        {showBadge && <span className="projects-badge">My Projects</span>}
        <h2
          className={
            variant === 'more' ? 'more-projects-heading' : 'projects-heading'
          }
        >
          {heading}
        </h2>

        <div className="projects-layout">
          <div className={gridClassName}>
            {visibleProjects.map((project) =>
              variant === 'more' ? (
                <article className="more-project-card" key={project.id}>
                  <Link
                    className="more-project-link"
                    to={projectPath(project.id)}
                    state={NAV_FORWARD}
                  >
                    <div className="more-project-visual">
                      <span className="more-project-glow" aria-hidden="true" />
                      <img
                        className="more-project-image"
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="more-project-footer">
                      <h3 className="more-project-title">{project.title}</h3>
                      <span className="more-project-category">
                        {getCategoryLabel(project.categoryId)}
                      </span>
                    </div>
                  </Link>
                </article>
              ) : (
                <Link
                  className="project-card project-card-link"
                  key={project.id}
                  to={projectPath(project.id)}
                  state={NAV_FORWARD}
                >
                  <div className="project-card-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-year">{project.yearDisplay}</span>
                  </div>
                  <div className="project-image-wrap">
                    <img
                      className="project-image"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>

        {canViewAll && (
          <Link className="projects-view-all" to={projectsListPath()} state={NAV_FORWARD}>
            View all Projects
          </Link>
        )}
      </div>
    </section>
  )
}
