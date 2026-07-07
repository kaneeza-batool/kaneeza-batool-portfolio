import { cn } from '@utils/helpers'

function Container({ children, className, size = 'default', ...props }) {
  const sizes = {
    sm:      'max-w-3xl',
    default: 'max-w-6xl',
    lg:      'max-w-7xl',
    full:    'max-w-full',
  }

  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
