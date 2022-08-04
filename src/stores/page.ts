import create from 'zustand'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

import { Block, BlockType } from '~/utils/types'
import { UniqueIdentifier } from '@dnd-kit/core'

type Page = {
  title: string
  blocks: Block[]
}

type PageStore = {
  page: Page
  reorderBlocks: (activeIndex: number, overIndex: number) => void
  deleteBlock: (id: UniqueIdentifier) => void
  updateBlockValue: (id: UniqueIdentifier, value: string) => void
}

const initialData: Page = {
  title: 'Pigaboo',
  blocks: [
    {
      id: nanoid(),
      type: BlockType.H1,
      details: {
        value: 'Get Started',
      },
    },
    {
      id: nanoid(),
      type: BlockType.DIVIDER,
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value:
          '<p>👋 Welcome! This is a private page for you to play around with.</p>',
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value: '<p>Give these things a try:</p>',
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value: '<p>1. Hover on the left of each line for quick actions</p>',
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value: '<p>2. Click on the + button to add a new line</p>',
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value: '<p>3. Drag the ⋮⋮ button to reorder</p>',
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value: '<p>4. Click the trash icon to delete this block</p>',
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value:
          '<p>5. <strong>Bold</strong> and <em>italicize</em> using markdown e.g. *italic* or **bold**</p>',
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value:
          "<p>6. Add headers and dividers with '#', '##' or '---' followed by a space</p>",
      },
    },
    {
      id: nanoid(),
      type: BlockType.TEXT,
      details: {
        value:
          "<p>7. Type '/' for a menu to quickly switch blocks and search by typing</p>",
      },
    },
  ],
}

export const usePageStore = create<PageStore>((set) => ({
  page: initialData,
  reorderBlocks(activeIndex, overIndex) {
    set((state) => ({
      page: {
        ...state.page,
        blocks: arrayMove([...state.page.blocks], activeIndex, overIndex),
      },
    }))
  },
  updateBlockValue(id, value) {
    set((state) => ({
      page: {
        ...state.page,
        blocks: state.page.blocks.map((block) =>
          block.id === id
            ? { ...block, details: { ...block.details, value } }
            : block,
        ),
      },
    }))
  },
  deleteBlock(id) {
    set((state) => ({
      page: {
        ...state.page,
        blocks: state.page.blocks.filter((block) => block.id !== id),
      },
    }))
  },
}))
