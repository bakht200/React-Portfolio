import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../content/ContentContext'
import { publishContent, uploadPortfolioImage, uploadPortfolioPdf } from '../content/supabaseApi'
import { defaultContent } from '../content/defaultContent'
import { resolveContentAsset } from '../content/resolveAsset'

function Field({ label, children }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

function SectionHeader({ title, description }) {
  return (
    <header className="admin-page-header">
      <h1 className="admin-page-title">{title}</h1>
      {description ? <p className="admin-page-desc">{description}</p> : null}
    </header>
  )
}

export function PublishStatus() {
  const { publishState, publishError, publishNow } = useContent()
  const labels = {
    idle: 'Ready',
    pending: 'Unsaved changes…',
    publishing: 'Publishing…',
    saved: 'Published — live for everyone',
    error: 'Publish failed',
  }
  return (
    <div className={`admin-publish admin-publish--${publishState}`}>
      <span>{labels[publishState] || publishState}</span>
      {publishError ? <span className="admin-error">{publishError}</span> : null}
      <button type="button" className="admin-btn admin-btn--sm" onClick={publishNow}>
        Publish now
      </button>
    </div>
  )
}

function ImageUpload({ onUploaded, folder = 'uploads', label = 'Upload image' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState('')

  const handleChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    setDone('')
    try {
      const url = await uploadPortfolioImage(file, folder)
      onUploaded(url)
      setDone('Uploaded to Supabase')
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="admin-upload">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.svg"
        disabled={uploading}
        hidden
        onChange={handleChange}
      />
      <button
        type="button"
        className="admin-btn admin-btn--sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? 'Uploading…' : label}
      </button>
      {done ? <span className="admin-upload-hint admin-upload-hint--ok">{done}</span> : null}
      {error ? <span className="admin-error">{error}</span> : null}
    </div>
  )
}

function LogoUploadField({ value, onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState('')
  const previewSrc = value ? resolveContentAsset(value) : null

  const handleChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    setDone('')
    try {
      const url = await uploadPortfolioImage(file, 'site')
      onChange(url)
      setDone('Logo uploaded — publishing…')
    } catch (err) {
      setError(err.message || 'Upload failed. Sign in and try again.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="admin-logo-field">
      <span className="admin-logo-label">Logo</span>
      <p className="admin-field-hint">Upload a new logo for the header and footer. PNG, JPG, or SVG.</p>
      <div className="admin-logo-preview">
        {previewSrc ? (
          <img src={previewSrc} alt="Current logo" />
        ) : (
          <span className="admin-logo-empty">No logo yet</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.svg"
        disabled={uploading}
        hidden
        onChange={handleChange}
      />
      <button
        type="button"
        className="admin-btn admin-btn--primary"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? 'Uploading…' : 'Upload new logo'}
      </button>
      {done ? <span className="admin-upload-hint admin-upload-hint--ok">{done}</span> : null}
      {error ? <span className="admin-error">{error}</span> : null}
    </div>
  )
}

function ImageField({ label, value, onChange, folder = 'uploads', hint }) {
  const previewSrc = value ? resolveContentAsset(value) : null

  return (
    <Field label={label}>
      {hint ? <p className="admin-field-hint">{hint}</p> : null}
      <input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Asset key or Supabase URL"
      />
      {previewSrc ? (
        <div className="admin-upload-preview">
          <img src={previewSrc} alt="" />
        </div>
      ) : null}
      <ImageUpload folder={folder} onUploaded={onChange} />
    </Field>
  )
}

function PdfUpload({ onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadPortfolioPdf(file)
      onUploaded(url)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="admin-upload">
      <input type="file" accept="application/pdf,.pdf" disabled={uploading} onChange={handleChange} />
      {uploading ? <span className="admin-upload-hint">Uploading…</span> : null}
      {error ? <span className="admin-error">{error}</span> : null}
    </div>
  )
}

export function AdminDashboard() {
  const { exportJson, importJson, resetContent, isSupabaseConfigured } = useContent()
  const fileRef = useRef(null)

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importJson(reader.result)
        alert('Content imported and published.')
      } catch {
        alert('Invalid JSON file.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleSeed = async () => {
    if (!window.confirm('Publish default content to the live site?')) return
    try {
      await publishContent(structuredClone(defaultContent))
      window.location.reload()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      <SectionHeader
        title="Dashboard"
        description="Edits auto-publish to Supabase so everyone sees your portfolio."
      />
      <div className="admin-card-grid">
        <div className="admin-card">
          <h2>Quick actions</h2>
          <div className="admin-btn-row">
            <button type="button" className="admin-btn admin-btn--primary" onClick={handleExport}>
              Export JSON
            </button>
            <button type="button" className="admin-btn" onClick={() => fileRef.current?.click()}>
              Import JSON
            </button>
            <input ref={fileRef} type="file" accept=".json" hidden onChange={handleImport} />
            <button type="button" className="admin-btn" onClick={handleSeed}>
              Seed defaults live
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => {
                if (window.confirm('Reset all content to defaults and publish?')) resetContent()
              }}
            >
              Reset defaults
            </button>
          </div>
        </div>
        <div className="admin-card">
          <h2>Sections</h2>
          <ul className="admin-link-list">
            <li><Link to="/admin/theme">Theme & Colors</Link></li>
            <li><Link to="/admin/hero">Hero & Site info</Link></li>
            <li><Link to="/admin/trusted">Proudly Worked With</Link></li>
            <li><Link to="/admin/expertise">Expertise</Link></li>
            <li><Link to="/admin/projects">Projects</Link></li>
            <li><Link to="/admin/case-studies">Case Studies</Link></li>
            <li><Link to="/admin/about">About page</Link></li>
            <li><Link to="/admin/faq">FAQ</Link></li>
            <li><Link to="/admin/footer">Footer & emails</Link></li>
            <li><Link to="/admin/cta">CTA banner</Link></li>
            <li><Link to="/admin/orbit">Orbit icons</Link></li>
          </ul>
        </div>
        <div className="admin-card admin-card--note">
          <h2>Supabase</h2>
          <p>
            {isSupabaseConfigured
              ? 'Content is stored in Supabase. Visitors load the published version on every visit.'
              : 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable cloud publishing.'}
          </p>
        </div>
      </div>
    </>
  )
}

export function ThemeEditor() {
  const { content, updateSection, fontOptions } = useContent()
  const theme = content.theme

  const set = (key, value) => updateSection('theme', { ...theme, [key]: value })

  return (
    <>
      <SectionHeader title="Theme & Colors" description="Primary palette, backgrounds, and font family." />
      <div className="admin-form-grid">
        <Field label="Primary color">
          <input type="color" value={theme.primary} onChange={(e) => set('primary', e.target.value)} />
        </Field>
        <Field label="Primary hover">
          <input type="color" value={theme.primaryHover} onChange={(e) => set('primaryHover', e.target.value)} />
        </Field>
        <Field label="Background">
          <input type="color" value={theme.background} onChange={(e) => set('background', e.target.value)} />
        </Field>
        <Field label="Heading text">
          <input type="color" value={theme.textHeading} onChange={(e) => set('textHeading', e.target.value)} />
        </Field>
        <Field label="Body text">
          <input type="color" value={theme.textBody} onChange={(e) => set('textBody', e.target.value)} />
        </Field>
        <Field label="Muted text">
          <input type="color" value={theme.textMuted} onChange={(e) => set('textMuted', e.target.value)} />
        </Field>
        <Field label="Font family">
          <select value={theme.fontFamily} onChange={(e) => set('fontFamily', e.target.value)}>
            {fontOptions.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </Field>
      </div>
    </>
  )
}

export function HeroEditor() {
  const { content, updateSection } = useContent()
  const { hero, site } = content

  return (
    <>
      <SectionHeader title="Hero & Site" description="Name, hero copy, and logo." />
      <div className="admin-form-grid">
        <Field label="Site title (browser tab)">
          <input value={site.title} onChange={(e) => updateSection('site', { ...site, title: e.target.value })} />
        </Field>
        <Field label="Your name">
          <input value={site.name} onChange={(e) => updateSection('site', { ...site, name: e.target.value })} />
        </Field>
        <LogoUploadField
          value={site.logoAsset}
          onChange={(logoAsset) => updateSection('site', { ...site, logoAsset })}
        />
        <Field label="Hero badge">
          <input value={hero.badge} onChange={(e) => updateSection('hero', { ...hero, badge: e.target.value })} />
        </Field>
        <Field label="Hero line 1">
          <input value={hero.line1} onChange={(e) => updateSection('hero', { ...hero, line1: e.target.value })} />
        </Field>
        <Field label="Accent phrase">
          <input value={hero.accent} onChange={(e) => updateSection('hero', { ...hero, accent: e.target.value })} />
        </Field>
        <Field label="Hero line 3">
          <input value={hero.line3} onChange={(e) => updateSection('hero', { ...hero, line3: e.target.value })} />
        </Field>
        <Field label="Subheading">
          <textarea rows={4} value={hero.subheading} onChange={(e) => updateSection('hero', { ...hero, subheading: e.target.value })} />
        </Field>
        <Field label="Primary CTA">
          <input value={hero.primaryCta} onChange={(e) => updateSection('hero', { ...hero, primaryCta: e.target.value })} />
        </Field>
        <Field label="Secondary CTA">
          <input value={hero.secondaryCta} onChange={(e) => updateSection('hero', { ...hero, secondaryCta: e.target.value })} />
        </Field>
      </div>
    </>
  )
}

export function TrustedEditor() {
  const { content, updateSection } = useContent()
  const raw = content.trusted ?? {}
  const trusted = {
    label: raw.label ?? 'Proudly worked with:',
    logos: raw.logos ?? [],
  }

  const updateLogo = (index, patch) => {
    const logos = trusted.logos.map((item, i) => (i === index ? { ...item, ...patch } : item))
    updateSection('trusted', { ...trusted, logos })
  }

  const addLogo = () => {
    updateSection('trusted', {
      ...trusted,
      logos: [
        ...trusted.logos,
        { id: `partner-${Date.now()}`, label: 'New partner', image: '' },
      ],
    })
  }

  return (
    <>
      <SectionHeader
        title="Proudly Worked With"
        description="Marquee of industries and partners — each item has a label and optional icon image."
      />
      <div className="admin-form-grid">
        <Field label="Section label">
          <input
            value={trusted.label}
            onChange={(e) => updateSection('trusted', { ...trusted, label: e.target.value })}
          />
        </Field>
      </div>
      <button type="button" className="admin-btn admin-btn--primary admin-btn--mb" onClick={addLogo}>
        + Add item
      </button>
      {trusted.logos.map((logo, index) => (
        <details key={logo.id} className="admin-accordion" open={index === 0}>
          <summary>{logo.label || 'Untitled'}</summary>
          <div className="admin-form-grid">
            <Field label="Label (text)">
              <input value={logo.label} onChange={(e) => updateLogo(index, { label: e.target.value })} />
            </Field>
            <ImageField
              label="Icon image"
              hint="Upload a logo or icon. Leave empty to use the default built-in icon."
              value={logo.image}
              folder="trusted"
              onChange={(image) => updateLogo(index, { image })}
            />
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() =>
                updateSection('trusted', {
                  ...trusted,
                  logos: trusted.logos.filter((_, i) => i !== index),
                })
              }
            >
              Delete item
            </button>
          </div>
        </details>
      ))}
    </>
  )
}

const EXPERTISE_ICON_OPTIONS = [
  { value: 'product', label: 'Product (grid)' },
  { value: 'systems', label: 'Systems (orbit)' },
  { value: 'ai', label: 'AI (star)' },
  { value: 'research', label: 'Research (search)' },
  { value: 'collaboration', label: 'Collaboration (nodes)' },
]

export function ExpertiseEditor() {
  const { content, updateSection } = useContent()
  const raw = content.expertise ?? {}
  const expertise = {
    badge: raw.badge ?? 'My Expertise',
    heading: raw.heading ?? '',
    description: raw.description ?? '',
    ctaText: raw.ctaText ?? 'Get In Touch',
    items: raw.items ?? [],
    tools: raw.tools ?? [],
  }

  const setRoot = (patch) => updateSection('expertise', { ...expertise, ...patch })

  const updateItem = (index, patch) => {
    const items = expertise.items.map((item, i) => (i === index ? { ...item, ...patch } : item))
    setRoot({ items })
  }

  const updateTool = (index, patch) => {
    const tools = expertise.tools.map((tool, i) => (i === index ? { ...tool, ...patch } : tool))
    setRoot({ tools })
  }

  return (
    <>
      <SectionHeader
        title="Expertise"
        description="My Expertise section — heading, skill cards, and tools marquee."
      />
      <div className="admin-form-grid">
        <Field label="Badge">
          <input value={expertise.badge} onChange={(e) => setRoot({ badge: e.target.value })} />
        </Field>
        <Field label="Heading">
          <input value={expertise.heading} onChange={(e) => setRoot({ heading: e.target.value })} />
        </Field>
        <Field label="Description">
          <textarea
            rows={4}
            value={expertise.description}
            onChange={(e) => setRoot({ description: e.target.value })}
          />
        </Field>
        <Field label="CTA button text">
          <input value={expertise.ctaText} onChange={(e) => setRoot({ ctaText: e.target.value })} />
        </Field>
      </div>

      <h3 className="admin-subtitle">Skill cards</h3>
      <button
        type="button"
        className="admin-btn admin-btn--primary admin-btn--mb"
        onClick={() =>
          setRoot({
            items: [
              ...expertise.items,
              {
                id: `skill-${Date.now()}`,
                title: 'New skill',
                description: 'Description here.',
                icon: 'product',
                image: '',
              },
            ],
          })
        }
      >
        + Add skill card
      </button>
      {expertise.items.map((item, index) => (
        <details key={item.id} className="admin-accordion">
          <summary>{item.title}</summary>
          <div className="admin-form-grid">
            <Field label="Title">
              <input value={item.title} onChange={(e) => updateItem(index, { title: e.target.value })} />
            </Field>
            <Field label="Description">
              <textarea
                rows={3}
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.target.value })}
              />
            </Field>
            <Field label="Built-in icon (if no custom image)">
              <select value={item.icon} onChange={(e) => updateItem(index, { icon: e.target.value })}>
                {EXPERTISE_ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <ImageField
              label="Custom card image"
              hint="Optional — overrides the built-in icon on the card."
              value={item.image}
              folder="expertise"
              onChange={(image) => updateItem(index, { image })}
            />
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => setRoot({ items: expertise.items.filter((_, i) => i !== index) })}
            >
              Delete card
            </button>
          </div>
        </details>
      ))}

      <h3 className="admin-subtitle">Tools marquee</h3>
      <button
        type="button"
        className="admin-btn admin-btn--primary admin-btn--mb"
        onClick={() =>
          setRoot({
            tools: [...expertise.tools, { id: `tool-${Date.now()}`, label: 'New tool', image: '' }],
          })
        }
      >
        + Add tool
      </button>
      {expertise.tools.map((tool, index) => (
        <details key={tool.id} className="admin-accordion">
          <summary>{tool.label}</summary>
          <div className="admin-form-grid">
            <Field label="Label (text)">
              <input value={tool.label} onChange={(e) => updateTool(index, { label: e.target.value })} />
            </Field>
            <ImageField
              label="Tool icon"
              hint="Upload tool logo (Figma, Photoshop, etc.)."
              value={tool.image}
              folder="expertise/tools"
              onChange={(image) => updateTool(index, { image })}
            />
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => setRoot({ tools: expertise.tools.filter((_, i) => i !== index) })}
            >
              Delete tool
            </button>
          </div>
        </details>
      ))}
    </>
  )
}


export function ProjectsEditor() {
  const { content, updateSection } = useContent()
  const projects = content.projects

  const updateProject = (index, patch) => {
    const next = projects.map((p, i) => (i === index ? { ...p, ...patch } : p))
    updateSection('projects', next)
  }

  const addProject = () => {
    updateSection('projects', [
      ...projects,
      {
        id: `project-${Date.now()}`,
        title: 'New Project',
        categoryId: 'ai-products',
        tool: 'Figma',
        year: '2026',
        yearDisplay: '/2026',
        image: 'project-1.jpg',
        content: ['Description paragraph.'],
      },
    ])
  }

  return (
    <>
      <SectionHeader title="Projects" description="Edit project cards and detail page content." />
      <button type="button" className="admin-btn admin-btn--primary admin-btn--mb" onClick={addProject}>
        + Add project
      </button>
      {projects.map((project, index) => (
        <details key={project.id} className="admin-accordion" open={index === 0}>
          <summary>{project.title}</summary>
          <div className="admin-form-grid">
            <Field label="ID (URL slug)">
              <input value={project.id} onChange={(e) => updateProject(index, { id: e.target.value })} />
            </Field>
            <Field label="Title">
              <input value={project.title} onChange={(e) => updateProject(index, { title: e.target.value })} />
            </Field>
            <Field label="Category ID">
              <input value={project.categoryId} onChange={(e) => updateProject(index, { categoryId: e.target.value })} />
            </Field>
            <Field label="Tool">
              <input value={project.tool} onChange={(e) => updateProject(index, { tool: e.target.value })} />
            </Field>
            <Field label="Year">
              <input value={project.year} onChange={(e) => updateProject(index, { year: e.target.value })} />
            </Field>
            <ImageField
              label="Image"
              value={project.image}
              folder="projects"
              onChange={(image) => updateProject(index, { image })}
            />
            <Field label="Content paragraphs (one per line)">
              <textarea
                rows={5}
                value={project.content.join('\n')}
                onChange={(e) => updateProject(index, { content: e.target.value.split('\n').filter(Boolean) })}
              />
            </Field>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => updateSection('projects', projects.filter((_, i) => i !== index))}
            >
              Delete project
            </button>
          </div>
        </details>
      ))}
    </>
  )
}

export function CaseStudiesEditor() {
  const { content, updateSection } = useContent()
  const caseStudies = content.caseStudies

  const updateStudy = (index, patch) => {
    const next = caseStudies.map((s, i) => (i === index ? { ...s, ...patch } : s))
    updateSection('caseStudies', next)
  }

  const addStudy = () => {
    updateSection('caseStudies', [
      ...caseStudies,
      {
        id: `study-${Date.now()}`,
        title: 'New Case Study',
        date: '2026',
        dateTime: '2026',
        time: '10:00 AM',
        image: 'bento-1.jpg',
        pdf: 'case-studies/pomhealthcasestudy.pdf',
        excerpt: '',
      },
    ])
  }

  return (
    <>
      <SectionHeader title="Case Studies" />
      <button type="button" className="admin-btn admin-btn--primary admin-btn--mb" onClick={addStudy}>
        + Add case study
      </button>
      {caseStudies.map((study, index) => (
        <details key={study.id} className="admin-accordion">
          <summary>{study.title}</summary>
          <div className="admin-form-grid">
            <Field label="ID">
              <input value={study.id} onChange={(e) => updateStudy(index, { id: e.target.value })} />
            </Field>
            <Field label="Title">
              <input value={study.title} onChange={(e) => updateStudy(index, { title: e.target.value })} />
            </Field>
            <Field label="Date">
              <input value={study.date} onChange={(e) => updateStudy(index, { date: e.target.value })} />
            </Field>
            <Field label="Excerpt">
              <textarea rows={3} value={study.excerpt || ''} onChange={(e) => updateStudy(index, { excerpt: e.target.value })} />
            </Field>
            <Field label="PDF">
              <input value={study.pdf} onChange={(e) => updateStudy(index, { pdf: e.target.value })} />
              <PdfUpload onUploaded={(url) => updateStudy(index, { pdf: url })} />
            </Field>
            <ImageField
              label="Cover image"
              value={study.image}
              folder="case-studies"
              onChange={(image) => updateStudy(index, { image })}
            />
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={!!study.featured}
                onChange={(e) => updateStudy(index, { featured: e.target.checked })}
              />
              Featured
            </label>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => updateSection('caseStudies', caseStudies.filter((_, i) => i !== index))}
            >
              Delete
            </button>
          </div>
        </details>
      ))}
    </>
  )
}

