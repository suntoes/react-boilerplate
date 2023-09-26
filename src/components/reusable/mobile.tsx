import cn from 'classnames'

export { Mobile, type MobileProps }

interface MobileProps extends React.HTMLProps<HTMLDivElement> {
  tabletMode?: boolean
  reverseTabletMode?: boolean
}

/**
 * Wrapper to only show children component to mobile screens. tabletMode to adjust show limit from mobile to tablet.
 */
function Mobile({
  className,
  children,
  tabletMode,
  reverseTabletMode,
  ...props
}: MobileProps) {
  return (
    <div
      {...props}
      className={cn(
        'block',
        tabletMode
          ? 'lg:hidden'
          : reverseTabletMode
          ? 'sm:hidden'
          : 'md:hidden',
        className
      )}
    >
      {children}
    </div>
  )
}
