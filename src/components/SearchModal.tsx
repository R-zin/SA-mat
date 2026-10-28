"use client";

import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, ArrowRight, CornerDownLeft } from "lucide-react";
import { MODULES } from "@/data/modules";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (moduleId: string, sectionId: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectSection }: SearchModalProps) {
  const [query, setQuery] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Filter modules and subsections
  const q = query.toLowerCase().trim();
  const results: {
    moduleId: string;
    moduleTitle: string;
    sectionId: string;
    sectionTitle: string;
    preview: string;
  }[] = [];

  if (q.length > 1) {
    for (const mod of MODULES) {
      for (const sub of mod.subsections) {
        if (
          sub.title.toLowerCase().includes(q) ||
          sub.content.toLowerCase().includes(q) ||
          mod.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          const contentMatchIdx = sub.content.toLowerCase().indexOf(q);
          const start = Math.max(0, contentMatchIdx - 40);
          const end = Math.min(sub.content.length, contentMatchIdx + 80);
          const preview =
            contentMatchIdx !== -1
              ? "..." + sub.content.slice(start, end).replace(/\n/g, " ") + "..."
              : sub.content.slice(0, 100) + "...";

          results.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            sectionId: sub.id,
            sectionTitle: sub.title,
            preview,
          });
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 dark:bg-black/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-claude-darkSurface border border-claude-border dark:border-claude-darkBorder rounded-xl shadow-claude-lg w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-claude-border dark:border-claude-darkBorder gap-3">
          <Search className="w-4 h-4 text-claude-muted shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search architectural treatises, formulas, SDLC models, or metrics..."
            className="w-full bg-transparent text-sm font-sans placeholder:text-claude-muted text-claude-ink dark:text-white focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded hover:bg-claude-bgSubtle text-claude-muted"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-claude-muted bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated rounded border border-claude-border dark:border-claude-darkBorder">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-claude-border/40 dark:divide-claude-darkBorder/40">
          {q.length <= 1 && (
            <div className="p-8 text-center text-xs text-claude-muted">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-claude-clay" />
              <span>Type at least 2 characters to search across all treatises and KaTeX formulas...</span>
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {["COCOMO", "Cyclomatic", "Cohesion", "Coupling", "GitHub Pages", "Spiral", "ISO 9001"].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-2 py-1 rounded bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated text-claude-ink dark:text-gray-200 border border-claude-border dark:border-claude-darkBorder text-xs hover:border-claude-clay font-mono"
                  >
                    #{sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q.length > 1 && results.length === 0 && (
            <div className="p-8 text-center text-xs text-claude-muted font-sans">
              No matching treatises or formulas found for &quot;{query}&quot;.
            </div>
          )}

          {results.map((res, i) => (
            <button
              key={i}
              onClick={() => {
                onSelectSection(res.moduleId, res.sectionId);
                onClose();
              }}
              className="w-full text-left p-3 rounded-md hover:bg-claude-bgSubtle dark:hover:bg-claude-darkSurfaceElevated transition-colors flex items-start justify-between group"
            >
              <div className="space-y-1 pr-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-claude-clay dark:text-[#E89274] font-medium">
                    {res.moduleTitle.split(":")[0]}
                  </span>
                  <span className="text-claude-muted text-xs">/</span>
                  <span className="text-xs font-serif font-medium text-claude-ink dark:text-white">
                    {res.sectionTitle}
                  </span>
                </div>
                <p className="text-xs text-claude-muted dark:text-claude-darkMuted line-clamp-2 font-sans">{res.preview}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-claude-muted group-hover:text-claude-clay shrink-0 transition-transform group-hover:translate-x-0.5 mt-1" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border-t border-claude-border dark:border-claude-darkBorder flex items-center justify-between text-[11px] font-mono text-claude-muted">
          <span>{results.length} search results found</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3 text-claude-clay" /> to inspect
          </span>
        </div>
      </div>
    </div>
  );
}
