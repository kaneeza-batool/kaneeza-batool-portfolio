import { cn } from '@utils/helpers'

const variants = {
  primary:
    'bg-accent-blue/15 text-accent-blue border border-accent-blue/30',
  secondary:
    'bg-accent-purple/15 text-accent-purple border border-accent-purple/30',
  outline:
    'bg-transparent text-text-secondary border border-[rgba(255,255,255,0.15)]',
  success:
    'bg-success/15 text-success border border-success/30',
  warning:
    'bg-warning/15 text-warning border border-warning/30',
  error:
    'bg-error/15 text-error border border-error/30',
}

function Badge({ children, variant = 'primary', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5',
        'text-xs font-body font-medium rounded-pill',
        'transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
