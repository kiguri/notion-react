import cx from 'clsx'
import React from 'react'

interface TooltipProps extends React.PropsWithChildren {
  content: React.ReactNode
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  return (
    <div className="relative group-tooltip">
      {children}
      <div className="z-10 absolute translate-y-2 left-1/2 -translate-x-1/2 w-max text-white bg-neutral-800 text-sm font-medium px-2 py-1 rounded opacity-0 pointer-events-none transition duration-150 group-tooltip-hover:delay-500 group-tooltip-hover:opacity-100">
        {content}
      </div>
    </div>
  )
}
