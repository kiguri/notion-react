import React from 'react'
import cx from 'clsx'
import { DragIndicator } from 'styled-icons/material'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'

import { Tooltip } from '~/components/Elements'

interface BlockMenuProps {
  listeners: DraggableSyntheticListeners
}

export const BlockMenu = React.forwardRef<HTMLButtonElement, BlockMenuProps>(
  ({ listeners }, handleRef) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [openedWithSlash, setOpenedWithSlash] = React.useState(false)

    const toggle = () => setIsOpen((o) => !o)

    return (
      <div className="relative w-max h-max">
        <div onClick={toggle}>
          <Tooltip
            content={
              <span className="text-neutral-400">
                <span className="text-white">Drag</span> to move
                <br />
                <span className="text-white">Click</span> to open menu
              </span>
            }
          >
            <button ref={handleRef} {...listeners}>
              <DragIndicator
                className={cx(
                  'w-6 h-6 hover:bg-neutral-100 hover:text-neutral-400 p-0.5 rounded group-hover:opacity-100 opacity-0',
                  isOpen ? 'opacity-100' : '',
                )}
              />
            </button>
          </Tooltip>
        </div>
      </div>
    )
  },
)
