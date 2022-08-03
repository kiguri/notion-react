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
