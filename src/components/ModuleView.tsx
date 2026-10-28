"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { ModuleData, MODULES } from "@/data/modules";
import InteractiveCocomo from "./InteractiveCocomo";
import InteractiveCyclomatic from "./InteractiveCyclomatic";
import InteractiveFunctionPoints from "./InteractiveFunctionPoints";
import ArchitectureDiagrams from "./ArchitectureDiagrams";
import DeploymentGuide from "./DeploymentGuide";

interface ModuleViewProps {
  module: ModuleData;
  onNavigateModule: (id: string) => void;
}

export default function ModuleView({ module, onNavigateModule }: ModuleViewProps) {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const currentIndex = MODULES.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? MODULES[currentIndex - 1] : null;
  const nextModule = currentIndex < MODULES.length - 1 ? MODULES[currentIndex + 1] : null;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  return (
    <article className="flex-1 min-w-0 max-w-4xl mx-auto px-4 sm:px-8 py-8 transition-colors">
      {/* Module Hero Banner */}
      <header className="mb-10 pb-8 border-b border-nordic-hairline dark:border-nordic-hairlineDark">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-nordic-pineBg text-nordic-pine dark:text-green-300 border border-nordic-pine/30">
            Module 0{module.number} • {module.ects}
          </span>
          <span className="text-nordic-slate text-xs">•</span>
          <span className="text-xs font-mono text-nordic-slate">CSE312 Architecture Reference</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-nordic-spruce dark:text-white tracking-tight leading-tight mb-4">
          {module.title}
        </h1>

        <p className="font-sans text-base sm:text-lg text-nordic-slate dark:text-gray-300 leading-relaxed mb-6">
          {module.summary}
        </p>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-nordic-slate pt-3 border-t border-nordic-hairline/60 dark:border-nordic-hairlineDark/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-nordic-pine" />
            <span>Curriculum: CSE312 Spring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-nordic-pine" />
            <span>{module.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-nordic-pine" />
            <span>Faculty: Prof. Anitha Ambat (IIIT Kottayam)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-nordic-pine" />
            <span>IEEE / ISO 25010 Grounded</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {module.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] font-mono bg-nordic-frost dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark text-nordic-slate rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Embedded Interactive Tools for Specific Modules */}
      {module.id === "architectural-design" && <ArchitectureDiagrams />}
      {module.id === "testing-debugging" && <InteractiveCyclomatic />}
      {module.id === "project-management" && (
        <>
          <InteractiveCocomo />
          <InteractiveFunctionPoints />
        </>
      )}
      {module.id === "github-pages-guide" && <DeploymentGuide />}

      {/* Subsections Content */}
      <div className="space-y-12">
        {module.subsections.map((sub) => (
          <section key={sub.id} id={sub.id} className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-nordic-hairline/60 dark:border-nordic-hairlineDark/60">
              <span className="w-2 h-2 rounded-full bg-nordic-pine" />
              <h2 className="font-serif text-2xl font-bold text-nordic-spruce dark:text-gray-100">
                {sub.title}
              </h2>
            </div>

            {/* Sub-section Prose */}
            <div className="prose dark:prose-invert max-w-none text-nordic-spruce dark:text-gray-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
              {sub.content}
            </div>

            {/* LaTeX Mathematical Formula Block */}
            {sub.formula && (
              <div className="p-4 rounded-lg bg-nordic-frost dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark text-center my-4">
                <div className="font-mono text-base font-bold text-nordic-pine dark:text-green-300">
                  {sub.formula.latex}
                </div>
                <div className="text-xs text-nordic-slate mt-1.5 font-sans">
                  {sub.formula.explanation}
                </div>
              </div>
            )}

            {/* Callout Alert */}
            {sub.callout && (
              <div
                className={`p-4 rounded-lg border-l-4 my-4 flex gap-3 text-xs leading-relaxed ${
                  sub.callout.type === "amber"
                    ? "bg-amber-50 dark:bg-amber-950/30 border-l-nordic-amber text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/50"
                    : sub.callout.type === "spruce"
                    ? "bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border-l-nordic-polar text-nordic-spruce dark:text-gray-200 border border-nordic-hairline dark:border-nordic-hairlineDark"
                    : "bg-emerald-50 dark:bg-emerald-950/30 border-l-nordic-pine text-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900/50"
                }`}
              >
                {sub.callout.type === "amber" ? (
                  <AlertTriangle className="w-5 h-5 text-nordic-amber shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb className="w-5 h-5 text-nordic-pine shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-sans font-bold text-xs mb-1">
                    {sub.callout.title}
                  </h4>
                  <p>{sub.callout.text}</p>
                </div>
              </div>
            )}

            {/* Code Snippet Box */}
            {sub.codeSnippet && (
              <div className="rounded-lg overflow-hidden border border-nordic-spruceDark dark:border-nordic-hairlineDark bg-nordic-spruceDark dark:bg-black text-gray-200 my-4 shadow-xs">
                <div className="px-3.5 py-1.5 bg-nordic-polar/80 dark:bg-zinc-900 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-nordic-slate text-[11px]">
                    {sub.codeSnippet.caption || sub.codeSnippet.language.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleCopy(sub.codeSnippet!.code, sub.id)}
                    className="flex items-center gap-1 text-[11px] text-nordic-slate hover:text-white transition-colors"
                  >
                    {copiedSnippet === sub.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-nordic-pine" />
                        <span className="text-nordic-pine">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                  <code>{sub.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Comparison / Metric Table */}
            {sub.table && (
              <div className="overflow-x-auto my-4 border border-nordic-hairline dark:border-nordic-hairlineDark rounded-lg">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border-b border-nordic-hairline dark:border-nordic-hairlineDark text-nordic-slate font-mono">
                    <tr>
                      {sub.table.headers.map((h, hi) => (
                        <th key={hi} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-nordic-hairline/60 dark:divide-nordic-hairlineDark/60">
                    {sub.table.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="hover:bg-nordic-frost/40 dark:hover:bg-nordic-darkSurfaceElevated/40"
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`p-3 ${
                              ci === 0
                                ? "font-semibold text-nordic-spruce dark:text-white"
                                : "text-nordic-slate dark:text-gray-300"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Navigation Footer */}
      <footer className="mt-16 pt-8 border-t border-nordic-hairline dark:border-nordic-hairlineDark flex items-center justify-between text-xs font-sans">
        {prevModule ? (
          <button
            onClick={() => {
              onNavigateModule(prevModule.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-nordic-slate hover:text-nordic-pine transition-colors group text-left"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <div>
              <span className="text-[10px] font-mono text-nordic-slate block">Previous Module</span>
              <span className="font-semibold text-nordic-spruce dark:text-white">
                M0{prevModule.number}: {prevModule.shortTitle}
              </span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextModule && (
          <button
            onClick={() => {
              onNavigateModule(nextModule.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-nordic-slate hover:text-nordic-pine transition-colors group text-right"
          >
            <div>
              <span className="text-[10px] font-mono text-nordic-slate block">Next Module</span>
              <span className="font-semibold text-nordic-spruce dark:text-white">
                M0{nextModule.number}: {nextModule.shortTitle}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </footer>
    </article>
  );
}