export function AboutEditor() {
  const { content, updateSection } = useContent()
  const about = content.about

  return (
    <>
      <SectionHeader title="About Page" />
      <div className="admin-form-grid">
        <Field label="Greeting">
          <input value={about.bio.greeting} onChange={(e) => updateSection('about', { ...about, bio: { ...about.bio, greeting: e.target.value } })} />
        </Field>
        <Field label="Title">
          <input value={about.bio.title} onChange={(e) => updateSection('about', { ...about, bio: { ...about.bio, title: e.target.value } })} />
        </Field>
        <Field label="Bio paragraphs">
          <textarea
            rows={6}
            value={about.bio.paragraphs.join('\n\n')}
            onChange={(e) =>
              updateSection('about', {
                ...about,
                bio: { ...about.bio, paragraphs: e.target.value.split('\n\n').filter(Boolean) },
              })
            }
          />
        </Field>
        <Field label="Profile role (bento card)">
          <input value={about.profileRole} onChange={(e) => updateSection('about', { ...about, profileRole: e.target.value })} />
        </Field>
        <ImageField
          label="Profile photo"
          value={about.profilePhoto}
          folder="about"
          onChange={(profilePhoto) => updateSection('about', { ...about, profilePhoto })}
        />
      </div>
      <h3 className="admin-subtitle">Stats</h3>
      {about.stats.map((stat, index) => (
        <div key={stat.id} className="admin-form-grid admin-form-grid--inline">
          <Field label="Label">
            <input
              value={stat.label}
              onChange={(e) => {
                const stats = [...about.stats]
                stats[index] = { ...stat, label: e.target.value }
                updateSection('about', { ...about, stats })
              }}
            />
          </Field>
          <Field label="Value">
            <input
              value={stat.value}
              onChange={(e) => {
                const stats = [...about.stats]
                stats[index] = { ...stat, value: e.target.value }
                updateSection('about', { ...about, stats })
              }}
            />
          </Field>
        </div>
      ))}
    </>
  )
}

