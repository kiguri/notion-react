import { TextBlock } from '~/features/editor'

export interface Block {
  type: BlockType
  details?: Details
}

export enum BlockType {
  TEXT = 'TEXT',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  Divider = 'DIVIDER',
}

export interface Details {
  value?: string
}

export const BlockComponents = {
  [BlockType.TEXT]: TextBlock,
}
