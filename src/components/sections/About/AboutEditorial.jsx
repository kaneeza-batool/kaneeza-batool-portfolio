import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, fadeLeft, viewportConfig } from '@utils/motion'

const PARAGRAPHS = [
  "I'm a BS Computer Science student at Sukkur IBA University, building my way into software engineering one real project at a time. My journey started with the basics — HTML, CSS, and JavaScript — and gradually grew into React, the MERN stack, and genuine curiosity about what AI can do in production software.",
  "What drives me isn't a credential checklist. It's the moment a project I built actually works — and works well. That feedback loop of building, breaking, and rebuilding is where most of my learning happens, and I've come to trust it more than any course outline.",
  "I'm open to internships, collaborations, and any opportunity where I can contribute meaningfully while continuing to grow. My goal is straightforward: become a developer worth hiring by building things worth using.",
]

function AboutEditorial() {
  return (
    <motion.div
      variants={staggerContainer(0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="flex flex-col gap-5"
    >
      <motion.div variants={fadeLeft} className="flex items-center gap-3">
        <span
          className="h-px w-8 shrink-0"
          style={{ background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)' }}
          aria-hidden="true"
        />
        <span className="font-mono text-xs text-accent-blue tracking-widest uppercase font-medium">
          My Story
        </span>
      </motion.div>

      {PARAGRAPHS.map((text, i) => (
        <motion.p
          key={i}
          variants={fadeUp}
          className="text-body text-text-secondary leading-relaxed"
        >
          {text}
        </motion.p>
      ))}
    </motion.div>
  )
}

export default AboutEditorial
