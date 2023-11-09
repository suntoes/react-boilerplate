import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent
} from 'framer-motion'
import { useState } from 'react'

import { Nav as ReusableNav, NavLogo, NavItems } from 'components/reusable/nav'
import { useBreakpoint } from 'lib/hooks'
import 'lib/styles/nav/button.css'

const navItems = [
  { title: 'About', href: '/' },
  { title: 'Careers', href: '/', tag: '3' },
  { title: 'Blog', href: '/' },
  { title: 'Changelog', href: '/' }
]

const navAddItems = [{ title: 'Join waitlist', href: '/' }]

export { Nav, type NavProps }

interface NavProps {}

function Nav({ ...props }: NavProps) {
  const [onTop, setOnTop] = useState(true)
  const { isMobile } = useBreakpoint()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', progress => {
    if (progress > 1) setOnTop(false)
    else setOnTop(true)
  })

  return (
    <div className="fixed">
      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isMobile && (
            <motion.div
              key={isMobile ? 'active' : ''}
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="absolute z-[2]"
            >
              <NavItems
                extend={!onTop}
                items={navItems}
                addItems={navAddItems}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: onTop ? 1 : 0,
            pointerEvents: onTop ? 'auto' : 'none'
          }}
          exit={{ opacity: 0 }}
        >
          <ReusableNav>
            <motion.div animate={{ x: onTop ? 0 : -25 }}>
              <NavLogo />
            </motion.div>
            <motion.div animate={{ x: onTop ? 0 : 25 }}>
              <button className="nav-action text-sm font-medium outline-none">
                <span className="nav-action-text">Join waitlist</span>
              </button>
            </motion.div>
          </ReusableNav>
        </motion.div>
      </div>
    </div>
  )
}
