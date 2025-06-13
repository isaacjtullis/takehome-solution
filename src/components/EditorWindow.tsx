import { Card, CardContent } from "@/components/ui/card";
import { useState, useCallback } from "react";
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import { Markdown } from 'tiptap-markdown'
import { FunctionBadge } from "@/extensions/FunctionBadge";
import { SlashCommand } from "@/extensions/SlashCommand";
import CodeBlock from '@tiptap/extension-code-block'
import Underline from '@tiptap/extension-underline'

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from '@tiptap/starter-kit'
import { Button } from "./ui/button";
import { SAMPLE_SCRIPT, preprocessMarkdown, postprocessMarkdown } from "./editorWindowHelpers";

export function EditorWindow() {
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [markdownText, setMarkdownText] = useState(SAMPLE_SCRIPT);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }), 
      Placeholder.configure({ placeholder: "Type something..." }),
      CodeBlock,
      BulletList.configure({
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'list-item',
        },
      }),
      Markdown,
      FunctionBadge,
      SlashCommand,
      Underline,
    ],

    content: preprocessMarkdown(markdownText),
    onUpdate: ({ editor }) => {
      if (showMarkdown) {
        const rawMarkdown = editor.storage.markdown.getMarkdown()
        const cleaned = postprocessMarkdown(rawMarkdown)
        setMarkdownText(cleaned)
      }
    },
  });

  const toggleMarkdown = useCallback(() => {
    if (!editor) return;

    if (showMarkdown) {
      // going FROM markdown view -> editor
      const processed = preprocessMarkdown(markdownText)
      editor.commands.setContent(processed)
    } else {
      // going FROM editor -> markdown view
      const rawMarkdown = editor.storage.markdown.getMarkdown()
      const cleaned = postprocessMarkdown(rawMarkdown)
      setMarkdownText(cleaned)
    }

    setShowMarkdown(prev => !prev)
  }, [editor, showMarkdown, markdownText, preprocessMarkdown, postprocessMarkdown]);

  const toggleMarkdownText = showMarkdown ? 'Preview Markdown' : 'Edit Markdown';

  return (
    <div className="flex flex-col gap-4" data-testid="editor-window">
      <Button 
        className="cursor-pointer mb-4 ml-auto min-w-[120px] w-full sm:w-[150px]" 
        onClick={toggleMarkdown}
        data-testid="toggle-markdown-btn"
      >
        {toggleMarkdownText}
      </Button>

      {showMarkdown ? (
        <Card className="rounded-lg shadow-lg">
          <CardContent className="">
            <textarea
              data-testid="markdown-textarea"
              className="w-full h-[500px] font-mono text-sm outline-none resize-none prose prose-sm max-w-none pl-8 pr-8 pt-8"
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-lg shadow-lg bg-[#f7f7f7]" data-testid="markdown-preview-window">
          <CardContent>
            <div
              className={`editor-content-wrapper pl-8 pr-8 pt-8 w-full h-[500px] font-mono text-sm outline-none resize-none overflow-auto max-w-none ${
                showMarkdown ? 'markdown-mode' : 'preview-mode'
              }`}
            >
              <EditorContent
                className="focus:outline-none focus:ring-0 focus:border-0 border-0"
                editor={editor}
              />
            </div>
          </CardContent>
          </Card>
      )}
    </div>
  );
}