import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useAdminPageTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!pathname.includes('/admin')) return undefined

    const previous = document.title
    document.title = 'Admin'

    return () => {
      document.title = previous
    }
  }, [pathname])
}
