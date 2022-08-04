import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cx from 'clsx'
import { Delete, Add } from 'styled-icons/material'

import { DividerBlock } from './blocks/DividerBlock'
import { TextBlock } from './blocks/TextBlock'
import { HeadingBlock } from './blocks/HeadingBlock'
import { Tooltip } from '~/components/Elements'
import { BlockMenu } from './BlockMenu'
import { Block, BlockType } from '~/utils/types'
import { usePageStore } from '~/stores/page'

export const BlockComponent = ({ id, type, details }: Block) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const { deleteBlock } = usePageStore()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDelete = () => {
    deleteBlock(id)
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
    >
      {/* Buttons */}
      <div
        className={cx(
          'h-full px-2 pl-4 py-1.5 text-center cursor-pointer transition-all duration-150 text-neutral-300 flex',
          {
            'py-3.5': type === BlockType.H1,
            'py-3': type === BlockType.H2,
            'py-2.5': type === BlockType.H3,
          },
        )}
      >
        <Tooltip
          content={
            <span className="text-neutral-400">
              <span className="text-white">Click</span> to delete block
            </span>
          }
        >
          <button onClick={handleDelete}>
            <Delete className="w-6 h-6 hover:bg-neutral-100 hover:text-neutral-400 p-0.5 rounded group-hover:opacity-100 opacity-0" />
          </button>
        </Tooltip>
        <Tooltip
          content={
            <span className="text-neutral-400">
              <span className="text-white">Click</span> to add block below
            </span>
          }
        >
          <Add className="w-6 h-6 hover:bg-neutral-100 hover:text-neutral-400 p-0.5 rounded group-hover:opacity-100 opacity-0" />
        </Tooltip>

        <BlockMenu ref={setActivatorNodeRef} listeners={listeners} />
      </div>

      <div
        className={cx(
          'w-full relative cursor-text',
          'px-4 sm:px-0' && type !== BlockType.DIVIDER,
        )}
      >
        {type === BlockType.DIVIDER ? (
          <DividerBlock />
        ) : type === BlockType.H1 ||
          type === BlockType.H2 ||
          type === BlockType.H3 ? (
          <HeadingBlock block={{ id, type, details }} />
        ) : type === BlockType.TEXT ? (
          <TextBlock block={{ id, type, details }} />
        ) : null}
      </div>
    </div>
  )
}
