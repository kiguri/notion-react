import create from 'zustand'

type PageStore = {
  title: string
}

export const usePageStore = create<PageStore>((set) => ({
  title: 'Pigaboo',
}))
