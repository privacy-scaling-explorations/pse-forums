// import "katex/dist/katex.min.css"
import { detectFormat, Format } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { FC } from "react";
import Latex from "react-latex-next";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export const Content: FC<{ content: string }> = ({ content }) => {
  switch (detectFormat(content)) {
    case Format.Markdown:
      return (
        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children, className }) => (
                <h1 className={cn("text-base-foreground", className)}>
                  {children}
                </h1>
              ),
              h2: ({ children, className }) => (
                <h2 className={cn("text-base-foreground", className)}>
                  {children}
                </h2>
              ),
              h3: ({ children, className }) => (
                <h3 className={cn("text-base-foreground", className)}>
                  {children}
                </h3>
              ),
              h4: ({ children, className }) => (
                <h4 className={cn("text-base-foreground", className)}>
                  {children}
                </h4>
              ),
              h5: ({ children, className }) => (
                <h5 className={cn("text-base-foreground", className)}>
                  {children}
                </h5>
              ),
              h6: ({ children, className }) => (
                <h6 className={cn("text-base-foreground", className)}>
                  {children}
                </h6>
              ),
              strong: ({ children, className }) => (
                <strong className={cn("text-base-foreground", className)}>
                  {children}
                </strong>
              ),
              em: ({ children, className }) => (
                <em className={cn("text-base-foreground", className)}>
                  {children}
                </em>
              ),
              code: ({ children, className }) => (
                <code className={cn("text-base-foreground", className)}>
                  {children}
                </code>
              ),
              blockquote: ({ children, className }) => (
                <blockquote className={cn("text-base-foreground", className)}>
                  {children}
                </blockquote>
              ),
              ul: ({ children, className }) => (
                <ul className={cn("text-base-foreground", className)}>
                  {children}
                </ul>
              ),
              ol: ({ children, className }) => (
                <ol className={cn("text-base-foreground", className)}>
                  {children}
                </ol>
              ),
              p: ({ children, className }) => (
                <p className={cn("text-base-foreground text-sm font-inter font-normal", className)}>
                  {children}
                </p>
              ),
              a: ({ children, href, className }) => (
                <a
                  className={cn("text-base-foreground", className)}
                  href={href}
                >
                  {children}
                </a>
              ),
              span: ({ children, className }) => (
                <span className={cn("text-base-foreground", className)}>
                  {children}
                </span>
              ),
              div: ({ children, className }) => (
                <div className={cn("text-base-foreground text-sm font-inter font-normal", className)}>
                  {children}
                </div>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    case Format.Latex:
      return <Latex>{content}</Latex>;
    case Format.Raw:
      return content;
  }
};
