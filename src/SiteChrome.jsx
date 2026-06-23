import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoIcon from './assets/HG icon.svg'
import { aboutPath } from './about'
import { navToSection, scrollToSection, NAV_FORWARD } from './pageTransition'

const SECTION_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-credit">© 2026 Haider Ghauri. All rights reserved.</p>
      </div>
    </footer>
  )
}

export { NavAnchor, AboutNavLink }

const SiteChrome = Topbar
SiteChrome.Footer = Footer

export default SiteChrome
