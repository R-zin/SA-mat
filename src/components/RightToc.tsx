"use client";

import React from "react";
import { Clock, BookMarked, Download, Sparkles, ExternalLink, Terminal } from "lucide-react";
import { ModuleData } from "@/data/modules";
import FlashcardWidget from "./FlashcardWidget";

interface RightTocProps {
  module: ModuleData;
  activeSectionId?: string;
  onSelectSection: (sectionId: string) => void;
  onOpenDeployGuide: () => void;
}

export default function RightToc({
  module,
  activeSectionId,
  onSelectSection,
  onOpenDeployGuide,
}: RightTocProps) {
  return (
    <aside className="w-64 shrink-0 hidden xl:flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 border-l border-claude-border dark:border-claude-darkBorder bg-claude-bg/60 dark:bg-claude-darkBg/60 transition-colors">
      <div>
        {/* Read Time & Rigor */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-claude-border dark:border-claude-darkBorder text-xs font-mono text-claude-muted dark:text-claude-darkMuted">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-claude-clay" />
            <span>{module.readTime}</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder font-medium">
            {module.ects}
          </span>
        </div>

        {/* On This Page Table of Contents */}
        <div className="mb-6">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-claude-muted dark:text-claude-darkMuted font-semibold mb-2 flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5 text-claude-clay" />
            On This Page
          </h4>
          <ul className="space-y-1 text-xs font-sans">
            {module.subsections.map((sub) => {
              const isSelected = activeSectionId === sub.id;
              return (
                <li key={sub.id}>
                  <button
                    onClick={() => onSelectSection(sub.id)}
                    className={`text-left w-full truncate py-1 transition-colors flex items-center gap-2 ${
                      isSelected
                        ? "text-claude-clay dark:text-[#E89274] font-medium"
                        : "text-claude-muted dark:text-claude-darkMuted hover:text-claude-ink dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isSelected ? "bg-claude-clay" : "bg-transparent"
                      }`}
                    />
                    <span className="truncate">{sub.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Flashcard Tool */}
        <div className="mb-6">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-claude-muted dark:text-claude-darkMuted font-semibold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-claude-clay" />
            Active Recall Flashcards
          </h4>
          <FlashcardWidget />
        </div>

        {/* Source Lecture PDF Card */}
        <div className="p-3 bg-white dark:bg-claude-darkSurface rounded-md border border-claude-border dark:border-claude-darkBorder text-xs shadow-claude-sm">
          <div className="font-mono text-[10px] text-claude-muted dark:text-claude-darkMuted uppercase mb-1">
            Archival Slide Reference
          </div>
          <p className="font-serif font-medium text-claude-ink dark:text-gray-100 truncate mb-2">
            {module.sourceSlide}
          </p>
          <a
            href={module.slideUrl}
            download
            className="flex items-center justify-between px-2.5 py-1.5 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder rounded hover:border-claude-clay text-claude-ink dark:text-gray-200 transition-colors font-mono text-[11px]"
          >
            <span className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-claude-clay" />
              Download Slide
            </span>
            <ExternalLink className="w-3 h-3 text-claude-muted" />
          </a>
        </div>
      </div>

      {/* Deploy Helper Button */}
      <div className="pt-3 border-t border-claude-border dark:border-claude-darkBorder">
        <button
          onClick={onOpenDeployGuide}
          className="w-full py-2 px-3 bg-claude-ink dark:bg-claude-darkSurfaceElevated text-white rounded-md text-xs font-mono font-medium hover:bg-claude-clay transition-all flex items-center justify-center gap-2 shadow-claude-sm border border-transparent hover:border-claude-clay"
        >
          <Terminal className="w-3.5 h-3.5 text-claude-clay" />
          <span>GitHub Pages CI/CD Guide</span>
        </button>
      </div>
    </aside>
  );
}
