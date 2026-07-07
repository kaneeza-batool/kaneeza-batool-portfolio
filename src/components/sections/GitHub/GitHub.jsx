import { SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'

function GitHub() {
  return (
    <SectionWrapper id="github">
      <SectionHeading
        subtitle="Open Source"
        title="GitHub Activity"
        description="My contribution graph, pinned repositories, and open-source work."
      />
      {/* GitHub content — added in a future prompt */}
    </SectionWrapper>
  )
}

export default GitHub
