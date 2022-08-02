import { usePageStore } from '~/stores/page'
import { BlockType } from '~/utils/types'

export const Markdown = () => {
  const { blocks } = usePageStore()

  const markdown = blocks.map((block) => {
    if (block.type === BlockType.TEXT) {
      return {
        id: block.id,
        type: BlockType.TEXT,
        details: {
          value: (block.details?.value as string)
            .replaceAll('<p>', '')
            .replaceAll('</p>', '')
            .replaceAll('<strong>', '**')
            .replaceAll('</strong>', '**')
            .replaceAll('<em>', '*')
            .replaceAll('</em>', '*')
            .replaceAll(/\<br.*?\>/g, ''),
        },
      }
    } else {
      return block
    }
  })
  return (
    <pre className="whitespace-pre-wrap p-10">
      {JSON.stringify(markdown, null, 2)}
    </pre>
  )
}
