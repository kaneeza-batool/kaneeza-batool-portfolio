import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks'
import ProjectCard from './ProjectCard'

function ProjectsGrid({ projects, onViewDetails }) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            layout
            initial={reduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.93, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.93, y: 16 }
            }
            transition={{
              duration: 0.28,
              delay: reduced ? 0 : i * 0.045,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <ProjectCard project={project} onViewDetails={onViewDetails} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectsGrid
