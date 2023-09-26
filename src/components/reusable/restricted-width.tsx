import cn from 'classnames'

export { RestrictedWidth, type RestrictedWidthProps }

interface RestrictedWidthProps extends React.HTMLProps<HTMLDivElement> {
  noPadding?: boolean
}

/**
 * Wrapper to restrict width for children at 1550px rem-based
 * outer max width = 1614px = 100.875rem
 * total padding x = 64px = 2rem * 2 = "px-8"
 * inner max width = 1550px = 96.875rem = (1614px - 64px)
 */
function RestrictedWidth({
  children,
  className,
  noPadding,
  ...props
}: RestrictedWidthProps) {
  return (
    <div
      {...props}
      className={cn(
        'mx-auto w-full',
        noPadding ? 'max-w-[96.875rem] px-0' : 'max-w-[100.875rem] px-8',
        className
      )}
    >
      {children}
    </div>
  )
}
