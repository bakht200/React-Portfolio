import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BentoDailyCaseStudy from './BentoDailyCaseStudy'
import CaseStudiesSection from './CaseStudiesSection'
import ProjectsSection from './ProjectsSection'
import RouteTransition from './RouteTransition'
import SiteChrome, { NavAnchor } from './SiteChrome'
import { aboutPath } from './about'
import { NAV_FORWARD } from './pageTransition'
import { scrollToSection } from './pageTransition'
import profilePhoto from './assets/recommend-optimized.png'
import bentoOne from './assets/bento-1.jpg'
import bentoTwo from './assets/bento-2.jpg'
import './App.css'

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
              <Link
                className="profile-message-btn"
                to={aboutPath()}
                state={NAV_FORWARD}
                aria-label="About me"
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
              </Link>
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
              <span>Explore My Work</span>
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
    id: 'healthcare',
    label: 'Healthcare & HIPAA',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="6" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10v8M10 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 12h3M20 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ai-products',
    label: 'AI Products',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="7" y="9" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="14" r="1.5" fill="currentColor" />
        <circle cx="17" cy="14" r="1.5" fill="currentColor" />
        <path d="M12 17.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 6v3M18 6v3M7 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'hrms',
    label: 'HRMS & HCM',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 13h16M11 8v16M17 8v16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'fintech',
    label: 'Fintech',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 13h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 7h3l2 12h8l2-9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="22" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="22" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'inventory',
    label: 'Inventory & Ops',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l9 5v10l-9 5-9-5V9l9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 14v10M5 9l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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

const EXPERTISE_ITEMS = [
  {
    id: 'product-design',
    title: 'Product Design',
    description:
      'End-to-end design from discovery and wireframes to high-fidelity UI and developer handoff.',
    icon: 'product',
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    description:
      'Scalable component libraries and design tokens that keep teams consistent and shipping faster.',
    icon: 'systems',
  },
  {
    id: 'ai-product-design',
    title: 'AI Product Design',
    description:
      'Designing intelligent interfaces — agentic flows, AI onboarding, and trust-first interaction patterns.',
    icon: 'ai',
  },
  {
    id: 'ux-research',
    title: 'UX Research',
    description:
      'User interviews, usability testing, and data synthesis that ground design decisions in reality.',
    icon: 'research',
  },
  {
    id: 'collaboration',
    title: 'Cross-functional Collaboration',
    description:
      'Clean Figma handoffs and close partnership with engineering, product, and business stakeholders.',
    icon: 'collaboration',
  },
]

