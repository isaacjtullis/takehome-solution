// extensions/FunctionBadge.ts
import { Node, mergeAttributes, type NodeConfig } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import FunctionBadgeComponent from '@/components/FunctionBadgeComponent'

interface FunctionBadgeOptions {
  inputRegex?: RegExp
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    functionBadge: {
      setFunctionBadge: (id: string) => ReturnType
    }
  }
}

export const FunctionBadge = Node.create<FunctionBadgeOptions>({
  name: 'functionBadge',

  group: 'inline',
  inline: true,
  atom: true,

  addOptions() {
    return {
      inputRegex: /<% function ([a-zA-Z0-9-]+) %>/,
    }
  },

  addAttributes() {
    return {
      id: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'function-badge',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['function-badge', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FunctionBadgeComponent)
  },

  addInputRules() {
    const regex = this.options.inputRegex

    return [
      {
        find: regex,
        handler: ({ match, chain, range }) => {
          const id = match?.[1]
          if (!id) return
          chain()
            .insertContentAt(range, {
              type: this.name,
              attrs: { id },
            })
            .run()
        },
      },
    ]
  },

  addCommands() {
    return {
      setFunctionBadge:
        (id: string) =>
        ({ chain }) => {
          return chain().insertContent({ type: this.name, attrs: { id } }).run()
        },
    }
  },
})
