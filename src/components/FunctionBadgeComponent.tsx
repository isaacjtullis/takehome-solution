// components/FunctionBadgeComponent.tsx
import React, { useRef } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { functionSpecs } from '@/data'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export default function FunctionBadgeComponent({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const currentId = node.attrs.id
  const spec = functionSpecs.find(fn => fn.id === currentId)
  const triggerRef = useRef<HTMLSpanElement>(null)

  return (
    <NodeViewWrapper as="span" className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 rounded text-sm font-medium cursor-pointer">
      <Tooltip>
        <TooltipTrigger asChild>
          <span ref={triggerRef}>
            <Popover>
              <PopoverTrigger asChild>
                <span className="text-xs font-mono break-words whitespace-normal">
                  {spec?.name || 'Error: Function not found'}
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2 rounded-xl bg-white shadow-xl flex flex-col gap-1">
                {functionSpecs.map(fn => (
                  <div
                    key={fn.id}
                    onClick={() => updateAttributes({ id: fn.id })}
                    className="px-2 py-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 text-base text-sm font-mono break-words whitespace-normal"
                  >
                    {fn.name}
                  </div>
                ))}
                <div className="border-t my-1" />
                <button
                  onClick={() => {
                    if (confirm('Delete this function?')) deleteNode()
                  }}
                  className="text-red-500 text-sm w-full text-left px-2 py-2 rounded-md cursor-pointer transition-colors hover:bg-red-50 font-medium"
                >
                  Delete
                </button>
              </PopoverContent>
            </Popover>
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="px-3 py-2 rounded-md bg-gray-900 text-white text-xs shadow-md"
        >
          {spec?.description || 'Unknown function'}
        </TooltipContent>
      </Tooltip>
    </NodeViewWrapper>
  )
}
