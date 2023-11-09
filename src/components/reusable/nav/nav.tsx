import cn from 'classnames'
import 'lib/styles/nav/nav.css'

export { Nav, type NavProps }

interface NavProps extends React.HTMLProps<HTMLElement> {}

function Nav({ children, className, ...props }: NavProps) {
  return (
    <nav
      className={cn(
        className,
        'w-screen backdrop-blur-lg bg-[rgba(255,255,255,.01)]'
      )}
    >
      <div className="flex items-center justify-between p-6 nav-inner">
        {children}
      </div>
    </nav>
  )
}
