import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { getUsername } from '@services/github'
import Button from '@components/common/Button'

function GitHubCTA() {
  const username = getUsername()
  const profileUrl = `https://github.com/${username}`

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="glass-heavy rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-accent-blue/10 mt-2"
    >
      {/* Icon accent */}
      <motion.div
        variants={fadeUp}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-accent-blue/25 flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <FiGithub className="w-7 h-7 text-accent-blue" />
      </motion.div>

      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <motion.h3
          variants={fadeUp}
          className="font-heading font-semibold text-white text-xl mb-2"
        >
          Open Source Journey
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="text-text-secondary text-sm leading-relaxed max-w-xl"
        >
          GitHub is where I document my growth as a developer — from early experiments to polished
          projects. Every repository tells a story of a problem solved, a concept understood, or a
          skill sharpened. I believe in learning in public: sharing work openly so others can
          follow the same path or build on what I&apos;ve started.
        </motion.p>
      </div>

      {/* Button */}
      <motion.div variants={fadeUp} className="shrink-0">
        <Button
          as="a"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          icon={<FiGithub className="w-4 h-4" />}
          aria-label="Visit GitHub profile"
        >
          Visit GitHub
          <FiExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" aria-hidden="true" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default GitHubCTA
