import React from 'react'
import cx from 'clsx'
import { DragIndicator } from 'styled-icons/material'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import {
  HorizontalRule,
  LooksOne,
  LooksTwo,
  Looks3,
  TextFields,
} from 'styled-icons/material'

import { Tooltip } from '~/components/Elements'
import { Block, BlockType } from '~/utils/types'
import { usePageStore } from '~/stores/page'

interface BlockMenuProps {
  block: Block
  listeners: DraggableSyntheticListeners
}

const defaultOptions = [
  {
    type: BlockType.TEXT,
    label: 'Text',
    icon: <TextFields />,
  },
  {
    type: BlockType.H1,
    label: 'Heading 1',
    icon: <LooksOne />,
  },
  {
    type: BlockType.H2,
    label: 'Heading 2',
    icon: <LooksTwo />,
  },
  {
    type: BlockType.H3,
    label: 'Heading 3',
    icon: <Looks3 />,
  },
  {
    type: BlockType.DIVIDER,
    label: 'Divider',
    icon: <HorizontalRule />,
  },
]

export const BlockMenu = React.forwardRef<HTMLButtonElement, BlockMenuProps>(
  ({ block, listeners }, handleRef) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [openedWithSlash, setOpenedWithSlash] = React.useState(false)
    const popupRef = React.useRef<HTMLDivElement>(null)

    const { updateBlockType } = usePageStore()

    const options = defaultOptions

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    React.useEffect(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      } else {
        document.removeEventListener('mousedown', handleClickOutside)
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setOpenedWithSlash(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    React.useEffect(() => {
      if (openedWithSlash) {
        setIsOpen(true)
      }
    }),
      [openedWithSlash]
    React.useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
      } else {
        document.removeEventListener('keydown', handleKeyDown)
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }),
      [isOpen]

    return (
      <div className="relative w-max h-max">
        <Tooltip
          content={
            <span className="text-neutral-400">
              <span className="text-white">Drag</span> to move
              <br />
              <span className="text-white">Click</span> to open menu
            </span>
          }
        >
          <button
            onClick={() => {
              setIsOpen((i) => !i)
            }}
            ref={handleRef}
            {...listeners}
          >
            <DragIndicator
              className={cx(
                'w-6 h-6 hover:bg-neutral-100 hover:text-neutral-400 p-0.5 rounded group-hover:opacity-100 opacity-0',
                isOpen ? 'opacity-100' : '',
              )}
            />
          </button>
        </Tooltip>

        {isOpen && (
          <div
            ref={popupRef}
            className="w-[10rem] lg:w-[12rem] xl:w-[16rem] absolute z-10 shadow rounded py-1 text-neutral-700 text-sm right-full bg-white max-h-[24rem] overflow-auto focus-visible:outline-none top-0"
          >
            <div className="text-left divide-y">
              <div className="px-2 py-2">
                <div className="px-2 pb-2 font-semibold uppercase text-xs text-neutral-400">
                  Turn into
                </div>
                {options.map((option, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded flex items-center gap-2 hover:bg-neutral-100 hover:text-neutral-400"
                    onClick={() => {
                      updateBlockType(block.id, option.type)
                      setIsOpen(false)
                    }}
                  >
                    <span className="w-5 h-5">{option.icon}</span>
                    <span className="truncate">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
)
