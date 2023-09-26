import cn from 'classnames'

export { AspectRatio, type AspectRatioProps }

interface AspectRatioPropsA extends React.HTMLProps<HTMLDivElement> {
  ratio: number
  children: React.ReactNode
  ratioClass?: string
}

interface AspectRatioPropsB extends React.HTMLProps<HTMLDivElement> {
  ratio?: number
  children: React.ReactNode
  ratioClass: string
}

type AspectRatioProps = AspectRatioPropsA | AspectRatioPropsB

/**
 * Wrapper to achieve fixed and locked width-based ratio for children
 */
function AspectRatio({
  ratio,
  children,
  className,
  ratioClass,
  ...props
}: AspectRatioProps) {
  const paddingBottom = `calc(100% / ${ratio})`

  const filteredClassName = className
    ?.split(' ')
    .filter(x => !x.includes('h-'))
    .join(' ')
  const filteredRatioClass = ratioClass
    ?.split(' ')
    .filter(x => x.includes('pb-'))
    .join(' ')

  return (
    <div className={filteredClassName} {...props}>
      <div
        className={cn('relative', ratio ? '' : filteredRatioClass)}
        style={ratio ? { paddingBottom } : {}}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  )
}
