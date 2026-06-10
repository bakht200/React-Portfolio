import { useLocation, useNavigate } from 'react-router-dom'
import { navToSection, scrollToSection } from './pageTransition'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
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

function Topbar() {
  return (
    <header className="topbar-wrapper">
      <div className="nav-container">
        <NavAnchor className="logo-group" href="#home" aria-label="Folioxa home">
          <span className="logo-icon" aria-hidden="true">
            F
          </span>
          <span className="logo-text">Folioxa</span>
        </NavAnchor>
        <div className="right-group">
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <NavAnchor key={href} href={href}>
                {label}
              </NavAnchor>
            ))}
          </nav>
          <NavAnchor className="contact-btn" href="#contact">
            Contact
          </NavAnchor>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-credit">Create By @ru Design</p>
        <a
          className="footer-framer"
          href="https://www.framer.com/"
          target="_blank"
          rel="noreferrer"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 14L8 2L14 14H10L8 10L6 14H2Z" fill="currentColor" />
          </svg>
          Built in Framer
        </a>
      </div>
    </footer>
  )
}

const SiteChrome = Topbar
SiteChrome.Footer = Footer

export default SiteChrome
