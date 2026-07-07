import { SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'

function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        subtitle="Background"
        title="About Me"
        description="A passionate frontend developer with a love for crafting elegant digital experiences."
      />
      {/* About content — added in a future prompt */}
    </SectionWrapper>
  )
}

export default About
