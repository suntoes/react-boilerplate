import { Link, LinkProps } from 'react-router-dom'
import cn from 'classnames'
import 'lib/styles/nav/logo.css'

export { NavLogo, type NavLogoProps }

interface NavLogoProps extends Omit<LinkProps, 'to'> {}

function NavLogo({ className, ...props }: NavLogoProps) {
  return (
    <Link
      to="/"
      {...props}
      className={cn(className, 'logo flex gap-4 items-center outline-none')}
    >
      <img
        className="h-9 w-9 inline-block"
        src="/images/mini-logo.png"
        alt="logo"
      />
      <span className="font-medium">Dimension</span>
    </Link>
  )
}
