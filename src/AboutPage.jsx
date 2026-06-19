import AboutSection from './AboutSection'
import SiteChrome from './SiteChrome'
import './App.css'

export default function AboutPage() {
  return (
    <>
      <SiteChrome />
      <AboutSection showBack />
      <SiteChrome.Footer />
    </>
  )
}
