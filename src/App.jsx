import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <main className="bg-brand-bg min-h-screen">
      <Navbar />
      <Hero />
      <section id="about" />
      <section id="skills" />
      <section id="projects" />
      <section id="programs" />
      <section id="journey" />
      <section id="contact" />
    </main>
  )
}

export default App
