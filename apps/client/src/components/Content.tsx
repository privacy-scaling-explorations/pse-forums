// import "katex/dist/katex.min.css"
import { detectFormat, Format } from "@/lib/format" 
import type { FC } from "react"
import Latex from "react-latex-next"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

export const Content: FC<{ content: string }> = ({ content }) => {
  switch (detectFormat(content)) {
    case Format.Markdown:
      return (
        <div className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      )
    case Format.Latex:
      return <Latex>{content}</Latex>
    case Format.Raw:
      return content
  }
}
