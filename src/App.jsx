import { createContext, useContext, useEffect, useRef, useState } from 'react'
import profilePhoto from './assets/profile.jpg'
import avatarImg from './assets/avatar.jpg'
import projectOne from './assets/project-1.jpg'
import projectTwo from './assets/project-2.jpg'
import bentoOne from './assets/bento-1.jpg'
import bentoTwo from './assets/bento-2.jpg'
import bentoThree from './assets/bento-3.jpg'
import './App.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
]

const RevealContext = createContext(true)

function useRevealObserver(ref, setVisible) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    let done = false

    const markVisible = () => {
      if (done) return
      done = true
      setVisible(true)
    }

    const isInView = () => {
      const rect = element.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible()
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' },
    )

    observer.observe(element)

    const check = () => {
      if (isInView()) {
        markVisible()
        observer.disconnect()
      }
    }

    check()

    const raf = requestAnimationFrame(check)
    const timeout = window.setTimeout(check, 800)

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      observer.disconnect()
    }
  }, [ref, setVisible])
}

function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useRevealObserver(ref, setVisible)

  return (
    <div
      ref={ref}
      className={`scroll-reveal${visible ? ' scroll-reveal--visible' : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

function ScrollRevealSection({ id, className, ariaLabel, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useRevealObserver(ref, setVisible)

  return (
    <RevealContext.Provider value={visible}>
      <section
        ref={ref}
        id={id}
        className={`${className}${visible ? ' reveal-section--visible' : ''}`}
        aria-label={ariaLabel}
      >
        {children}
      </section>
    </RevealContext.Provider>
  )
}

function RevealItem({ children, delay = 0, className = '' }) {
  const visible = useContext(RevealContext)

  return (
    <div
      className={`reveal-item${visible ? ' reveal-item--visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

function Topbar() {
  return (
    <header className="topbar-wrapper">
      <div className="nav-container">
        <a className="logo-group" href="#home" aria-label="Folioxa home">
          <span className="logo-icon" aria-hidden="true">
            F
          </span>
          <span className="logo-text">Folioxa</span>
        </a>
        <div className="right-group">
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a className="contact-btn" href="#contact">
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid">
        <article className="profile-card">
          <div className="card-inner">
            <img
              className="profile-photo"
              src={profilePhoto}
              alt="Haider Ghauri"
              width={320}
              height={380}
            />
            <div className="profile-footer">
              <div className="profile-info">
                <h2 className="profile-name">Haider Ghauri</h2>
                <p className="profile-role">Senior Product Designer</p>
              </div>
              <a
                className="profile-message-btn"
                href="#contact"
                aria-label="Send message"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article className="intro-card">
          <div className="card-inner">
            <div className="intro-body">
              <a className="slots-badge" href="#contact">
                <span className="slots-status" aria-hidden="true">
                  <span className="slots-dot" />
                </span>
                <span className="slots-text">Open to Remote Work</span>
                <span className="slots-arrow-btn" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

            <h1 className="intro-heading">
              <span className="intro-line">
                Hi, I&apos;m{' '}
                {' '}
                Haider Ghauri
              </span>
              <span className="intro-line">
                I{' '}
                <span className="intro-accent">Design Products</span>
              </span>
              <span className="intro-line">People Love to Use.</span>
            </h1>

            <p className="intro-description">
            I'm a Senior Product Designer with 5+ years of experience 
building AI platforms, healthcare tools, fintech apps, and 
enterprise SaaS from first wireframe to final handoff.
Available for full-time remote roles and freelance projects 
across the US, EU, and worldwide.
            </p>
          </div>

          <div className="intro-actions">
            <a className="intro-btn intro-btn-primary" href="#contact">
              <span>Let&apos;s Connect</span>
              <span className="intro-btn-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a className="intro-btn intro-btn-outline" href="#projects">
              <span>View My Work</span>
              <span className="intro-btn-icon intro-btn-icon-outline" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 13h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
          </div>
        </article>
      </div>
    </section>
  )
}

const CLIENT_LOGOS = [
  {
    id: 'bolt',
    label: 'Logoipsum',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16 8L11 15H14L12 20L17 13H14L16 8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'wave',
    label: 'logoipsum',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M4 18C8 12 12 12 14 18C16 24 20 24 24 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 22C8 16 12 16 14 22C16 28 20 28 24 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    id: 'loops',
    label: 'Logoipsum',
    icon: (
      <svg width="32" height="28" viewBox="0 0 32 28" fill="none" aria-hidden="true">
        <ellipse cx="11" cy="14" rx="8" ry="10" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="21" cy="14" rx="8" ry="10" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="16" cy="14" rx="8" ry="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'circles',
    label: 'Logoipsum',
    icon: (
      <svg width="32" height="28" viewBox="0 0 32 28" fill="none" aria-hidden="true">
        <circle cx="13" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'shapes',
    label: 'logoipsum',
    icon: (
      <svg width="32" height="28" viewBox="0 0 32 28" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="27" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

function TrustedSection() {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="trusted-section" aria-label="Clients and partners">
      <div className="trusted-inner">
        <p className="trusted-label">Proudly worked with:</p>
        <div className="trusted-marquee">
          <div className="trusted-track">
            {logos.map((logo, index) => (
              <div
                className="trusted-logo"
                key={`${logo.id}-${index}`}
                aria-hidden={index >= CLIENT_LOGOS.length}
              >
                {logo.icon}
                <span>{logo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const PROJECTS = [
  {
    id: 'creative-studio',
    title: 'Creative Studio',
    year: '/2026',
    image: projectOne,
    href: '#projects',
  },
  {
    id: 'ecommerce-product',
    title: 'E-commerce Product',
    year: '/2026',
    image: projectTwo,
    href: '#projects',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    year: '/2026',
    image: bentoThree,
    href: '#projects',
  },
]

const SERVICE_TOOLS = [
  {
    id: 'photoshop',
    label: 'Photoshop',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#001E36" />
        <path d="M9.5 8C7.5 8 6.5 9 6.5 10.2C6.5 12.5 10 12 10 13.5C10 14.3 9.2 15 8 15C7 15 6.2 14.6 5.5 14L6.2 12.5C6.7 12.9 7.4 13.2 8 13.2C8.6 13.2 9 12.9 9 12.4C9 11.2 5.5 11.5 5.5 9.2C5.5 7.5 6.8 6.5 8.8 6.5C9.6 6.5 10.3 6.7 11 7L10.3 8.5C9.9 8.2 9.2 8 8.5 8H9.5Z" fill="#31A8FF" />
        <path d="M13 7H16.5C18 7 19 8 19 9.5C19 11.5 17.2 12 16 12L19 17H17L14.5 12.5H13V17H11V7H13ZM13 8.8V11H15.5C16.3 11 17 10.5 17 9.5C17 8.7 16.5 8.2 15.5 8.2H13V8.8Z" fill="#31A8FF" />
      </svg>
    ),
  },
  {
    id: 'illustrator',
    label: 'Illustrator',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#330000" />
        <path d="M11 8L8.5 16H10L10.5 14.5H13L13.5 16H15L12.5 8H11ZM11.5 12.5L12 11L12.5 12.5H11.5Z" fill="#FF9A00" />
        <path d="M15.5 8V16H17.2L18.8 11.2L20.4 16H22V8H20.3L18.7 12.8L17.1 8H15.5Z" fill="#FF9A00" />
      </svg>
    ),
  },
  {
    id: 'xd',
    label: 'Xd',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#470137" />
        <path d="M10 8L7 16H9L9.8 13.5H12.2L13 16H15L12 8H10ZM10.5 11.5L11.5 9.2L12.5 11.5H10.5Z" fill="#FF61F6" />
        <path d="M15 8V16H17V13.5H18.5L19.5 16H21.5L20.2 13C20.8 12.6 21.2 11.8 21.2 10.8C21.2 9.2 20 8 18.2 8H15ZM17 10H18C18.6 10 19 10.3 19 10.8C19 11.3 18.6 11.6 18 11.6H17V10Z" fill="#FF61F6" />
      </svg>
    ),
  },
  {
    id: 'figma',
    label: 'Figma',
    icon: (
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
        <path d="M7 20C10.866 20 14 16.866 14 13C14 11.343 13.343 10 12 10H7V20Z" fill="#0ACF83" />
        <path d="M0 13C0 16.866 3.134 20 7 20V10H2C0.657 10 0 11.343 0 13Z" fill="#A259FF" />
        <path d="M0 7C0 3.134 3.134 0 7 0C10.866 0 14 3.134 14 7C14 10.866 10.866 14 7 14H0V7Z" fill="#F24E1E" />
        <path d="M0 7H7C8.657 7 10 5.657 10 4C10 2.343 8.657 1 7 1C5.343 1 4 2.343 4 4V7H0Z" fill="#FF7262" />
        <path d="M0 7V10H4C5.657 10 7 8.657 7 7C7 5.343 5.657 4 4 4H0V7Z" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    id: 'framer',
    label: 'Framer',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 14L8 2L14 14H10L8 10L6 14H2Z" fill="#0099FF" />
      </svg>
    ),
  },
  {
    id: 'rive',
    label: 'Rive',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#1D1D1D" strokeWidth="2" />
        <path d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const SERVICES = [
  {
    id: 'landing-page',
    title: 'Landing page design',
    description:
      'Designing intuitive user interfaces and seamless user experiences to enhance engagement and usability.',
    icon: 'figma',
  },
  {
    id: 'website-dev',
    title: 'Website development',
    description:
      'Building functional, no-code websites that are easy to manage and optimized for performance across devices.',
    icon: 'framer',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX design',
    description:
      'Crafting wireframes, prototypes, and design systems that align with your brand and delight your users.',
    icon: 'xd',
  },
  {
    id: 'brand-identity',
    title: 'Brand identity',
    description:
      'Developing cohesive visual identities with logos, color palettes, and typography that make your brand memorable.',
    icon: 'photoshop',
  },
  {
    id: 'motion-design',
    title: 'Motion design',
    description:
      'Creating engaging animations and interactive experiences that bring your digital products to life.',
    icon: 'rive',
  },
]

function ServiceIcon({ type }) {
  if (type === 'figma') {
    return (
      <svg className="service-icon-figma" viewBox="0 0 14 20" fill="none" aria-hidden="true">
        <path d="M7 20C10.866 20 14 16.866 14 13C14 11.343 13.343 10 12 10H7V20Z" fill="#ffffff" />
        <path d="M0 13C0 16.866 3.134 20 7 20V10H2C0.657 10 0 11.343 0 13Z" fill="#ffffff" />
        <path d="M0 7C0 3.134 3.134 0 7 0C10.866 0 14 3.134 14 7C14 10.866 10.866 14 7 14H0V7Z" fill="#ffffff" />
        <path d="M0 7H7C8.657 7 10 5.657 10 4C10 2.343 8.657 1 7 1C5.343 1 4 2.343 4 4V7H0Z" fill="#ffffff" />
        <path d="M0 7V10H4C5.657 10 7 8.657 7 7C7 5.343 5.657 4 4 4H0V7Z" fill="#ffffff" />
      </svg>
    )
  }

  if (type === 'framer') {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 14L8 2L14 14H10L8 10L6 14H2Z" fill="#fff" />
      </svg>
    )
  }

  if (type === 'xd') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 8L7 16H9L9.8 13.5H12.2L13 16H15L12 8H10ZM10.5 11.5L11.5 9.2L12.5 11.5H10.5Z" fill="#fff" />
        <path d="M15 8V16H17V13.5H18.5L19.5 16H21.5L20.2 13C20.8 12.6 21.2 11.8 21.2 10.8C21.2 9.2 20 8 18.2 8H15ZM17 10H18C18.6 10 19 10.3 19 10.8C19 11.3 18.6 11.6 18 11.6H17V10Z" fill="#fff" />
      </svg>
    )
  }

  if (type === 'photoshop') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9.5 8C7.5 8 6.5 9 6.5 10.2C6.5 12.5 10 12 10 13.5C10 14.3 9.2 15 8 15C7 15 6.2 14.6 5.5 14L6.2 12.5C6.7 12.9 7.4 13.2 8 13.2C8.6 13.2 9 12.9 9 12.4C9 11.2 5.5 11.5 5.5 9.2C5.5 7.5 6.8 6.5 8.8 6.5C9.6 6.5 10.3 6.7 11 7L10.3 8.5C9.9 8.2 9.2 8 8.5 8H9.5Z" fill="#fff" />
        <path d="M13 7H16.5C18 7 19 8 19 9.5C19 11.5 17.2 12 16 12L19 17H17L14.5 12.5H13V17H11V7H13ZM13 8.8V11H15.5C16.3 11 17 10.5 17 9.5C17 8.7 16.5 8.2 15.5 8.2H13V8.8Z" fill="#fff" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="2" />
      <path d="M8 12C8 9.79 9.79 8 12 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ServicesSection() {
  const serviceTools = [...SERVICE_TOOLS, ...SERVICE_TOOLS]

  return (
    <section className="services-section" id="services">
      <div className="services-inner">
        <div className="services-left">
          <h2 className="services-heading">
            Services that supercharge your business.
          </h2>
          <p className="services-description">
            Helping businesses standout with brand identity packaging that
            captivates and converts effectively.
          </p>
          <a className="book-call-btn services-cta" href="#contact">
            <span>Book a Free Call</span>
            <span className="book-call-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <div className="services-tools-marquee" aria-label="Tools and technologies">
            <div className="services-tools-track">
              {serviceTools.map((tool, index) => (
                <div
                  className="services-tool"
                  key={`${tool.id}-${index}`}
                  aria-hidden={index >= SERVICE_TOOLS.length}
                >
                  {tool.icon}
                  <span>{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="services-cards" aria-label="Service offerings">
          {SERVICES.map((service) => (
            <article className="service-card" key={service.id}>
              <div className="service-card-icon" aria-hidden="true">
                <ServiceIcon type={service.icon} />
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const HOW_IT_WORKS_STEPS = [
  {
    id: 'share',
    number: '01',
    title: 'Share Your Idea',
    description:
      "Tell me what you need — a new website, redesign, or template customization. We'll discuss your goals and vision clearly, together.",
    icon: 'bulb',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design & Build',
    description:
      "I'll craft a modern, responsive design in Framer and bring it to life with smooth animations and smart layouts seamlessly consistently.",
    icon: 'pen',
  },
  {
    id: 'launch',
    number: '03',
    title: 'Launch & Care',
    description:
      "Once you're happy, we'll launch your site. I'll also provide post-launch support to make sure everything runs perfectly smoothly.",
    icon: 'rocket',
  },
]

function HowItWorksIcon({ type }) {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 4.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  if (type === 'bulb') {
    return (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <path
          d="M60 14C42 14 28 28 28 46C28 56.5 33 65.5 40 72V86H80V72C87 65.5 92 56.5 92 46C92 28 78 14 60 14Z"
          {...stroke}
        />
        <path d="M46 86H74" {...stroke} />
        <path d="M48 94H72" {...stroke} />
        <path d="M52 102H68" {...stroke} />
      </svg>
    )
  }

  if (type === 'pen') {
    return (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <path d="M20 90C20 90 38 72 58 72C78 72 96 90 96 90" {...stroke} />
        <circle cx="20" cy="90" r="6" {...stroke} />
        <circle cx="58" cy="72" r="6" {...stroke} />
        <circle cx="96" cy="90" r="6" {...stroke} />
        <path d="M66 44L98 12L110 24L78 56L66 44Z" {...stroke} />
        <path d="M98 12L110 24" {...stroke} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g transform="rotate(-35 60 60)">
        <path
          d="M60 12C60 12 42 50 42 76C42 86 48 92 54 92H66C72 92 78 86 78 76C78 50 60 12 60 12Z"
          {...stroke}
        />
        <circle cx="60" cy="48" r="9" {...stroke} />
        <path d="M42 76L28 100L42 94" {...stroke} />
        <path d="M78 76L92 100L78 94" {...stroke} />
        <path d="M52 92L60 110L68 92" {...stroke} />
      </g>
    </svg>
  )
}

function HowItWorksSection() {
  return (
    <ScrollRevealSection
      className="how-section"
      id="how-it-works"
      ariaLabel="How it works"
    >
      <div className="how-inner reveal-group">
        <RevealItem>
          <span className="how-badge">How it works</span>
          <h2 className="how-heading">Here&apos;s what working together looks like</h2>
        </RevealItem>

        <RevealItem className="how-cards-wrap" delay={120}>
          <div className="how-cards">
            <article className="how-card how-card--1">
              <div className="how-card-inner">
                <span className="how-card-number">{HOW_IT_WORKS_STEPS[0].number}</span>
                <h3 className="how-card-title">{HOW_IT_WORKS_STEPS[0].title}</h3>
                <div className="how-card-icon" aria-hidden="true">
                  <HowItWorksIcon type={HOW_IT_WORKS_STEPS[0].icon} />
                </div>
                <p className="how-card-text">{HOW_IT_WORKS_STEPS[0].description}</p>
              </div>
            </article>

            <svg
              className="how-arrow how-arrow--one"
              viewBox="0 0 100 56"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 44C28 8 52 8 96 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M88 12L96 18L90 26"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <article className="how-card how-card--2">
              <div className="how-card-inner">
                <span className="how-card-number">{HOW_IT_WORKS_STEPS[1].number}</span>
                <h3 className="how-card-title">{HOW_IT_WORKS_STEPS[1].title}</h3>
                <div className="how-card-icon" aria-hidden="true">
                  <HowItWorksIcon type={HOW_IT_WORKS_STEPS[1].icon} />
                </div>
                <p className="how-card-text">{HOW_IT_WORKS_STEPS[1].description}</p>
              </div>
            </article>

            <svg
              className="how-arrow how-arrow--two"
              viewBox="0 0 100 56"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12C28 48 52 48 96 38"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M88 44L96 38L90 30"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <article className="how-card how-card--3">
              <div className="how-card-inner">
                <span className="how-card-number">{HOW_IT_WORKS_STEPS[2].number}</span>
                <h3 className="how-card-title">{HOW_IT_WORKS_STEPS[2].title}</h3>
                <div className="how-card-icon how-card-icon--rocket" aria-hidden="true">
                  <HowItWorksIcon type={HOW_IT_WORKS_STEPS[2].icon} />
                </div>
                <p className="how-card-text">{HOW_IT_WORKS_STEPS[2].description}</p>
              </div>
            </article>
          </div>
        </RevealItem>
      </div>
    </ScrollRevealSection>
  )
}

const FAQ_ITEMS = [
  {
    id: 'services',
    question: 'What services do you offer?',
    answer:
      'I specialize in UI/UX design, Framer development, and responsive web experiences tailored for businesses and startups.',
  },
  {
    id: 'custom',
    question: 'Do you create custom websites or only templates?',
    answer:
      'I build fully custom websites from scratch based on your brand and goals. Templates can be used as a starting point when they fit your needs, but every project is tailored to you.',
  },
  {
    id: 'timeline',
    question: 'How long does it take to complete a website project?',
    answer:
      'Most projects take 2–4 weeks depending on scope, content readiness, and revisions. I’ll share a clear timeline after we discuss your requirements.',
  },
  {
    id: 'existing-brand',
    question: 'Can you work with my existing brand or website?',
    answer:
      'Yes. I can redesign your current site, refresh your brand visuals, or build on top of what you already have while keeping your identity consistent.',
  },
  {
    id: 'revisions',
    question: 'Do you offer revisions after the project is delivered?',
    answer:
      'Yes. Each project includes revision rounds during development, plus post-launch support so small tweaks and fixes are covered after delivery.',
  },
  {
    id: 'framer-seo',
    question: 'Is Framer good for SEO and performance?',
    answer:
      'Framer sites are fast, mobile-friendly, and SEO-ready with clean code, meta controls, and strong performance out of the box when set up properly.',
  },
  {
    id: 'process',
    question: "What's your process for starting a new project?",
    answer:
      'We start with a free call to understand your goals, then move through discovery, design, development, and launch—with clear updates at every step.',
  },
  {
    id: 'get-started',
    question: 'How can I get started with you?',
    answer:
      'Book a free call through the contact button on this site. Share your project details and we’ll map out the next steps together.',
  },
]

function FaqSection() {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <ScrollRevealSection
      className="faq-section"
      id="faqs"
      ariaLabel="Frequently asked questions"
    >
      <div className="faq-inner reveal-group">
        <RevealItem>
          <span className="faq-badge">FAQs</span>
          <h2 className="faq-heading">Frequently Asked Questions</h2>
        </RevealItem>

        <RevealItem className="faq-list-wrap" delay={100}>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id

              return (
                <RevealItem key={item.id} delay={160 + index * 60}>
                  <article className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <span
                      className={`faq-icon${isOpen ? ' faq-icon--open' : ''}`}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                  </article>
                </RevealItem>
              )
            })}
          </div>
        </RevealItem>
      </div>
    </ScrollRevealSection>
  )
}

function CtaSection() {
  return (
    <ScrollRevealSection className="cta-section" id="contact" ariaLabel="Contact">
      <div className="cta-inner reveal-group">
        <RevealItem delay={0}>
          <div className="cta-card">
          <RevealItem delay={80}>
          <div className="cta-body">
            <h2 className="cta-heading">
              <span className="cta-heading-line">Ready to Automate Smarter?</span>
              <span className="cta-heading-line">Let&apos;s Build Together</span>
            </h2>
            <p className="cta-subheading">Schedule a call and begin automating</p>

            <a className="book-call-btn cta-btn" href="#contact">
              <span>Book a Free Call</span>
              <span className="book-call-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>

            <p className="cta-slots">
              <span className="cta-slots-dot" aria-hidden="true" />
              Open to Remote Work
            </p>
          </div>
          </RevealItem>

          <RevealItem delay={180}>
          <div className="cta-footer">
            <div className="cta-social" aria-label="Social links">
              <a className="cta-social-link" href="#" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <span className="cta-social-divider" aria-hidden="true" />
              <a className="cta-social-link" href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <span className="cta-social-divider" aria-hidden="true" />
              <a className="cta-social-link" href="#" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.58 7.18a2.5 2.5 0 0 0-1.76-1.77C18.12 5 12 5 12 5s-6.12 0-7.82.41a2.5 2.5 0 0 0-1.76 1.77A26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.82 2.5 2.5 0 0 0 1.76 1.77C5.88 19 12 19 12 19s6.12 0 7.82-.41a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.82zM10 15.5v-7l6 3.5-6 3.5z" />
                </svg>
              </a>
            </div>

            <a className="cta-email" href="mailto:hello@thomas.design">
              hello@thomas.design
            </a>
          </div>
          </RevealItem>
          </div>
        </RevealItem>
      </div>
    </ScrollRevealSection>
  )
}

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-inner">
        <span className="projects-badge">My Projects</span>
        <h2 className="projects-heading">My Latest Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-year">{project.year}</span>
              </div>
              <a className="project-image-wrap" href={project.href}>
                <img
                  className="project-image"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
              </a>
            </article>
          ))}
        </div>
        <a className="projects-view-all" href="#projects">
          View all Projects
        </a>
      </div>
    </section>
  )
}

const BENTO_STEPS = ['Create Design', 'Build Framer', 'Launch']

const BENTO_STATS = [
  { label: 'Delivered on Time', icon: 'clock' },
  { label: 'High-Quality Design', icon: 'star' },
  { label: 'Client Satisfaction', icon: 'heart' },
]

function BentoSection() {
  return (
    <section className="bento-section" aria-label="Highlights">
      <div className="bento-inner">
        <div className="bento-grid">
          <article className="bento-card bento-hero">
            <div className="bento-hero-content">
              <p className="bento-hero-name">Haider Ghauri</p>
              <p className="bento-hero-role">
                UI/UX Design &amp; Framer Development
              </p>
              <span className="bento-hero-badge">FRAMER EXPERT</span>
              <a className="bento-hero-cta" href="#contact">
                Contact Me
              </a>
            </div>
            <img
              className="bento-hero-photo"
              src={profilePhoto}
              alt="Haider Ghauri"
            />
          </article>

          <article className="bento-card bento-steps">
            <h3 className="bento-steps-title">3 steps for your success</h3>
            <ul className="bento-steps-list">
              {BENTO_STEPS.map((step) => (
                <li key={step}>
                  <span className="bento-step-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {step}
                </li>
              ))}
            </ul>
            <div className="bento-steps-deco" aria-hidden="true" />
          </article>

          <article className="bento-card bento-stats">
            <div className="bento-framer-logo" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M4 28L16 4L28 28H20L16 18L12 28H4Z" fill="#f97316" />
              </svg>
            </div>
            <p className="bento-stats-count">20+ Projects Complete</p>
            <ul className="bento-stats-list">
              {BENTO_STATS.map(({ label, icon }) => (
                <li key={label}>
                  <span className={`bento-stat-icon bento-stat-icon--${icon}`}>
                    {icon === 'clock' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {icon === 'star' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4L14.5 9.5L20.5 10.2L16 14.2L17.2 20.2L12 17.2L6.8 20.2L8 14.2L3.5 10.2L9.5 9.5L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    )}
                    {icon === 'heart' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20.5C12 20.5 4 15 4 9.5C4 7 6 5 8.5 5C10.2 5 12 6.2 12 6.2C12 6.2 13.8 5 15.5 5C18 5 20 7 20 9.5C20 15 12 20.5 12 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </article>

          <article className="bento-card bento-feature bento-feature--support">
            <div className="bento-feature-visual">
              <img src={bentoOne} alt="" loading="lazy" />
            </div>
            <div className="bento-feature-copy">
              <h3 className="bento-feature-title">24-Hour Email Support</h3>
              <p className="bento-feature-text">
                Reach out anytime, and get help within 24 hours.
              </p>
            </div>
          </article>

          <article className="bento-card bento-feature bento-feature--clients">
            <div className="bento-feature-visual bento-feature-visual--dark">
              <img src={bentoTwo} alt="" loading="lazy" />
            </div>
            <div className="bento-feature-copy bento-feature-copy--light">
              <p className="bento-feature-stat">100%</p>
              <p className="bento-feature-stat-label">Happy Clients</p>
              <div className="bento-feature-stars" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 4L14.5 9.5L20.5 10.2L16 14.2L17.2 20.2L12 17.2L6.8 20.2L8 14.2L3.5 10.2L9.5 9.5L12 4Z" />
                  </svg>
                ))}
              </div>
            </div>
          </article>

          <article className="bento-card bento-feature bento-feature--launch">
            <div className="bento-feature-visual bento-feature-visual--dark">
              <span className="bento-feature-mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <path d="M4 28L16 4L28 28H20L16 18L12 28H4Z" fill="#ffffff" />
                </svg>
              </span>
              <img src={bentoThree} alt="" loading="lazy" />
            </div>
            <div className="bento-feature-copy bento-feature-copy--light">
              <h3 className="bento-feature-title">
                Build and launch websites with confidence
              </h3>
              <p className="bento-feature-text">
                A streamlined process to design, customize, and publish modern
                websites faster.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
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

function App() {
  return (
    <>
      <Topbar />
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal>
        <TrustedSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProjectsSection />
      </ScrollReveal>
      <ScrollReveal>
        <BentoSection />
      </ScrollReveal>
      <ServicesSection />
      <HowItWorksSection />
      <FaqSection />
      <CtaSection />
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </>
  )
}

export default App
