import cn from 'classnames'

export { Desktop, type DesktopProps }

interface DesktopProps extends React.HTMLProps<HTMLDivElement> {
  tabletMode?: boolean
  reverseTabletMode?: boolean
}

/**
 * Wrapper to only show children component to desktop screens. tabletMode to adjust hide limit from mobile to tablet.
 */
function Desktop({
  className,
  children,
  tabletMode,
  reverseTabletMode,
  ...props
}: DesktopProps) {
  return (
    <div
      {...props}
      className={cn(
        'hidden',
        tabletMode ? 'lg:block' : reverseTabletMode ? 'sm:block' : 'md:block',
        className
      )}
    >
      {children}
    </div>
  )
}
