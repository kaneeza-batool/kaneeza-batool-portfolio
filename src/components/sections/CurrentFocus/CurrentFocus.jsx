import { SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'

function CurrentFocus() {
  return (
    <SectionWrapper id="current-focus">
      <SectionHeading
        subtitle="Right Now"
        title="Current Focus"
        description="What I am actively building, learning, and exploring at the moment."
      />
      {/* Current Focus content — added in a future prompt */}
    </SectionWrapper>
  )
}

export default CurrentFocus
