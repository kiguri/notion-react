import * as React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cx from 'clsx'

import { Tooltip } from '~/components/Elements'
import { Block, BlockType } from '~/utils/types'

export const BlockComponent = ({ id, type }: Block) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      aria-label="block"
      className={cx('group flex w-full rounded', {
        'pt-12 first:pt-0': type === BlockType.H1,
        'pt-6 first:pt-0': type === BlockType.H2,
      })}
      {...attributes}
      {...listeners}
    ></div>
  )
}
