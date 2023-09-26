import { Page } from 'components/reusable'

export { Home, type HomeProps }

interface HomeProps {}

function Home() {
  return (
    <Page>
      <h1>Hello World</h1>
    </Page>
  )
}