function ExpertiseIcon({ type }) {
  if (type === 'product') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.8" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.8" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.8" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.8" />
      </svg>
    )
  }

  if (type === 'systems') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.8" />
        <path
          d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (type === 'ai') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l1.8 5.5L19 10l-5.2 1.5L12 17l-1.8-5.5L5 10l5.2-1.5L12 3Z"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'research') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="5.5" stroke="#fff" strokeWidth="1.8" />
        <path d="M15 15l5.5 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 7l-1.5 3M7 7l1.5 3M12 4v3M5 12h3M16 12h3M12 17v3"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 14.5c1.2 1.2 2.8 1.8 4.5 1.8M15.5 9.5c-1.2-1.2-2.8-1.8-4.5-1.8"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ExpertiseSection() {
  const serviceTools = [...SERVICE_TOOLS, ...SERVICE_TOOLS]

  return (
    <section className="services-section" id="expertise">
      <div className="services-inner">
        <div className="services-top">
          <div className="services-left">
            <span className="services-badge">My Expertise</span>
            <h2 className="services-heading">What I bring to a team.</h2>
            <p className="services-description">
              I work across the full product lifecycle — from understanding user
              problems to shipping polished, developer-ready designs.
            </p>
            <a className="book-call-btn services-cta" href="#contact">
              <span>Get In Touch</span>
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
          </div>

          <div className="services-cards" aria-label="Areas of expertise">
            {EXPERTISE_ITEMS.map((item) => (
              <article className="service-card" key={item.id}>
                <div className="service-card-icon" aria-hidden="true">
                  <ExpertiseIcon type={item.icon} />
                </div>
                <h3 className="service-card-title">{item.title}</h3>
                <p className="service-card-description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

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
    </section>
  )
}

const HOW_I_WORK_STEPS = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand the Problem',
    description:
      'I start with research — talking to users, mapping existing workflows, and aligning with stakeholders on what success actually looks like. No screens until the problem is clear.',
    icon: 'bulb',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design & Iterate',
    description:
      'From wireframes to high-fidelity UI, I design in tight loops — testing assumptions early, refining based on feedback, and building design systems that scale with the product.',
    icon: 'pen',
  },
  {
    id: 'ship',
    number: '03',
    title: 'Ship & Support',
    description:
      'I stay involved through developer handoff to make sure what ships matches what was designed — and keep iterating post-launch based on real usage data.',
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

function HowIWorkSection() {
  return (
    <ScrollRevealSection
      className="how-section"
      id="how-i-work"
      ariaLabel="How I work"
    >
      <div className="how-inner reveal-group">
        <RevealItem>
          <span className="how-badge">How I Work</span>
          <h2 className="how-heading">How I approach a design problem.</h2>
          <p className="how-subheading">
            Not a rigid process — a mindset that adapts to the problem at hand.
          </p>
        </RevealItem>

        <RevealItem className="how-cards-wrap" delay={120}>
          <div className="how-cards">
            <article className="how-card how-card--1">
              <div className="how-card-inner">
                <span className="how-card-number">{HOW_I_WORK_STEPS[0].number}</span>
                <h3 className="how-card-title">{HOW_I_WORK_STEPS[0].title}</h3>
                <div className="how-card-icon" aria-hidden="true">
                  <HowItWorksIcon type={HOW_I_WORK_STEPS[0].icon} />
                </div>
                <p className="how-card-text">{HOW_I_WORK_STEPS[0].description}</p>
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
                <span className="how-card-number">{HOW_I_WORK_STEPS[1].number}</span>
                <h3 className="how-card-title">{HOW_I_WORK_STEPS[1].title}</h3>
                <div className="how-card-icon" aria-hidden="true">
                  <HowItWorksIcon type={HOW_I_WORK_STEPS[1].icon} />
                </div>
                <p className="how-card-text">{HOW_I_WORK_STEPS[1].description}</p>
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
                <span className="how-card-number">{HOW_I_WORK_STEPS[2].number}</span>
                <h3 className="how-card-title">{HOW_I_WORK_STEPS[2].title}</h3>
                <div className="how-card-icon how-card-icon--rocket" aria-hidden="true">
                  <HowItWorksIcon type={HOW_I_WORK_STEPS[2].icon} />
                </div>
                <p className="how-card-text">{HOW_I_WORK_STEPS[2].description}</p>
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
    id: 'full-time',
    question: 'Are you available for full-time remote roles?',
    answer:
      'Yes. I am actively open to full-time remote product design roles with teams across the US, EU, and worldwide. I bring 5+ years of experience shipping enterprise SaaS, AI products, and healthcare platforms.',
  },
  {
    id: 'freelance',
    question: 'Are you available for freelance or contract work?',
    answer:
      'Yes, selectively. I take on freelance and contract engagements for product design, design systems, and UX research — especially for startups and teams that need senior-level design without a full-time hire.',
  },
  {
    id: 'industries',
    question: 'What industries have you designed for?',
    answer:
      'Healthcare & HIPAA, AI products, HRMS & HCM, fintech, e-commerce, and enterprise SaaS. I have shipped products used by clinical teams, HR departments, and consumer-facing platforms.',
  },
  {
    id: 'process',
    question: 'What does your design process look like?',
    answer:
      'I start by understanding the problem through research and stakeholder alignment, then move into iterative design — wireframes to high-fidelity UI — and stay involved through developer handoff and post-launch iteration.',
  },
  {
    id: 'ai',
    question: 'Do you have experience designing AI products?',
    answer:
      'Yes. I have designed AI coaching platforms, agentic workflows, and AI onboarding flows — with a focus on trust-first interaction patterns that make intelligent features feel transparent and useful.',
  },
  {
    id: 'design-system',
    question: 'Can you work with an existing design system?',
    answer:
      'Absolutely. I regularly extend and contribute to existing design systems — building new components, refining tokens, and ensuring consistency across product surfaces while shipping new features.',
  },
  {
    id: 'tools',
    question: 'What tools do you use?',
    answer:
      'Figma for design and handoff, ProtoPie for interactions, Framer for portfolio and web, Notion for documentation, Jira for project tracking, and ChatGPT for research and ideation.',
  },
  {
    id: 'start',
    question: 'How quickly can you start?',
    answer:
      'For full-time roles, I can typically start within two to four weeks depending on notice periods. For contract work, I can often begin within one to two weeks after we align on scope.',
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
              <span className="cta-heading-line">Let&apos;s build something great together.</span>
            </h2>
            <p className="cta-subheading">
              Open to full-time remote roles, freelance projects, and design
              collaborations across the US, EU, and worldwide.
            </p>

            <a className="book-call-btn cta-btn" href="#contact">
              <span>Get In Touch</span>
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

const BENTO_SKILL_PILLS = [
  'Product Design',
  'Design Systems',
  'AI UX',
  'UX Research',
  'Prototyping',
  'Dev Handoff',
]

const BENTO_STACK_TOOLS = [
  ['Figma', 'Framer', 'ProtoPie'],
  ['Notion', 'Jira', 'Figma AI'],
]

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

          <article className="bento-card bento-steps bento-stack">
            <span className="bento-feature-tag">My Stack</span>
            <div className="bento-stack-rows">
              {BENTO_STACK_TOOLS.map((row) => (
                <div className="bento-stack-row" key={row.join('-')}>
                  {row.map((tool) => (
                    <span className="bento-stack-tool" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="bento-steps-deco" aria-hidden="true" />
          </article>

          <article className="bento-card bento-stats">
            <div className="bento-framer-logo" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M4 28L16 4L28 28H20L16 18L12 28H4Z" fill="currentColor" />
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
              <span className="bento-feature-tag">Design Philosophy</span>
              <blockquote className="bento-feature-quote">
                &ldquo;I design products that feel obvious in hindsight.&rdquo;
              </blockquote>
              <p className="bento-feature-text">
                5+ years turning complex problems into interfaces people actually
                enjoy using.
              </p>
            </div>
          </article>

          <article className="bento-card bento-feature bento-feature--clients">
            <div className="bento-feature-visual bento-feature-visual--dark">
              <img src={bentoTwo} alt="" loading="lazy" />
            </div>
            <div className="bento-feature-copy bento-feature-copy--light">
              <span className="bento-feature-tag bento-feature-tag--light">Core Skills</span>
              <div className="bento-skill-pills" aria-label="Core skills">
                {BENTO_SKILL_PILLS.map((skill) => (
                  <span className="bento-skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <BentoDailyCaseStudy />
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.scrollTo) return undefined

    const timer = window.setTimeout(() => {
      scrollToSection(location.state.scrollTo)
    }, 480)

    return () => window.clearTimeout(timer)
  }, [location])

  return (
    <>
      <SiteChrome />
      <main className="landing-main">
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <TrustedSection />
        </ScrollReveal>
        <ScrollReveal>
          <BentoSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
        <ScrollReveal>
          <ExpertiseSection />
        </ScrollReveal>
        <ScrollReveal>
          <CaseStudiesSection />
        </ScrollReveal>
        <ScrollReveal>
          <HowIWorkSection />
        </ScrollReveal>
        <ScrollReveal>
          <FaqSection />
        </ScrollReveal>
        <ScrollReveal>
          <CtaSection />
        </ScrollReveal>
        <ScrollReveal>
          <SiteChrome.Footer />
        </ScrollReveal>
      </main>
    </>
  )
}

function App() {
  return <RouteTransition homePage={<HomePage />} />
}

export default App
