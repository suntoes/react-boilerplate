import { BrowserRouter } from 'react-router-dom'
import React from 'react'

import { ThemeStateProvider } from 'components/theme-state-provider'
import Routes from 'animated-routes'

export default function App(): JSX.Element {
  return (
    <ThemeStateProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeStateProvider>
  )
}
