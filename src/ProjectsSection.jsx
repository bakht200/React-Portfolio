import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  COLLAPSED_ITEM_COUNT,
  EXPANDED_ITEM_COUNT,
  FILTER_CATEGORIES,
  getCategoryLabel,
} from './categories'
import { NAV_FORWARD } from './pageTransition'
import { PROJECTS, projectPath } from './projects'

export default function ProjectsSection({
  excludeId = null,
  heading = 'My Latest Projects',
  showBadge = true,
  collapsible = true,
  withFilter = true,
  variant = 'default',
  id = 'projects',
}) {
  const [expanded, setExpanded] = useState(false)
  const [category, setCategory] = useState('all')

  const pool = excludeId
    ? PROJECTS.filter((project) => project.id !== excludeId)
    : PROJECTS

  const filtered = pool.filter(
    (project) => category === 'all' || project.categoryId === category,
  )

  const limit = expanded ? EXPANDED_ITEM_COUNT : COLLAPSED_ITEM_COUNT
  const visibleProjects = filtered.slice(0, limit)
  const canExpand = pool.length > COLLAPSED_ITEM_COUNT

  const toggleExpanded = () => {
    if (expanded) {
      setExpanded(false)
      setCategory('all')
      return
    }

    setExpanded(true)
  }

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

        <div
          className={`projects-layout${expanded && withFilter ? ' projects-layout--expanded' : ''}`}
        >
          {expanded && withFilter && (
            <aside className="projects-filter" aria-label="Filter projects by category">
              <p className="projects-filter-label">Category</p>
              <ul className="projects-filter-list">
                {FILTER_CATEGORIES.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`projects-filter-btn${category === item.id ? ' projects-filter-btn--active' : ''}`}
                      onClick={() => setCategory(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

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

        {collapsible && canExpand && (
          <button
            type="button"
            className="projects-view-all"
            onClick={toggleExpanded}
          >
            {expanded ? 'View Less' : 'View all Projects'}
          </button>
        )}
      </div>
    </section>
  )
}
