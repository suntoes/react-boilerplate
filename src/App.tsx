import { BrowserRouter } from 'react-router-dom'
import React from 'react'

import { ThemeStateProvider } from 'components/reusable'
import { AnimatedRoutes } from 'animated-routes'

export { App, type AppProps }

interface AppProps {}

function App() {
  return (
    <ThemeStateProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeStateProvider>
  )
}
