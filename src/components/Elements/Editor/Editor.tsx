import * as React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import History from '@tiptap/extension-history'

interface Editor {
  value: string | undefined
  update: (value: string) => void
}

export const Editor = React.memo(({ value, update }: Editor) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Italic, History],
    editorProps: {
      handleDrop: () => true,
    },
    content: value,
    onUpdate: ({ editor }) => {
      update(editor.getHTML().replaceAll(/\<br.*?\>/g, ''))
    },
  })

  React.useEffect(() => {
    if (!value && !editor?.isFocused) {
      editor?.commands.focus()
    }
  }, [value, editor])

  return (
    <>
      <EditorContent editor={editor} spellCheck={false} />
    </>
  )
})
