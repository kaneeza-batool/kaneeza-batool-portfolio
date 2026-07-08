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
      className={cn('relative py-28 lg:py-36 xl:py-44', className)}
      {...props}
    >
      {noContainer ? children : (
        <Container size={containerSize}>{children}</Container>
      )}
    </Tag>
  )
}

export default SectionWrapper
