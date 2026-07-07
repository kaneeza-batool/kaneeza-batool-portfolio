import { cn } from '@utils/helpers'
import { Container } from '@components/common'

function SectionWrapper({
  id,
  children,
  className,
  containerSize = 'default',
  noContainer = false,
  tag: Tag = 'section',
  ...props
}) {
  return (
    <Tag
      id={id}
      className={cn('relative py-24 lg:py-32', className)}
      {...props}
    >
      {noContainer ? children : (
        <Container size={containerSize}>{children}</Container>
      )}
    </Tag>
  )
}

export default SectionWrapper
