import { SEO, MouseGlow } from '@components/common'
import { useLenis } from '@hooks/useLenis'
import { SITE } from '@constants'

function App() {
  useLenis()

  return (
    <>
      <SEO />
      <MouseGlow />

      <div className="animated-mesh" aria-hidden="true" />

      <main id="main-content">
        {/* Sections will be added in future prompts */}
      </main>
    </>
  )
}

export default App
