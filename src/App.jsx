import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from  './components/Skills'
import Projects from './components/Projects'
import Programs from './components/Programs'
import Journey from './components/Journey'
import Contact from './components/Contact'

function App() {
  return (
    <main className="bg-brand-bg min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Programs />
      <Journey />
      <Contact />
      <section id="contact" />
    </main>
  )
}

export default App
