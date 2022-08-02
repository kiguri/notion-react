import * as React from 'react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import { usePageStore } from '~/stores/page'

export const Notion = () => {
  const { title, blocks } = usePageStore()

  const [items] = React.useState([1, 2, 3])

  return (
    <div className="w-[65ch] mx-auto my-24">
      <h1
        id="title"
        contentEditable="true"
        spellCheck="false"
        data-ph="Untitled"
        className={`px-4 sm:px-0 focus:outline-none focus-visible:outline-none text-5xl font-bold mb-12 ${
          title ? '' : 'empty'
        }`}
      >
        {title}
      </h1>
      <DndContext>
        <SortableContext items={items}></SortableContext>
      </DndContext>
    </div>
  )
}
