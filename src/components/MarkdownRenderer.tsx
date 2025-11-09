import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
// Removido import do CSS do highlight.js - usando CSS customizado

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Componente para renderizar Markdown com syntax highlighting
 */
export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Customizar renderização de elementos
          h1: ({ node, ...props }) => (
            <h1
              className="text-2xl font-bold mb-4 mt-6 border-b-2 border-current pb-2"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mb-3 mt-5" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-bold mb-2 mt-4" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-base font-bold mb-2 mt-3" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-3 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside mb-3 space-y-1 ml-4"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside mb-3 space-y-1 ml-4"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="ml-2" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-current pl-4 py-2 my-3 italic bg-black/5"
              {...props}
            />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-black/10 px-1.5 py-0.5 rounded text-sm font-mono border border-black/20"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={`${className} block bg-black/5 p-3 rounded border-2 border-black/20 overflow-x-auto text-sm font-mono my-3`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre className="my-3 overflow-x-auto" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3">
              <table
                className="min-w-full border-2 border-black/20"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-black/10" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-black/20 px-3 py-2 text-left font-bold"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-black/20 px-3 py-2" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr
              className="my-4 border-t-2 border-current opacity-30"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
