import { getContentSnapshot } from './content/contentStore'
import { resolveContentAsset } from './content/resolveAsset'

export function getAboutContent() {
  const about = getContentSnapshot().about
  return {
    ...about,
    profilePhoto: resolveContentAsset(about.profilePhoto),
  }
}

/** @deprecated use getAboutContent() */
export const ABOUT_STATS = getAboutContent().stats
export const ABOUT_BIO = getAboutContent().bio
export const WORK_EXPERIENCE = getAboutContent().workExperience
export const STACK_TOOLS = getAboutContent().stackTools
export const EDUCATION = getAboutContent().education

export function aboutPath() {
  return '/about'
}
