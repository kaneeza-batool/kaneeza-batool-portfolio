import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Programs from './components/Programs'
import Certifications from './components/Certifications'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Navbar />
      <main className="bg-brand-bg min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Programs />
        <Certifications />
        <Journey />
        <Contact />
        <Footer />
      </main>

      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all"
            style={{
              background: 'rgba(26,21,96,0.8)',
              border: '1px solid rgba(124,58,237,0.35)',
              color: '#A78BFA',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(124,58,237,0.2)',
            }}
            whileHover={{ boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
