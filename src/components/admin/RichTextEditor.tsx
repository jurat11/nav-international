import React, { useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'
import { Button } from '../ui/button'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  Code, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Image as ImageIcon,
  Link as LinkIcon,
  Palette
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onImageUpload?: (file: File) => Promise<string>
}

const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(({ 
  content, 
  onChange, 
  onImageUpload 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the built-in Link and Underline extensions to avoid conflicts
        link: false,
        underline: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-secondary underline',
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Superscript,
      Subscript,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[300px] p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary',
      },
    },
  })

  // Update editor content when the content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  const addImage = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (!editor || !onImageUpload) return

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        try {
          const url = await onImageUpload(file)
          editor.chain().focus().setImage({ src: url }).run()
        } catch (error) {
          console.error('Error uploading image:', error)
        }
      }
    }
    input.click()
  }, [editor, onImageUpload])

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const handleToolbarClick = useCallback((callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    callback()
  }, [])

  if (!editor) {
    return null
  }

  return (
    <div className="border border-border rounded-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-border bg-muted/30">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleBold().run())}
            className={editor.isActive('bold') ? 'bg-secondary text-white' : ''}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleItalic().run())}
            className={editor.isActive('italic') ? 'bg-secondary text-white' : ''}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleUnderline().run())}
            className={editor.isActive('underline') ? 'bg-secondary text-white' : ''}
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleStrike().run())}
            className={editor.isActive('strike') ? 'bg-secondary text-white' : ''}
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleCode().run())}
            className={editor.isActive('code') ? 'bg-secondary text-white' : ''}
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => {
              if (editor.isActive('heading', { level: 1 })) {
                editor.chain().focus().setParagraph().run()
              } else {
                editor.chain().focus().setHeading({ level: 1 }).run()
              }
            })}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-secondary text-white' : ''}
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => {
              if (editor.isActive('heading', { level: 2 })) {
                editor.chain().focus().setParagraph().run()
              } else {
                editor.chain().focus().setHeading({ level: 2 }).run()
              }
            })}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-secondary text-white' : ''}
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => {
              if (editor.isActive('heading', { level: 3 })) {
                editor.chain().focus().setParagraph().run()
              } else {
                editor.chain().focus().setHeading({ level: 3 }).run()
              }
            })}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-secondary text-white' : ''}
          >
            <Heading3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleBulletList().run())}
            className={editor.isActive('bulletList') ? 'bg-secondary text-white' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleOrderedList().run())}
            className={editor.isActive('orderedList') ? 'bg-secondary text-white' : ''}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().toggleBlockquote().run())}
            className={editor.isActive('blockquote') ? 'bg-secondary text-white' : ''}
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().setTextAlign('left').run())}
            className={editor.isActive({ textAlign: 'left' }) ? 'bg-secondary text-white' : ''}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().setTextAlign('center').run())}
            className={editor.isActive({ textAlign: 'center' }) ? 'bg-secondary text-white' : ''}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().setTextAlign('right').run())}
            className={editor.isActive({ textAlign: 'right' }) ? 'bg-secondary text-white' : ''}
          >
            <AlignRight className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().setTextAlign('justify').run())}
            className={editor.isActive({ textAlign: 'justify' }) ? 'bg-secondary text-white' : ''}
          >
            <AlignJustify className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Media */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => addImage())}
            disabled={!onImageUpload}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => setLink())}
            className={editor.isActive('link') ? 'bg-secondary text-white' : ''}
          >
            <LinkIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* History */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().undo().run())}
            disabled={!editor.can().undo()}
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToolbarClick(() => editor.chain().focus().redo().run())}
            disabled={!editor.can().redo()}
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
})

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
