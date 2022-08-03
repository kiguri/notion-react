import * as React from 'react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import type {
  Announcements,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'

import { BlockComponent } from './Block'
import { usePageStore } from '~/stores/page'

export const SortableList = () => {
  const { blocks } = usePageStore()
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  const isFirstAnnouncement = React.useRef(true)

  const getIndex = (id: UniqueIdentifier) =>
    blocks.findIndex(({ id: blockId }) => blockId === id)
  const getPosition = (id: UniqueIdentifier) => getIndex(id)
  const activeIndex = activeId ? getIndex(activeId) : -1
  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id,
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${
        blocks.length
      }`
    },
    onDragOver({ active, over }) {
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false
        return
      }

      if (over) {
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id)} of ${blocks.length}`
      }

      return
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id)} of ${blocks.length}`
      }

      return
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id,
      )} of ${blocks.length}.`
    },
  }

  React.useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true
    }
  }, [activeId])

  return (
    <DndContext
      accessibility={{ announcements }}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
        {blocks.map((block) => (
          <BlockComponent key={block.id} {...block} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
