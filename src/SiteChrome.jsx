import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoIcon from './assets/HG icon.svg'
import { aboutPath } from './about'
import { caseStudiesListPath } from './caseStudies'
import { projectsListPath } from './projects'
import { navToSection, scrollToSection, NAV_FORWARD } from './pageTransition'

const SECTION_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
]

const FOOTER_LINKS_LEFT = [
  { label: 'Home', href: '#home' },
  { label: 'About', type: 'about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
]

const FOOTER_LINKS_RIGHT = [
  { label: 'Contact us', href: '#contact' },
  { label: 'All Projects', type: 'projects-list' },
  { label: 'All Case Studies', type: 'case-studies-list' },
]

function navHref(hash) {
  const base = import.meta.env.BASE_URL
  return `${base}${hash}`
}

function NavAnchor({ href, children, className, ...rest }) {
  const location = useLocation()
  const navigate = useNavigate()
  const sectionId = href.replace('#', '')

  const handleClick = (event) => {
    event.preventDefault()

    if (location.pathname !== '/') {
      navigate('/', { state: navToSection(sectionId) })
      return
    }

    scrollToSection(sectionId)
  }

  return (
    <a
      href={navHref(href)}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}

function AboutNavLink({ className, children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault()

    if (location.pathname === aboutPath()) return

    navigate(aboutPath(), { state: NAV_FORWARD })
  }

  return (
    <Link to={aboutPath()} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}

function Topbar() {
  return (
    <header className="topbar-wrapper">
      <div className="nav-container">
        <NavAnchor className="logo-group" href="#home" aria-label="Home">
          <img
            className="logo-image"
            src={logoIcon}
            alt="HG"
            width={36}
            height={36}
          />
        </NavAnchor>
        <div className="right-group">
          <nav className="nav-links" aria-label="Main navigation">
            {SECTION_LINKS.map(({ label, href }) => (
              <NavAnchor key={href} href={href}>
                {label}
              </NavAnchor>
            ))}
            <AboutNavLink>About</AboutNavLink>
          </nav>
          <NavAnchor className="contact-btn" href="#contact">
            Contact
          </NavAnchor>
        </div>
      </div>
    </header>
  )
}

function FooterLink({ item }) {
  const location = useLocation()

  if (item.type === 'about') {
    return (
      <li>
        <AboutNavLink
          className={`footer-link${location.pathname === aboutPath() ? ' footer-link--active' : ''}`}
        >
          {item.label}
        </AboutNavLink>
      </li>
    )
  }

  if (item.type === 'projects-list') {
    return (
      <li>
        <Link
          className={`footer-link${location.pathname === projectsListPath() ? ' footer-link--active' : ''}`}
          to={projectsListPath()}
          state={NAV_FORWARD}
        >
          {item.label}
        </Link>
      </li>
    )
  }

  if (item.type === 'case-studies-list') {
    return (
      <li>
        <Link
          className={`footer-link${location.pathname === caseStudiesListPath() ? ' footer-link--active' : ''}`}
          to={caseStudiesListPath()}
          state={NAV_FORWARD}
        >
          {item.label}
        </Link>
      </li>
    )
  }

  const isActive = location.pathname === '/' && item.href === '#home'

  return (
    <li>
      <NavAnchor
        className={`footer-link${isActive ? ' footer-link--active' : ''}`}
        href={item.href}
      >
        {item.label}
      </NavAnchor>
    </li>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-row">
                <img
                  className="footer-logo"
                  src={logoIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span className="footer-brand-name">Haider Ghauri</span>
              </div>
              <p className="footer-tagline">
                Crafting digital experiences that move products forward.
              </p>
              <div className="footer-newsletter">
                <h3 className="footer-newsletter-title">Updates that keep you ahead</h3>
                <form
                  className="footer-newsletter-form"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <input
                    className="footer-newsletter-input"
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                  />
                  <button
                    className="footer-newsletter-btn"
                    type="submit"
                    aria-label="Subscribe to newsletter"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-links-col">
              <p className="footer-col-label">Quick links</p>
              <div className="footer-links-grid">
                <ul className="footer-links">
                  {FOOTER_LINKS_LEFT.map((item) => (
                    <FooterLink key={item.label} item={item} />
                  ))}
                </ul>
                <ul className="footer-links">
                  {FOOTER_LINKS_RIGHT.map((item) => (
                    <FooterLink key={item.label} item={item} />
                  ))}
                </ul>
              </div>
            </div>

            <div className="footer-contact-col">
              <p className="footer-col-label">Get in touch</p>
              <ul className="footer-contact-list">
                <li>
                  <a className="footer-contact-link" href="tel:+15551234567">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li>
                  <a className="footer-contact-link" href="mailto:hello@haiderghauri.com">
                    hello@haiderghauri.com
                  </a>
                </li>
                <li>
                  <span className="footer-contact-text">
                    San Francisco, CA
                    <br />
                    United States
                  </span>
                </li>
              </ul>

              <p className="footer-col-label footer-col-label--social">Follow us on</p>
              <div className="footer-social" aria-label="Social links">
                <a className="footer-social-link" href="#" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
                <a className="footer-social-link" href="#" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a className="footer-social-link" href="#" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a className="footer-social-link" href="#" aria-label="X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="footer-bar-inner">
          <p className="footer-credit">© 2026 Haider Ghauri. All rights reserved.</p>
          <p className="footer-meta">
            Designed by{' '}
            <Link className="footer-meta-link" to="/">
              Haider Ghauri
            </Link>
            , Powered by{' '}
            <a
              className="footer-meta-link"
              href="https://www.framer.com"
              target="_blank"
              rel="noreferrer"
            >
              Framer
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export { NavAnchor, AboutNavLink }

const SiteChrome = Topbar
SiteChrome.Footer = Footer

export default SiteChrome
