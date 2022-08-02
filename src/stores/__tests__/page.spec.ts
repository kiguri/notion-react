import { renderHook, act } from '@testing-library/react'

import { usePageStore } from '../page'

test('title', () => {
  const { result } = renderHook(() => usePageStore())

  expect(result.current.title).toBe('Pigaboo')
})
