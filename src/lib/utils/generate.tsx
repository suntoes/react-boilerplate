import { BreakpointType } from 'lib/types'
import { breakpoints } from 'lib/vars'

export const getBreakpoint = (): BreakpointType => {
  const { innerWidth } = window
  const breakpointKeys: BreakpointType[] = Array.from(
    Object.keys(breakpoints) as BreakpointType[]
  )
  for (let i = 0; i < breakpointKeys.length; i++) {
    if (innerWidth >= breakpoints[breakpointKeys[i]]) return breakpointKeys[i]
  }
  return 'base'
}

export const getBreaks = (breakpoint?: BreakpointType): BreakpointType[] => {
  const { innerWidth } = window
  let width = innerWidth
  if (breakpoint) width = breakpoints[breakpoint] || innerWidth

  const breakpointKeys: BreakpointType[] = Array.from(
    Object.keys(breakpoints) as BreakpointType[]
  )
  const breaks: BreakpointType[] = []
  for (let i = 0; i < breakpointKeys.length; i++) {
    if (width >= breakpoints[breakpointKeys[i]]) breaks.push(breakpointKeys[i])
  }
  return breaks
}
