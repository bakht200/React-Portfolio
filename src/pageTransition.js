export const NAV_FORWARD = { direction: 'forward' }

export const NAV_BACK_TO_CASE_STUDIES = {
  direction: 'back',
  scrollTo: 'case-studies',
}

export const NAV_BACK_TO_PROJECTS = {
  direction: 'back',
  scrollTo: 'projects',
}

export function navToSection(sectionId) {
  return {
    direction: 'back',
    scrollTo: sectionId,
  }
}

export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (!section) return

  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  section.classList.add('section-nav-target')
  window.setTimeout(() => section.classList.remove('section-nav-target'), 1200)
}

function isDetailPath(path) {
  return path.startsWith('/case-studies/') || path.startsWith('/projects/')
}

export function getTransitionDirection(location, previousPath) {
  if (location.state?.direction === 'forward' || location.state?.direction === 'back') {
    return location.state.direction
  }

  const currentPath = location.pathname

  if (isDetailPath(previousPath) && currentPath === '/') {
    return 'back'
  }

  if (isDetailPath(currentPath) && previousPath !== currentPath) {
    return 'forward'
  }

  return 'forward'
}
