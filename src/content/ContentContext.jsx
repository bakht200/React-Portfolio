import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defaultContent, FONT_OPTIONS } from './defaultContent'
import {
  exportContentJson,
  getContentSnapshot,
  importContentJson,
  resetContentSnapshot,
  setContentSnapshot,
} from './contentStore'
import { fetchPublishedContent, publishContent } from './supabaseApi'
import { isSupabaseConfigured } from '../lib/supabase'

const ContentContext = createContext(null)

const FONT_STACKS = {
  Geist: "'Geist', system-ui, sans-serif",
  Inter: "'Inter', system-ui, sans-serif",
  'system-ui': 'system-ui, sans-serif',
}

function applyTheme(theme) {
  const root = document.documentElement
  root.style.setProperty('--brand-primary', theme.primary)
  root.style.setProperty('--brand-primary-hover', theme.primaryHover)
  root.style.setProperty('--brand-neutral', theme.background)
  root.style.setProperty('--brand-text-heading', theme.textHeading)
  root.style.setProperty('--brand-text', theme.textBody)
  root.style.setProperty('--brand-text-muted', theme.textMuted)
  root.style.setProperty('--brand-tertiary', theme.textHeading)
  root.style.setProperty('--orange-500', theme.primary)
  root.style.setProperty('--sans', FONT_STACKS[theme.fontFamily] || FONT_STACKS.Geist)
  root.style.setProperty('--heading', FONT_STACKS[theme.fontFamily] || FONT_STACKS.Geist)
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => getContentSnapshot())
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [publishState, setPublishState] = useState('idle')
  const [publishError, setPublishError] = useState('')
  const contentRef = useRef(content)
  const publishTimer = useRef(null)

  contentRef.current = content

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }
      try {
        const remote = await fetchPublishedContent()
        if (!cancelled) {
          setContent(remote)
          setContentSnapshot(remote)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    applyTheme(content.theme)
    const onAdmin = window.location.pathname.includes('/admin')
    if (!onAdmin) {
      document.title = content.site?.title || defaultContent.site.title
    }
  }, [content.theme, content.site?.title])

  const doPublish = useCallback(async (next) => {
    if (!isSupabaseConfigured) {
      setContentSnapshot(next)
      setPublishState('saved')
      return
    }
    setPublishState('publishing')
    setPublishError('')
    try {
      await publishContent(next)
      setPublishState('saved')
    } catch (err) {
      setPublishState('error')
      setPublishError(err.message || 'Failed to publish')
    }
  }, [])

  const schedulePublish = useCallback(
    (next) => {
      if (publishTimer.current) clearTimeout(publishTimer.current)
      publishTimer.current = setTimeout(() => {
        doPublish(next)
      }, 1200)
    },
    [doPublish],
  )

  const updateContent = useCallback(
    (patch, { publish = false } = {}) => {
      setContent((prev) => {
        const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch }
        setContentSnapshot(next)
        if (publish) {
          doPublish(next)
        } else if (isSupabaseConfigured) {
          setPublishState('pending')
          schedulePublish(next)
        }
        return next
      })
    },
    [doPublish, schedulePublish],
  )

  const updateSection = useCallback(
    (section, value, options) => {
      updateContent((prev) => ({ ...prev, [section]: value }), options)
    },
    [updateContent],
  )

  const publishNow = useCallback(async () => {
    await doPublish(contentRef.current)
  }, [doPublish])

  const resetContent = useCallback(async () => {
    const next = structuredClone(defaultContent)
    resetContentSnapshot()
    setContent(next)
    await doPublish(next)
    return next
  }, [doPublish])

  const exportJson = useCallback(() => exportContentJson(), [content])

  const importJson = useCallback(
    async (json) => {
      const next = importContentJson(json)
      setContent(next)
      await doPublish(next)
      return next
    },
    [doPublish],
  )

  const value = useMemo(
    () => ({
      content,
      loading,
      publishState,
      publishError,
      updateContent,
      updateSection,
      publishNow,
      resetContent,
      exportJson,
      importJson,
      fontOptions: FONT_OPTIONS,
      isSupabaseConfigured,
    }),
    [
      content,
      loading,
      publishState,
      publishError,
      updateContent,
      updateSection,
      publishNow,
      resetContent,
      exportJson,
      importJson,
    ],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
