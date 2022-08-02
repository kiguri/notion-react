import React from 'react'

import { usePageStore } from '~/stores/page'

export const Markdown = () => {
  const { title } = usePageStore()
  return <div>{title}</div>
}
