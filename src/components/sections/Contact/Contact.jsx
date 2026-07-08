import { motion } from 'framer-motion'
import { SectionHeading, GradientBlob } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'
import ContactAccepting from './ContactAccepting'

function Contact() {
  return (
    <SectionWrapper id="contact" className="overflow-hidden">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <GradientBlob
          color="blue"
          size="lg"
          className="-top-40 -left-40 opacity-25"
          animate={false}
        />
        <GradientBlob
          color="purple"
          size="md"
          className="-bottom-24 -right-24 opacity-20"
          animate={false}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,14,32,0.6) 100%)',
          }}
        />
      </div>

      {/* Section header */}
      <SectionHeading
        subtitle="Open to Opportunities"
        title="Let's Build Something Together"
        description="I enjoy building meaningful software, collaborating on ambitious ideas, contributing to communities, and continuously learning. Whether you have an internship, freelance project, open-source collaboration, hackathon invitation, or just want to connect — I'd love to hear from you."
        align="center"
      />

      {/* Two-column layout */}
      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid lg:grid-cols-[2fr_3fr] gap-10 xl:gap-16 mt-20 lg:mt-24 items-start"
      >
        <ContactInfo />
        <ContactForm />
      </motion.div>

      {/* Currently accepting pills */}
      <ContactAccepting />

    </SectionWrapper>
  )
}

export default Contact
