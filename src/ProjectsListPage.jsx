import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FILTER_CATEGORIES } from './categories'
import { NAV_BACK_TO_PROJECTS, NAV_FORWARD } from './pageTransition'
import { PROJECTS, projectPath } from './projects'
import SiteChrome from './SiteChrome'
import './App.css'

export default function ProjectsListPage() {
  const [category, setCategory] = useState('all')

  const visibleProjects = PROJECTS.filter(
    (project) => category === 'all' || project.categoryId === category,
  )

  return (
    <>
      <SiteChrome />
      <main className="projects-list-page">
        <div className="projects-inner projects-inner--list">
          <Link className="project-detail-back" to="/" state={NAV_BACK_TO_PROJECTS} aria-label="Back to home">
            <span aria-hidden="true">←</span>
          </Link>
          <span className="projects-badge">My Projects</span>
          <h1 className="projects-heading">All Projects</h1>

          <div className="projects-layout projects-layout--expanded">
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

            <div className="projects-grid">
              {visibleProjects.map((project) => (
                <Link
                  className="project-card project-card-link"
                  key={project.id}
                  to={projectPath(project.id)}
                  state={NAV_FORWARD}
                >
                  <div className="project-card-header">
                    <h2 className="project-title">{project.title}</h2>
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
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteChrome.Footer />
    </>
  )
}
