import { Layout } from '~/components/Layout'
import { Markdown } from '~/features/markdown/Markdown'
import { Notion } from '~/features/notion'

function App() {
  return (
    <Layout>
      <div className="sticky top-0 h-screen overflow-y-auto bg-neutral-50">
        <Markdown />
      </div>
      <div className="shrink-0 px-24 min-w-[50%] mx-auto">
        <Notion />
      </div>
    </Layout>
  )
}

export default App
