import cx from 'clsx'

import { usePageStore } from '~/stores/page'
import { SortableList } from './SortableList'

export const Notion = () => {
  const { title } = usePageStore()

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
      <SortableList />
    </div>
  )
}
