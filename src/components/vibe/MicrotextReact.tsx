import { useEffect, useState } from 'react'
import { marked } from 'marked'

interface Props {
  id: string
  as?: keyof JSX.IntrinsicElements
  className?: string
  defaultValue: string
  markdown?: boolean
}

export function MicrotextReact({
  id,
  as: Element = 'span',
  className = '',
  defaultValue,
  markdown = true
}: Props) {
  const [content, setContent] = useState(defaultValue)

  useEffect(() => {
    const handleUpdate = (e: CustomEvent) => {
      if (e.detail.id === id) {
        setContent(e.detail.value)
      }
    }

    window.addEventListener('microtext-updated', handleUpdate as EventListener)
    return () => window.removeEventListener('microtext-updated', handleUpdate as EventListener)
  }, [id])

  const html = markdown ? marked.parseInline(content) : content

  return (
    <Element
      className={className}
      data-microtext={id}
      data-microtext-raw={content}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
