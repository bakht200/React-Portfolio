import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 280

export default function ScrollFab() {
  const [scrollUp, setScrollUp] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      const { scrollY } = window
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight

      setVisible(maxScroll > SCROLL_THRESHOLD)
      setScrollUp(scrollY > SCROLL_THRESHOLD)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  if (!visible) return null

  const handleClick = () => {
    if (scrollUp) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      className={`scroll-fab${scrollUp ? ' scroll-fab--up' : ' scroll-fab--down'}`}
      onClick={handleClick}
      aria-label={scrollUp ? 'Scroll to top' : 'Scroll to bottom'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5v14M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
