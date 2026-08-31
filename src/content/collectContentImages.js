/** Collect image references already used in portfolio content (for gallery picker). */
export function collectContentImages(content) {
  if (!content) return []

  const found = new Set()

  const add = (value) => {
    if (!value || typeof value !== 'string') return
    if (value.endsWith('.pdf')) return
    found.add(value)
  }

  add(content.site?.logoAsset)
  add(content.about?.profilePhoto)
  add(content.cta?.profilePhoto)

  content.projects?.forEach((p) => add(p.image))
  content.caseStudies?.forEach((s) => add(s.image))
  content.trusted?.logos?.forEach((l) => add(l.image))
  content.expertise?.items?.forEach((i) => add(i.image))
  content.expertise?.tools?.forEach((t) => add(t.image))
  content.howIWork?.steps?.forEach((s) => add(s.image))

  return [...found]
}
