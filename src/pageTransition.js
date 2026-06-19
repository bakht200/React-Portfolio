export const NAV_FORWARD = { direction: 'forward' }

export const NAV_BACK_HOME = {
  direction: 'back',
}

export const NAV_BACK_TO_CASE_STUDIES = {
  direction: 'back',
  scrollTo: 'case-studies',
}

export const NAV_BACK_TO_CASE_STUDIES_LIST = {
  direction: 'back',
}

export const NAV_BACK_TO_PROJECTS = {
  direction: 'back',
  scrollTo: 'projects',
}

export const NAV_BACK_TO_PROJECTS_LIST = {
  direction: 'back',
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
  return (
    path.startsWith('/case-studies/') || path.startsWith('/projects/')
  )
}

function isListPath(path) {
  return path === '/projects' || path === '/case-studies' || path === '/about'
}

export function getTransitionDirection(location, previousPath) {
  if (location.state?.direction === 'forward' || location.state?.direction === 'back') {
    return location.state.direction
  }

  const currentPath = location.pathname

  if (isDetailPath(previousPath) && currentPath === '/') {
    return 'back'
  }

  if (isListPath(previousPath) && currentPath === '/') {
    return 'back'
  }

  if (isListPath(previousPath) && isDetailPath(currentPath)) {
    return 'forward'
  }

  if (isDetailPath(previousPath) && isListPath(currentPath)) {
    return 'back'
  }

  if (isDetailPath(currentPath) && previousPath !== currentPath) {
    return 'forward'
  }

  return 'forward'
}
