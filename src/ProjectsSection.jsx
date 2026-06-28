import { Link } from 'react-router-dom'
import logoIcon from './assets/HG icon.svg'
import {
  COLLAPSED_ITEM_COUNT,
  getCategoryLabel,
} from './categories'
import { NAV_FORWARD } from './pageTransition'
import { PROJECTS, projectPath, projectsListPath } from './projects'

function ProjectsShowcase({ projects, projectCount, showExploreCta }) {
  const rowA = projects.filter((_, index) => index % 2 === 0)
  const rowB = projects.filter((_, index) => index % 2 === 1)
  const secondRow = rowB.length > 0 ? rowB : rowA

  const renderRow = (rowProjects, direction) => {
    const looped = [...rowProjects, ...rowProjects]

    return (
      <div
        className={`projects-marquee projects-marquee--${direction}`}
        aria-hidden={rowProjects.length === 0}
      >
        <div className="projects-marquee-track">
          {looped.map((project, index) => (
            <Link
              className="projects-showcase-card"
              key={`${project.id}-${index}`}
              to={projectPath(project.id)}
              state={NAV_FORWARD}
              aria-hidden={index >= rowProjects.length}
              tabIndex={index >= rowProjects.length ? -1 : undefined}
            >
              <img
                className="projects-showcase-image"
                src={project.image}
                alt={project.title}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="projects-showcase">
      <div className="projects-showcase-rows">
        {renderRow(rowA, 'forward')}
        {renderRow(secondRow, 'reverse')}
      </div>

      <div className="projects-showcase-cta">
        <div className="projects-showcase-cta-circle">
          <div className="projects-showcase-cta-content">
            <div className="projects-showcase-cta-logo-wrap">
              <img
                className="projects-showcase-cta-logo"
                src={logoIcon}
                alt="Haider Ghauri"
                width={44}
                height={44}
              />
            </div>
            <p className="projects-showcase-cta-eyebrow">
              {projectCount}+ Premium
            </p>
            <p className="projects-showcase-cta-title">Projects</p>
            {showExploreCta && (
              <Link
                className="projects-showcase-cta-btn"
                to={projectsListPath()}
                state={NAV_FORWARD}
              >
                Explore all Projects
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const isShowcase = variant === 'default'

  const gridClassName =
    variant === 'more' ? 'more-projects-grid' : 'projects-grid'

  return (
    <section
      className={`projects-section${variant === 'more' ? ' more-projects-section' : ''}${isShowcase ? ' projects-section--showcase' : ''}`}
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

        {isShowcase ? (
          <ProjectsShowcase
            projects={pool}
            projectCount={PROJECTS.length}
            showExploreCta={canViewAll || showViewAll}
          />
        ) : (
          <div className="projects-layout">
            <div className={gridClassName}>
              {visibleProjects.map((project) => (
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
              ))}
            </div>
          </div>
        )}

        {!isShowcase && canViewAll && (
          <Link className="projects-view-all" to={projectsListPath()} state={NAV_FORWARD}>
            View all Projects
          </Link>
        )}
      </div>
    </section>
  )
}
