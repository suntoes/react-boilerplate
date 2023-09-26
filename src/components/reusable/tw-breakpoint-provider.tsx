import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export {
  TwBreakpointProvider,
  useTwBreakpointContext,
  TwBreakpointContext,
  type TwBreakpointProviderProps
}

interface ITwBreakpointContext {
  breakpoint: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  isMobile: boolean
  isDesktop: boolean
}

const TwBreakpointContext = createContext<ITwBreakpointContext | undefined>(
  undefined
)

interface TwBreakpointProviderProps {
  children: React.ReactNode
}

function TwBreakpointProvider({ children }: TwBreakpointProviderProps) {
  const [breakpoint, setBreakpoint] =
    useState<ITwBreakpointContext['breakpoint']>('base')
  const isMobile: boolean = useMemo(
    () => ['base', 'sm'].includes(breakpoint),
    [breakpoint]
  )
  const isDesktop: boolean = useMemo(() => !isMobile, [isMobile])

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window

      switch (true) {
        case innerWidth < 640:
          setBreakpoint('base')
          break
        case innerWidth < 768:
          setBreakpoint('sm')
          break
        case innerWidth < 1024:
          setBreakpoint('md')
          break
        case innerWidth < 1280:
          setBreakpoint('lg')
          break
        case innerWidth < 1536:
          setBreakpoint('xl')
          break
        default:
          setBreakpoint('2xl')
          break
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const value: ITwBreakpointContext = {
    breakpoint,
    isMobile,
    isDesktop
  }

  return (
    <TwBreakpointContext.Provider value={value}>
      {children}
    </TwBreakpointContext.Provider>
  )
}

function useTwBreakpointContext(): ITwBreakpointContext {
  const context = useContext<ITwBreakpointContext | undefined>(
    TwBreakpointContext
  )
  if (!context) {
    throw new Error(
      'useTwBreakpointContext cannot be used outside of a TwBreakpointProvider'
    )
  }
  return context
}
