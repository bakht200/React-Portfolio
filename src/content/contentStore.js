import { defaultContent, STORAGE_KEY } from './defaultContent'

function cloneDefault() {
  return structuredClone(defaultContent)
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return { ...cloneDefault(), ...parsed }
  } catch {
    return null
  }
}

let snapshot = loadFromStorage() || cloneDefault()

export function getContentSnapshot() {
  return snapshot
}

export function setContentSnapshot(next) {
  snapshot = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function resetContentSnapshot() {
  snapshot = cloneDefault()
  localStorage.removeItem(STORAGE_KEY)
}

export function exportContentJson() {
  return JSON.stringify(snapshot, null, 2)
}

export function importContentJson(json) {
  const parsed = JSON.parse(json)
  const merged = { ...cloneDefault(), ...parsed }
  setContentSnapshot(merged)
  return merged
}
