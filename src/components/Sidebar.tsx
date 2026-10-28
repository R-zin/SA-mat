"use client";

import React, { useState } from "react";
import {
  Layers,
  FileText,
  RefreshCw,
  Cpu,
  GitBranch,
  ShieldCheck,
  Calculator,
  Award,
  Terminal,
  Filter,
  CheckCircle2,
  BookOpen,
  Download,
  FolderArchive,
} from "lucide-react";
import { MODULES } from "@/data/modules";

interface SidebarProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  onSelectSection: (moduleId: string, sectionId: string) => void;
}

const MODULE_ICONS = [
  FileText,     // 1. SDLC
  BookOpen,     // 2. Reqs Eng
  RefreshCw,    // 3. Agile
  Cpu,          // 4. Arch Design
  Layers,       // 5. Cohesion & Coupling
  GitBranch,    // 6. Testing & Debugging
  Calculator,   // 7. Project Management
  Award,        // 8. SQA & ISO/CMM
  Terminal,     // 9. GitHub Pages Deploy
];

export default function Sidebar({ activeModuleId, onSelectModule, onSelectSection }: SidebarProps) {
  const [filterText, setFilterText] = useState("");

  const filteredModules = MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(filterText.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(filterText.toLowerCase()))
  );

  return (
    <aside className="w-72 shrink-0 bg-claude-bgSubtle/70 dark:bg-claude-darkSurface/70 border-r border-claude-border dark:border-claude-darkBorder flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 transition-colors">
      <div>
        {/* Course Header Widget */}
        <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-claude-border dark:border-claude-darkBorder">
          <div className="w-8 h-8 rounded-md bg-claude-clay text-white flex items-center justify-center font-serif font-bold text-xs shadow-claude-sm">
            312
          </div>
          <div>
            <h2 className="font-serif text-sm font-semibold text-claude-ink dark:text-white leading-tight">
              Software Architecture
            </h2>
            <p className="text-[10px] font-mono text-claude-muted dark:text-claude-darkMuted">
              Academic Monograph • 4.0 ECTS
            </p>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative mb-3">
          <Filter className="w-3.5 h-3.5 text-claude-muted absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search syllabus index..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder rounded-md placeholder:text-claude-muted text-claude-ink dark:text-white focus:outline-hidden focus:border-claude-clay font-sans shadow-claude-sm"
          />
        </div>

        {/* Modules Tree */}
        <nav className="space-y-1">
          {filteredModules.map((mod) => {
            const Icon = MODULE_ICONS[(mod.number - 1) % MODULE_ICONS.length];
            const isActive = activeModuleId === mod.id;

            return (
              <div key={mod.id} className="space-y-0.5">
                <button
                  onClick={() => onSelectModule(mod.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors text-xs ${
                    isActive
                      ? "bg-white dark:bg-claude-darkSurfaceElevated text-claude-clay dark:text-[#E89274] font-medium border-l-2 border-claude-clay shadow-claude-sm"
                      : "text-claude-muted dark:text-claude-darkMuted hover:text-claude-ink dark:hover:text-white hover:bg-white/60 dark:hover:bg-claude-darkSurfaceElevated/50"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-1">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-claude-clay" : "text-claude-muted"}`} />
                    <span className="truncate">
                      {mod.number}. {mod.shortTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80 shrink-0">
                    M0{mod.number}
                  </span>
                </button>

                {/* Subsections if active */}
                {isActive && (
                  <div className="ml-5 pl-3 border-l border-claude-border dark:border-claude-darkBorder py-1 space-y-1">
                    {mod.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onSelectSection(mod.id, sub.id)}
                        className="block w-full text-left text-[11px] text-claude-muted dark:text-claude-darkMuted hover:text-claude-clay dark:hover:text-[#E89274] transition-colors py-0.5 truncate"
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Exam Readiness Tracker Widget */}
        <div className="mt-5 p-3 rounded-md border border-claude-border dark:border-claude-darkBorder bg-white dark:bg-claude-darkSurface shadow-claude-sm">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-claude-muted dark:text-claude-darkMuted font-medium">Syllabus Invariants</span>
            <span className="font-semibold text-claude-clay dark:text-[#E89274]">100% Verified</span>
          </div>
          <div className="w-full bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-claude-clay h-full rounded-full w-full" />
          </div>
          <p className="text-[10px] text-claude-muted dark:text-claude-darkMuted leading-tight font-sans">
            Full corpus synthesis across 10 official slides with KaTeX mathematical proofs.
          </p>
        </div>
      </div>

      {/* Footer Resources */}
      <div className="pt-3 border-t border-claude-border dark:border-claude-darkBorder space-y-1 text-xs">
        <a
          href="slides/Part%201.pdf"
          download
          className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-white dark:hover:bg-claude-darkSurface text-claude-muted hover:text-claude-ink dark:hover:text-white transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-claude-clay" />
          <span>Lecture Decks (PDF)</span>
        </a>
        <a
          href="https://github.com/R-zin/SA-mat"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-white dark:hover:bg-claude-darkSurface text-claude-muted hover:text-claude-ink dark:hover:text-white transition-colors"
        >
          <FolderArchive className="w-3.5 h-3.5 text-claude-moss" />
          <span>Git Repository</span>
        </a>
      </div>
    </aside>
  );
}
