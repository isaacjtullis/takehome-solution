import Suggestion from '@tiptap/suggestion'
import tippy from 'tippy.js'
import type { Instance as TippyInstance } from 'tippy.js'
import { Extension } from '@tiptap/core'
import SlashMenu from '@/components/SlashMenu'
import { Editor } from '@tiptap/core'
import { createRoot } from 'react-dom/client'
import { functionSpecs } from '@/data'

interface CommandItem {
  title: string
  description: string
  icon?: string
  command: (props: { editor: Editor; range: { from: number; to: number } }) => void
}

interface SuggestionProps {
  editor: Editor
  range: { from: number; to: number }
  clientRect: () => DOMRect
  event?: KeyboardEvent
}

const getFunctionCommands = () => {
  return functionSpecs.map(fn => ({
    title: fn.name,
    description: fn.description,
    command: ({ editor, range }: { editor: Editor; range: { from: number; to: number } }) => {
      editor.chain().focus().deleteRange(range).setFunctionBadge(fn.id).run()
    }
  }))
}

const defaultCommands: CommandItem[] = [
  {
    title: 'Heading 1',
    description: 'Add a heading',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    },
  },
  {
    title: 'Bullet List',
    description: 'Add a bullet list',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: 'Quote',
    description: 'Add a quote block',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  ...getFunctionCommands()
]

class SlashCommandRenderer {
  private popup: TippyInstance | null = null
  private root: any = null
  private container: HTMLDivElement

  constructor() {
    this.container = document.createElement('div')
  }

  onStart(props: SuggestionProps) {
    const instances = tippy(document.body, {
      getReferenceClientRect: props.clientRect,
      appendTo: () => document.body,
      content: this.container,
      showOnCreate: true,
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
    }) as unknown as TippyInstance[]
    this.popup = instances[0]

    queueMicrotask(() => {
      this.root = createRoot(this.container)
      this.root.render(
        <SlashMenu
          items={defaultCommands}
          editor={props.editor}
          range={props.range}
          onSelect={item => item.command({ editor: props.editor, range: props.range })}
        />
      )
    })
  }

  onUpdate(props: SuggestionProps) {
    if (!this.popup || !this.root) return

    this.popup.setProps({
      getReferenceClientRect: props.clientRect,
    })

    queueMicrotask(() => {
      this.root.render(
        <SlashMenu
          items={defaultCommands}
          editor={props.editor}
          range={props.range}
          onSelect={item => item.command({ editor: props.editor, range: props.range })}
        />
      )
    })
  }

  onKeyDown(props: SuggestionProps) {
    const event = props.event
    if (!event) return false

    if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
      event.preventDefault()
      return true
    }

    if (event.key === 'Escape') {
      this.popup?.hide()
      return true
    }

    return false
  }

  onExit() {
    queueMicrotask(() => {
      if (this.root) {
        this.root.unmount()
        this.root = null
      }
      if (this.popup) {
        this.popup.destroy()
        this.popup = null
      }
      if (this.container) {
        this.container.remove()
      }
    })
  }
}

export const SlashCommand = Extension.create({
  name: 'slash-command',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        startOfLine: true,
        items: ({ editor }: { editor: Editor }) => defaultCommands,
        render: () => {
          const renderer = new SlashCommandRenderer()
          return {
            onStart: (props: SuggestionProps) => renderer.onStart(props),
            onUpdate: (props: SuggestionProps) => renderer.onUpdate(props),
            onKeyDown: (props: SuggestionProps) => renderer.onKeyDown(props),
            onExit: () => renderer.onExit(),
          }
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        ...this.options.suggestion,
        editor: this.editor,
      }),
    ]
  },
})
