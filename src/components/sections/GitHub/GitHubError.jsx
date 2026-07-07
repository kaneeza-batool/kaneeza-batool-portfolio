import { motion } from 'framer-motion'
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'
import { fadeUp } from '@utils/motion'
import Button from '@components/common/Button'

function GitHubError({ message, onRetry }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 gap-6"
    >
      <div className="glass rounded-2xl p-10 max-w-md w-full flex flex-col items-center gap-5 text-center">
        <div className="w-16 h-16 rounded-2xl bg-error/10 border border-error/20 flex items-center justify-center">
          <FiAlertCircle className="w-7 h-7 text-error" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-heading font-semibold text-white text-lg">
            Couldn&apos;t reach GitHub
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {message || 'Something went wrong while fetching GitHub data.'}
          </p>
        </div>

        <Button
          variant="outline"
          icon={<FiRefreshCw className="w-4 h-4" />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      </div>
    </motion.div>
  )
}

export default GitHubError
