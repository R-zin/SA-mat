"use client";

import React from "react";
import { Clock, BookMarked, Download, Sparkles, ExternalLink, Calculator, Terminal } from "lucide-react";
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
    <aside className="w-64 shrink-0 hidden xl:flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 border-l border-nordic-hairline dark:border-nordic-hairlineDark bg-white/70 dark:bg-nordic-darkBg/70 transition-colors">
      <div>
        {/* Read Time & Rigor */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-nordic-hairline dark:border-nordic-hairlineDark text-xs font-mono text-nordic-slate">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-nordic-pine" />
            <span>{module.readTime}</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-nordic-frost dark:bg-nordic-darkSurfaceElevated font-semibold">
            {module.ects}
          </span>
        </div>

        {/* On This Page Table of Contents */}
        <div className="mb-6">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-nordic-slate font-bold mb-2 flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5 text-nordic-pine" />
            On This Page
          </h4>
          <ul className="space-y-1.5 text-xs font-sans">
            {module.subsections.map((sub) => {
              const isSelected = activeSectionId === sub.id;
              return (
                <li key={sub.id}>
                  <button
                    onClick={() => onSelectSection(sub.id)}
                    className={`text-left w-full truncate py-1 transition-colors flex items-center gap-2 ${
                      isSelected
                        ? "text-nordic-pine dark:text-green-300 font-semibold"
                        : "text-nordic-slate hover:text-nordic-spruce dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isSelected ? "bg-nordic-pine" : "bg-transparent"
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
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-nordic-slate font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-nordic-amber" />
            Study Flashcards
          </h4>
          <FlashcardWidget />
        </div>

        {/* Source Lecture PDF Card */}
        <div className="p-3 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark text-xs">
          <div className="font-mono text-[10px] text-nordic-slate uppercase mb-1">Source Lecture Reference</div>
          <p className="font-serif font-bold text-nordic-spruce dark:text-gray-100 truncate mb-2">
            {module.sourceSlide}
          </p>
          <a
            href={module.slideUrl}
            download
            className="flex items-center justify-between px-2.5 py-1.5 bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded hover:border-nordic-pine text-nordic-spruce dark:text-gray-200 transition-colors font-mono text-[11px]"
          >
            <span className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-nordic-pine" />
              Download Slide
            </span>
            <ExternalLink className="w-3 h-3 text-nordic-slate" />
          </a>
        </div>
      </div>

      {/* Deploy Helper Button */}
      <div className="pt-3 border-t border-nordic-hairline dark:border-nordic-hairlineDark">
        <button
          onClick={onOpenDeployGuide}
          className="w-full py-2 px-3 bg-nordic-polar text-white rounded-lg text-xs font-mono font-medium hover:bg-nordic-spruce transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <Terminal className="w-4 h-4 text-green-300" />
          <span>GitHub Pages CI/CD Guide</span>
        </button>
      </div>
    </aside>
  );
}
