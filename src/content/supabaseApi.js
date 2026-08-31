import { defaultContent } from './defaultContent'
import { setContentSnapshot } from './contentStore'
import { ADMIN_EMAIL, getPublicStorageUrl, isSupabaseConfigured, supabase } from '../lib/supabase'

const ROW_ID = 'published'

function mergeWithDefaults(remote) {
  if (!remote || typeof remote !== 'object') return structuredClone(defaultContent)
  return { ...structuredClone(defaultContent), ...remote }
}

/** Fetch published portfolio content (public). */
export async function fetchPublishedContent() {
  if (!isSupabaseConfigured || !supabase) {
    return structuredClone(defaultContent)
  }

  const { data, error } = await supabase
    .from('portfolio_content')
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error) {
    console.warn('Failed to load portfolio from Supabase:', error.message)
    return structuredClone(defaultContent)
  }

  if (!data?.content) return structuredClone(defaultContent)

  const merged = mergeWithDefaults(data.content)
  setContentSnapshot(merged)
  return merged
}

/** Publish content (admin only — requires authenticated session). */
export async function publishContent(content) {
  if (!isSupabaseConfigured || !supabase) {
    setContentSnapshot(content)
    return { ok: true, local: true }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('You must be signed in to publish.')
  }

  if (session.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    throw new Error('Only the portfolio admin can publish changes.')
  }

  const payload = {
    id: ROW_ID,
    content,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('portfolio_content').upsert(payload)

  if (error) throw error

  setContentSnapshot(content)
  return { ok: true }
}

/** Upload image to Supabase Storage; returns public URL path key. */
export async function uploadPortfolioImage(file, folder = 'uploads') {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.')
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage.from('portfolio-images').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })

  if (error) throw error

  return getPublicStorageUrl('portfolio-images', path)
}

/** Upload PDF to Supabase Storage; returns storage path for case studies. */
export async function uploadPortfolioPdf(file, folder = 'case-studies') {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.')
  }

  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`

  const { error } = await supabase.storage.from('portfolio-pdfs').upload(path, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: 'application/pdf',
  })

  if (error) throw error

  return getPublicStorageUrl('portfolio-pdfs', path)
}

const IMAGE_GALLERY_FOLDERS = [
  'about',
  'site',
  'projects',
  'case-studies',
  'trusted',
  'expertise',
  'how-i-work',
  'cta',
  'uploads',
]

/** List uploaded images from Supabase Storage (admin gallery). */
export async function listPortfolioImages() {
  if (!isSupabaseConfigured || !supabase) return []

  const images = []

  async function listFolder(prefix) {
    const { data, error } = await supabase.storage.from('portfolio-images').list(prefix, {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    })
    if (error || !data) return

    for (const item of data) {
      if (!item.id) continue
      const path = prefix ? `${prefix}/${item.name}` : item.name
      images.push({
        path,
        url: getPublicStorageUrl('portfolio-images', path),
        name: item.name,
      })
    }
  }

  await Promise.all(IMAGE_GALLERY_FOLDERS.map((folder) => listFolder(folder)))

  const nested = await supabase.storage.from('portfolio-images').list('expertise/tools', {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  })
  if (nested.data) {
    for (const item of nested.data) {
      if (!item.id) continue
      const path = `expertise/tools/${item.name}`
      images.push({
        path,
        url: getPublicStorageUrl('portfolio-images', path),
        name: item.name,
      })
    }
  }

  return images
}
