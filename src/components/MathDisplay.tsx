"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import katex from "katex";

interface MathDisplayProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export function MathDisplay({ math, displayMode = false, className = "" }: MathDisplayProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
        output: "html",
      });
    } catch {
      return math;
    }
  }, [math, displayMode]);

  return (
    <span
      className={`inline-math ${displayMode ? "block my-2 text-center" : "inline"} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Normalizes Markdown content to ensure robust KaTeX and CommonMark rendering:
 * 1. Puts multiline $$ ... $$ blocks onto isolated lines (\n\n$$\n...\n$$\n\n) so that
 *    remark-math does not treat LaTeX environments like \begin{aligned} as block info strings,
 *    and properly detects closing delimiters.
 * 2. Unindents math lines that start with 4+ spaces to prevent them from being parsed as indented code blocks.
 */
function normalizeMarkdownContent(content: string): string {
  if (!content) return "";

  // 1. Isolate multiline $$ math blocks
  let text = content.replace(/\$\$([\s\S]+?)\$\$/g, (match, inner) => {
    if (inner.includes("\n")) {
      const trimmed = inner.trim();
      return `\n\n$$\n${trimmed}\n$$\n\n`;
    }
    return match;
  });

  // 2. Unindent lines that start with 4+ spaces before $$ to avoid indented code block parsing
  text = text.replace(/^[ \t]+(\$\$[\s\S]+?\$\$)/gm, (match, math) => {
    return `\n\n${math.trim()}\n\n`;
  });

  return text;
}

/**
 * Rich Markdown + KaTeX parser that renders headings, lists, bold text, code blocks,
 * and math formulas ($math$ and $$math$$) with Claude editorial typography styling.
 */
export function FormattedProse({ content, className = "" }: { content: string; className?: string }) {
  const normalizedContent = useMemo(() => normalizeMarkdownContent(content), [content]);

  return (
    <div className={`prose-claude ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { output: "html", throwOnError: false }]]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-claude-ink dark:text-white mt-8 mb-4 tracking-tight pb-2 border-b border-claude-border/60 dark:border-claude-darkBorder/60">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-claude-ink dark:text-white mt-7 mb-3 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-claude-clay shrink-0" />
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-lg sm:text-xl font-medium text-claude-ink dark:text-white mt-6 mb-2.5 tracking-tight flex items-center gap-2">
              <span className="text-claude-clay text-sm select-none">✦</span>
              <span>{children}</span>
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-serif text-base font-semibold text-claude-clay dark:text-[#E89274] mt-5 mb-2 tracking-tight">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-2.5 leading-relaxed text-claude-text dark:text-claude-darkText font-sans text-sm sm:text-base font-normal">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-3 ml-5 list-disc space-y-1.5 text-sm sm:text-base text-claude-text dark:text-claude-darkText marker:text-claude-clay/70">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 ml-5 list-decimal space-y-1.5 text-sm sm:text-base text-claude-text dark:text-claude-darkText marker:font-mono marker:text-xs marker:text-claude-muted">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-claude-ink dark:text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-claude-text dark:text-claude-darkText font-serif">{children}</em>
          ),
          hr: () => <hr className="my-6 border-t border-claude-border dark:border-claude-darkBorder" />,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-3 border-claude-clay pl-4 py-1.5 italic bg-claude-claySubtle/30 dark:bg-claude-claySubtle/10 rounded-r text-claude-ink dark:text-claude-darkText font-serif text-sm">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-5 border border-claude-border dark:border-claude-darkBorder rounded-lg bg-white dark:bg-claude-darkSurface shadow-claude-sm">
              <table className="w-full text-left text-xs font-sans">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border-b border-claude-border dark:border-claude-darkBorder text-claude-muted dark:text-claude-darkMuted font-mono">
              {children}
            </thead>
          ),
          th: ({ children }) => <th className="p-3.5 font-medium">{children}</th>,
          tbody: ({ children }) => (
            <tbody className="divide-y divide-claude-border/60 dark:divide-claude-darkBorder/60">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-claude-bgSubtle/50 dark:hover:bg-claude-darkSurfaceElevated/50 transition-colors">
              {children}
            </tr>
          ),
          td: ({ children }) => <td className="p-3.5 text-claude-muted dark:text-claude-darkMuted">{children}</td>,
          code({ className, children, ...props }) {
            const isBlock = !className && String(children).includes("\n");
            return isBlock ? (
              <div className="rounded-lg overflow-hidden border border-claude-border dark:border-claude-darkBorder bg-[#23201C] text-[#EAE5DD] my-4 shadow-claude-sm">
                <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            ) : (
              <code
                className="px-1.5 py-0.5 rounded-sm bg-claude-bgSubtle dark:bg-claude-darkSurface font-mono text-[12px] text-claude-ink dark:text-[#EAE5DD] border border-claude-border/80 dark:border-claude-darkBorder/80 font-normal"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre({ children }) {
            return (
              <div className="rounded-lg overflow-hidden border border-claude-border dark:border-claude-darkBorder bg-[#23201C] text-[#EAE5DD] my-4 shadow-claude-sm">
                <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                  {children}
                </pre>
              </div>
            );
          },
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}