export function FaqEditor() {
  const { content, updateSection } = useContent()
  const faq = content.faq

  const updateItem = (index, patch) => {
    const items = faq.items.map((item, i) => (i === index ? { ...item, ...patch } : item))
    updateSection('faq', { ...faq, items })
  }

  return (
    <>
      <SectionHeader title="FAQ" />
      <div className="admin-form-grid">
        <Field label="Badge">
          <input value={faq.badge} onChange={(e) => updateSection('faq', { ...faq, badge: e.target.value })} />
        </Field>
        <Field label="Heading">
          <input value={faq.heading} onChange={(e) => updateSection('faq', { ...faq, heading: e.target.value })} />
        </Field>
      </div>
      {faq.items.map((item, index) => (
        <details key={item.id} className="admin-accordion">
          <summary>{item.question}</summary>
          <div className="admin-form-grid">
            <Field label="Question">
              <input value={item.question} onChange={(e) => updateItem(index, { question: e.target.value })} />
            </Field>
            <Field label="Answer">
              <textarea rows={4} value={item.answer} onChange={(e) => updateItem(index, { answer: e.target.value })} />
            </Field>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() =>
                updateSection('faq', { ...faq, items: faq.items.filter((_, i) => i !== index) })
              }
            >
              Delete
            </button>
          </div>
        </details>
      ))}
      <button
        type="button"
        className="admin-btn admin-btn--primary"
        onClick={() =>
          updateSection('faq', {
            ...faq,
            items: [...faq.items, { id: `faq-${Date.now()}`, question: 'New question?', answer: 'Answer here.' }],
          })
        }
      >
        + Add FAQ
      </button>
    </>
  )
}

