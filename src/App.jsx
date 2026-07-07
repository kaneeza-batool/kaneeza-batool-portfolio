import AppLayout from '@components/layout/AppLayout'
import {
  Home,
  About,
  Skills,
  Experience,
  Projects,
  Achievements,
  Certifications,
  GitHub,
  Roadmap,
  CurrentFocus,
  Contact,
} from '@components/sections'

function App() {
  return (
    <AppLayout>
      <Home />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Certifications />
      <GitHub />
      <Roadmap />
      <CurrentFocus />
      <Contact />
    </AppLayout>
  )
}

export default App
