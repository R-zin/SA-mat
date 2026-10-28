"use client";

import React, { useMemo } from "react";
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
      });
    } catch (e) {
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
 * Parses a paragraph of text, replacing any occurrences of $...$ with real KaTeX inline math!
 */
export function FormattedProse({ content, className = "" }: { content: string; className?: string }) {
  const parts = useMemo(() => {
    // Regex matches $...$ where the content inside is not empty
    const regex = /\$([^\$]+)\$/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        elements.push(content.substring(lastIndex, match.index));
      }
      const formula = match[1];
      try {
        const mathHtml = katex.renderToString(formula, {
          displayMode: false,
          throwOnError: false,
        });
        elements.push(
          <span
            key={match.index}
            className="inline-math font-serif px-0.5"
            dangerouslySetInnerHTML={{ __html: mathHtml }}
          />
        );
      } catch {
        elements.push(`$${formula}$`);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      elements.push(content.substring(lastIndex));
    }

    return elements;
  }, [content]);

  return <div className={`leading-relaxed ${className}`}>{parts}</div>;
}
