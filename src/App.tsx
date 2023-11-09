import { Layout, Nav } from 'components/page'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

export { App, type AppProps }

interface AppProps {}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Nav />
      </Layout>
    </BrowserRouter>
  )
}
