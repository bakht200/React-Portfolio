import bentoOne from '../assets/bento-1.jpg'
import bentoThree from '../assets/bento-3.jpg'
import bentoTwo from '../assets/bento-2.jpg'
import profilePhoto from '../assets/recommend-optimized.png'
import projectOne from '../assets/project-1.jpg'
import projectTwo from '../assets/project-2.jpg'
import logoIcon from '../assets/HG icon.svg'
import { getPublicStorageUrl } from '../lib/supabase'

const ASSET_MAP = {
  'project-1.jpg': projectOne,
  'project-2.jpg': projectTwo,
  'bento-1.jpg': bentoOne,
  'bento-2.jpg': bentoTwo,
  'bento-3.jpg': bentoThree,
  'profile-photo.jpg': profilePhoto,
  'recommend-optimized.png': profilePhoto,
  'HG icon.svg': logoIcon,
}

/** Resolve bundled asset key or URL path to a usable src. */
export function resolveAsset(key) {
  if (!key) return projectOne
  if (key.startsWith('data:') || key.startsWith('http') || key.startsWith('blob:')) {
    return key
  }
  if (ASSET_MAP[key]) return ASSET_MAP[key]
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${key.replace(/^\//, '')}`
}

/** Resolve content image/pdf from bundled key, Supabase URL, or storage path. */
export function resolveContentAsset(key) {
  if (!key) return resolveAsset(key)
  if (
    key.startsWith('http') ||
    key.startsWith('data:') ||
    key.startsWith('blob:') ||
    key.includes('/storage/v1/object/public/')
  ) {
    return key
  }
  if (key.startsWith('uploads/')) {
    return getPublicStorageUrl('portfolio-images', key)
  }
  if (key.startsWith('case-studies/') && key.endsWith('.pdf')) {
    return getPublicStorageUrl('portfolio-pdfs', key)
  }
  return resolveAsset(key)
}

export { ASSET_MAP }
