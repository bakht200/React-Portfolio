import { getContentSnapshot } from './content/contentStore'
import { resolveContentAsset } from './content/resolveAsset'

export function getProjects() {
  return getContentSnapshot().projects.map((project) => ({
    ...project,
    image: resolveContentAsset(project.image),
  }))
}

/** @deprecated use getProjects() */
export const PROJECTS = getProjects()

export function getProjectById(id) {
  return getProjects().find((project) => project.id === id)
}

export function projectPath(id) {
  return `/projects/${id}`
}

export function projectsListPath() {
  return '/projects'
}
