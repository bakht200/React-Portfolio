import AboutSection from './AboutSection'
import SiteChrome from './SiteChrome'
import './App.css'

export default function AboutPage() {
  return (
    <>
      <SiteChrome />
      <main className="about-page">
        <AboutSection showBack />
        <SiteChrome.Footer />
      </main>
    </>
  )
}
