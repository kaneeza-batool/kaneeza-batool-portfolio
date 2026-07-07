import { useState, useEffect } from 'react'
import { SEO, MouseGlow } from '@components/common'
import { useLenis } from '@hooks/useLenis'
import { scrollTo } from '@utils/lenis'
import Navbar from '../Navbar'
import ScrollProgress from '../ScrollProgress'
import BackToTop from '../BackToTop'
import LoadingScreen from '../LoadingScreen'

function AppLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  useLenis()

  // Handle deep-link hash navigation after loading completes
  useEffect(() => {
    if (isLoading) return
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => scrollTo(hash, { offset: -72 }), 120)
    }
  }, [isLoading])

  return (
    <>
      <SEO />

      {/* Loading screen — unmounts after animation completes */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Fixed animated background */}
      <div className="animated-mesh" aria-hidden="true" />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Mouse glow effect */}
      <MouseGlow />

      {/* Page content */}
      <main id="main-content" role="main">
        {children}
      </main>

      {/* Back to top button */}
      <BackToTop />
    </>
  )
}

export default AppLayout
