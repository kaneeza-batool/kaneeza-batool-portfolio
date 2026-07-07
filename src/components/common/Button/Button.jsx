import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

const variants = {
  primary:
    'bg-gradient-to-r from-accent-blue to-accent-purple text-white border border-transparent shadow-button hover:shadow-glow-blue',
  secondary:
    'bg-surface text-white border border-[rgba(255,255,255,0.1)] hover:border-accent-blue/40 hover:bg-card',
  outline:
    'bg-transparent text-accent-blue border border-accent-blue/50 hover:bg-accent-blue/10 hover:border-accent-blue',
  ghost:
    'bg-transparent text-text-secondary border border-transparent hover:bg-surface/50 hover:text-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      as: Tag = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.div
        whileHover={isDisabled ? {} : { scale: 1.03 }}
        whileTap={isDisabled ? {} : { scale: 0.97 }}
        transition={{ duration: 0.18, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="inline-flex"
      >
        <Tag
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          className={cn(
            'inline-flex items-center justify-center font-body font-medium rounded-xl',
            'focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2',
            'transition-all duration-300',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'btn-glow relative overflow-hidden',
            variants[variant],
            sizes[size],
            className
          )}
          {...props}
        >
          {loading ? (
            <svg
              className="animate-spin w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            icon && iconPosition === 'left' && (
              <span aria-hidden="true" className="shrink-0">{icon}</span>
            )
          )}

          <span>{children}</span>

          {!loading && icon && iconPosition === 'right' && (
            <span aria-hidden="true" className="shrink-0">{icon}</span>
          )}
        </Tag>
      </motion.div>
    )
  }
)

Button.displayName = 'Button'

export default Button
