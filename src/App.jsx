import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from  './components/Skills'
import Projects from './components/Projects'

function App() {
  return (
    <main className="bg-brand-bg min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <section id="programs" />
      <section id="journey" />
      <section id="contact" />
    </main>
  )
}

export default App
