import React from 'react'

import { Editor } from '~/components/Elements'
import type { Block } from '~/utils/types'

interface TextBlockProps {
  block: Block
}

export const TextBlock = ({ block }: TextBlockProps) => {
  return <Editor />
}
