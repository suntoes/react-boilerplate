export { Layout, type LayoutProps }

interface LayoutProps extends React.HTMLProps<HTMLElement> {}

function Layout({ children, ...props }: LayoutProps) {
  return (
    <div className="relative min-h-[200vh] w-screen bg-[#05051e]">
      {children}
      <img
        className="top-0 left-1/2 -translate-x-1/2 absolute w-[1920px] h-[800px] z-[10] pointer-events-none object-cover"
        src="/images/spotlight.png"
        alt=""
      />
    </div>
  )
}
