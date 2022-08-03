import * as React from 'react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import cx from 'clsx'
import type { DragEndEvent } from '@dnd-kit/core'

import { usePageStore } from '~/stores/page'
import { BlockComponent } from './Block'

export const Notion = () => {
  const { title, blocks } = usePageStore()

  const handleDragEnd = (event: DragEndEvent) => {
    // console.log(event)
  }

  return (
    <div className="w-[65ch] mx-auto my-24">
      <h1
        id="title"
        contentEditable="true"
        spellCheck="false"
        data-ph="Untitled"
        className={cx(
          'px-4 sm:px-0 focus:outline-none focus-visible:outline-none text-5xl font-bold mb-12 empty',
          {
            empty: !title,
          },
        )}
      >
        {title}
      </h1>
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <BlockComponent key={block.id} {...block} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
