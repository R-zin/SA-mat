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
    <aside className="w-72 shrink-0 bg-nordic-frost/60 dark:bg-nordic-darkSurface/60 border-r border-nordic-hairline dark:border-nordic-hairlineDark flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 transition-colors">
      <div>
        {/* Course Header Widget */}
        <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-nordic-hairline dark:border-nordic-hairlineDark">
          <div className="w-8 h-8 rounded-lg bg-nordic-pine text-white flex items-center justify-center font-bold text-xs">
            312
          </div>
          <div>
            <h2 className="font-serif text-sm font-bold text-nordic-spruce dark:text-white leading-tight">
              Software Architecture
            </h2>
            <p className="text-[10px] font-mono text-nordic-slate">
              Principles &amp; Practices • 4.0 ECTS
            </p>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative mb-3">
          <Filter className="w-3.5 h-3.5 text-nordic-slate absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Filter syllabus modules..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark rounded-md placeholder:text-nordic-slate text-nordic-spruce dark:text-white focus:outline-hidden focus:border-nordic-pine font-sans"
          />
        </div>

        {/* Modules Tree */}
        <nav className="space-y-1">
          {filteredModules.map((mod, index) => {
            const Icon = MODULE_ICONS[(mod.number - 1) % MODULE_ICONS.length];
            const isActive = activeModuleId === mod.id;

            return (
              <div key={mod.id} className="space-y-0.5">
                <button
                  onClick={() => onSelectModule(mod.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors text-xs ${
                    isActive
                      ? "bg-white dark:bg-nordic-darkSurfaceElevated text-nordic-pine dark:text-green-300 font-semibold border-l-2 border-nordic-pine shadow-2xs"
                      : "text-nordic-slate hover:text-nordic-spruce dark:hover:text-white hover:bg-white/60 dark:hover:bg-nordic-darkSurface/60"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-1">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-nordic-pine" : "text-nordic-slate"}`} />
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
                  <div className="ml-5 pl-3 border-l border-nordic-hairline dark:border-nordic-hairlineDark py-1 space-y-1">
                    {mod.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onSelectSection(mod.id, sub.id)}
                        className="block w-full text-left text-[11px] text-nordic-slate hover:text-nordic-pine dark:hover:text-green-300 transition-colors py-0.5 truncate"
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
        <div className="mt-5 p-3 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark bg-white dark:bg-nordic-darkSurface">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-nordic-slate font-medium">Exam Coverage Index</span>
            <span className="font-bold text-nordic-pine dark:text-green-300">100% Core</span>
          </div>
          <div className="w-full bg-nordic-frost dark:bg-nordic-darkSurfaceElevated h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-nordic-pine h-full rounded-full w-full" />
          </div>
          <p className="text-[10px] text-nordic-slate leading-tight">
            10 PDF lecture slides synthesized with formulas, proofs, and CI/CD manual.
          </p>
        </div>
      </div>

      {/* Footer Resources */}
      <div className="pt-3 border-t border-nordic-hairline dark:border-nordic-hairlineDark space-y-1.5 text-xs">
        <a
          href="slides/Part%201.pdf"
          download
          className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-white dark:hover:bg-nordic-darkSurface text-nordic-slate hover:text-nordic-spruce dark:hover:text-white transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-nordic-pine" />
          <span>Original Slides (PDF)</span>
        </a>
        <a
          href="https://github.com/R-zin/SA-mat"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-white dark:hover:bg-nordic-darkSurface text-nordic-slate hover:text-nordic-spruce dark:hover:text-white transition-colors"
        >
          <FolderArchive className="w-3.5 h-3.5 text-nordic-amber" />
          <span>Repository Git Trunk</span>
        </a>
      </div>
    </aside>
  );
}
