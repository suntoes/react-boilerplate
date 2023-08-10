import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

import Home from 'compositions/home'

export default function AnimatedRoutes(): JSX.Element {
  const location = useLocation()

  useEffect(() => {
    const { hash } = location

    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0)
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView()
        }
      }, 0)
    }
  }, [location])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </AnimatePresence>
  )
}
