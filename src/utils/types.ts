import { TextBlock } from '~/features/notion'
import { DividerBlock } from '~/features/notion'

export interface Block {
  id: string
  type: BlockType
  details?: Details
}

export enum BlockType {
  TEXT = 'TEXT',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  DIVIDER = 'DIVIDER',
}

export interface Details {
  value?: string
}

export const BlockComponents = {
  [BlockType.TEXT]: TextBlock,
  [BlockType.DIVIDER]: DividerBlock,
}
