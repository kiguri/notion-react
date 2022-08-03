import cx from 'clsx'

import { Block, BlockType } from '~/utils/types'

interface HeadingBlockProps {
  block: Block
}

export const HeadingBlock = ({ block }: HeadingBlockProps) => {
  const { id, type, details } = block

  const headingConfig = {
    [BlockType.H1]: {
      placeholder: 'Heading 1',
      class: 'text-4xl font-semibold',
    },
    [BlockType.H2]: {
      placeholder: 'Heading 2',
      class: 'text-3xl font-medium',
    },
    [BlockType.H3]: {
      placeholder: 'Heading 3',
      class: 'text-2xl font-medium',
    },
  }

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      spellCheck="false"
      // @ts-ignore
      data-ph={headingConfig[type]?.placeholder}
      className={cx(
        'ocus:outline-none focus-visible:outline-none w-full py-1.5 font-semibold',
        // @ts-ignore
        headingConfig[type]?.class,
      )}
    >
      {details?.value}
    </div>
  )
}
