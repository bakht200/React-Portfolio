import { Link } from 'react-router-dom'
import profilePhoto from './assets/recommend-optimized.png'
import { getAboutContent } from './about'
import { useContent } from './content/ContentContext'
import { NAV_BACK_HOME } from './pageTransition'
import { StackToolIcon } from './stackIcons'

export default function AboutSection({ showBack = false }) {
  const { content } = useContent()
  const { stats, bio, workExperience, stackTools, education, profilePhoto: aboutPhoto } =
    getAboutContent()
  const profileName = content.site?.name || 'Haider Ghauri'

  return (
    <section
      className={`about-section${showBack ? ' about-section--page' : ''}`}
      aria-label="About"
    >
      <div className="about-inner">
        {showBack && (
          <Link className="case-study-back about-back" to="/" state={NAV_BACK_HOME} aria-label="Back to home">
            <span aria-hidden="true">←</span>
          </Link>
        )}

        <ul className="about-stats-bar">
          {stats.map((stat) => (
            <li className="about-stat-item" key={stat.id}>
              <span className="about-stat-label">{stat.label}</span>
              <span className={`about-stat-value${stat.highlight ? ' about-stat-value--accent' : ''}`}>
                {stat.value}
              </span>
            </li>
          ))}
        </ul>

        <div className="about-hero">
          <div className="about-intro">
            <h1 className="about-greeting">{bio.greeting}</h1>
            <p className="about-title">{bio.title}</p>
            {bio.paragraphs.map((paragraph) => (
              <p className="about-text" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-photo-wrap">
            <img
              className="about-photo"
              src={aboutPhoto || profilePhoto}
              alt={profileName}
              width={420}
              height={520}
            />
          </div>
        </div>

        <div className="about-block">
          <h2 className="about-block-heading">Work Experience</h2>
          <div className="about-jobs">
            {workExperience.map((job, index) => (
              <div className="about-job-group" key={job.id}>
                <article className="about-job-row">
                  <div className="about-job-left">
                    <p className="about-job-meta">
                      {job.company}
                      <span aria-hidden="true"> | </span>
                      {job.location}
                      <span aria-hidden="true"> | </span>
                      {job.type}
                      <span aria-hidden="true"> | </span>
                      {job.period}
                    </p>
                    <h3 className="about-job-role">{job.role}</h3>
                  </div>
                  <p className="about-job-description">{job.description}</p>
                </article>
                {index < workExperience.length - 1 && (
                  <hr className="about-divider" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="about-block">
          <h2 className="about-block-heading">My Stack</h2>
          <div className="about-stack-grid">
            {stackTools.map((tool) => (
              <article className="about-stack-card" key={tool.id}>
                <div className="about-stack-icon">
                  <StackToolIcon id={tool.id} />
                </div>
                <div className="about-stack-copy">
                  <h3 className="about-stack-name">{tool.name}</h3>
                  <p className="about-stack-category">{tool.category}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="about-block">
          <h2 className="about-block-heading">Education</h2>
          <article className="about-education-row">
            <div className="about-education-left">
              <p className="about-job-meta">
                {education.school}
                <span aria-hidden="true"> | </span>
                {education.period}
              </p>
              <h3 className="about-job-role">{education.degree}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
