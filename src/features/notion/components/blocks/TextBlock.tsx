import * as React from 'react'

import { Editor } from '~/components/Elements'
import { usePageStore } from '~/stores/page'
import type { Block } from '~/utils/types'

interface TextBlockProps {
  block: Block
}

export const TextBlock = ({ block }: TextBlockProps) => {
  const { id, details } = block
  const { updateBlockValue } = usePageStore()
  const update = React.useCallback(
    (value: string) => {
      updateBlockValue(id, value)
    },
    [id],
  )
  return <Editor value={details?.value} update={update} />
}
