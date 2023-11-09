import { useEffect, useMemo, useState } from 'react'

import { getBreakpoint, getBreaks } from 'lib/utils'
import { BreakpointType } from 'lib/types'

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>(getBreakpoint())
  const [breaks, setBreaks] = useState(getBreaks())
  const isMobile: boolean = useMemo(
    () => ['base', 'xs', 'sm'].includes(breakpoint),
    [breakpoint]
  )
  const isTablet: boolean = useMemo(
    () => ['base', 'xs', 'sm', 'md'].includes(breakpoint),
    [breakpoint]
  )
  const isDesktop: boolean = useMemo(() => !isMobile, [isMobile])

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint())
      setBreaks(getBreaks())
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    breakpoint,
    breaks,
    isMobile,
    isTablet,
    isDesktop
  }
}