export function FooterEditor() {
  const { content, updateSection } = useContent()
  const footer = content.footer

  const set = (key, value) => updateSection('footer', { ...footer, [key]: value })

  return (
    <>
      <SectionHeader title="Footer & Contact" />
      <div className="admin-form-grid">
        <Field label="Tagline">
          <input value={footer.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </Field>
        <Field label="Email">
          <input type="email" value={footer.email} onChange={(e) => set('email', e.target.value)} />
        </Field>
        <Field label="Phone">
          <input value={footer.phone} onChange={(e) => set('phone', e.target.value)} />
        </Field>
        <Field label="Address line 1">
          <input value={footer.addressLine1} onChange={(e) => set('addressLine1', e.target.value)} />
        </Field>
        <Field label="Address line 2">
          <input value={footer.addressLine2} onChange={(e) => set('addressLine2', e.target.value)} />
        </Field>
        <Field label="Copyright">
          <input value={footer.copyright} onChange={(e) => set('copyright', e.target.value)} />
        </Field>
      </div>
    </>
  )
}

export function CtaEditor() {
  const { content, updateSection } = useContent()
  const cta = content.cta

  return (
    <>
      <SectionHeader title="CTA Banner" />
      <div className="admin-form-grid">
        <Field label="Eyebrow">
          <input value={cta.eyebrow} onChange={(e) => updateSection('cta', { ...cta, eyebrow: e.target.value })} />
        </Field>
        <Field label="Heading">
          <input value={cta.heading} onChange={(e) => updateSection('cta', { ...cta, heading: e.target.value })} />
        </Field>
        <Field label="Button">
          <input value={cta.button} onChange={(e) => updateSection('cta', { ...cta, button: e.target.value })} />
        </Field>
        <Field label="Booking status">
          <input value={cta.bookingStatus} onChange={(e) => updateSection('cta', { ...cta, bookingStatus: e.target.value })} />
        </Field>
        <Field label="Booking title">
          <input value={cta.bookingTitle} onChange={(e) => updateSection('cta', { ...cta, bookingTitle: e.target.value })} />
        </Field>
        <Field label="Booking text">
          <input value={cta.bookingText} onChange={(e) => updateSection('cta', { ...cta, bookingText: e.target.value })} />
        </Field>
        <Field label="Booking button">
          <input value={cta.bookingButton} onChange={(e) => updateSection('cta', { ...cta, bookingButton: e.target.value })} />
        </Field>
        <ImageField
          label="CTA profile photo"
          value={cta.profilePhoto}
          folder="cta"
          onChange={(profilePhoto) => updateSection('cta', { ...cta, profilePhoto })}
        />
      </div>
    </>
  )
}

const ORBIT_ICON_OPTIONS = [
  'figma', 'framer', 'notion', 'paintBoard', 'penTool', 'dashboard', 'idea', 'photoshop', 'aiWeb',
  'chatgpt', 'claude', 'css', 'tailwind', 'behance', 'dribbble', 'pinterest', 'smartphone', 'aiAudio',
]

export function OrbitEditor() {
  const { content, updateSection } = useContent()
  const orbit = content.orbit

  const toggleIcon = (side, icon) => {
    const key = side === 'left' ? 'leftIcons' : 'rightIcons'
    const list = orbit[key]
    const next = list.includes(icon) ? list.filter((i) => i !== icon) : [...list, icon]
    updateSection('orbit', { ...orbit, [key]: next })
  }

  return (
    <>
      <SectionHeader title="Orbit Icons" description="Choose which icons appear on left and right arcs." />
      <Field label="Orbit duration (ms)">
        <input
          type="number"
          value={orbit.durationMs}
          onChange={(e) => updateSection('orbit', { ...orbit, durationMs: Number(e.target.value) })}
        />
      </Field>
      <h3 className="admin-subtitle">Left arc</h3>
      <div className="admin-chip-grid">
        {ORBIT_ICON_OPTIONS.map((icon) => (
          <button
            key={`l-${icon}`}
            type="button"
            className={`admin-chip${orbit.leftIcons.includes(icon) ? ' admin-chip--active' : ''}`}
            onClick={() => toggleIcon('left', icon)}
          >
            {icon}
          </button>
        ))}
      </div>
      <h3 className="admin-subtitle">Right arc</h3>
      <div className="admin-chip-grid">
        {ORBIT_ICON_OPTIONS.map((icon) => (
          <button
            key={`r-${icon}`}
            type="button"
            className={`admin-chip${orbit.rightIcons.includes(icon) ? ' admin-chip--active' : ''}`}
            onClick={() => toggleIcon('right', icon)}
          >
            {icon}
          </button>
        ))}
      </div>
    </>
  )
}
