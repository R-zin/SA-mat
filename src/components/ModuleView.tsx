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
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { ModuleData, MODULES } from "@/data/modules";
import { MathDisplay, FormattedProse } from "./MathDisplay";
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
      <header className="mb-10 pb-8 border-b border-claude-border dark:border-claude-darkBorder">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-claude-claySubtle text-claude-clay dark:text-[#E89274] border border-claude-clayBorder">
            Module 0{module.number} • {module.ects}
          </span>
          <span className="text-claude-muted text-xs">•</span>
          <span className="text-xs font-mono text-claude-muted dark:text-claude-darkMuted">
            CSE312 Architecture Treatise
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-claude-ink dark:text-claude-darkText tracking-tight leading-tight mb-4">
          {module.title}
        </h1>

        <p className="font-sans text-base sm:text-lg text-claude-muted dark:text-claude-darkMuted leading-relaxed mb-6 font-normal">
          {module.summary}
        </p>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-claude-muted dark:text-claude-darkMuted pt-3 border-t border-claude-border/60 dark:border-claude-darkBorder/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-claude-clay" />
            <span>Curriculum: CSE312 Spring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-claude-clay" />
            <span>{module.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-claude-clay" />
            <span>Faculty: Prof. Anitha Ambat (IIIT Kottayam)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-claude-moss" />
            <span>ISO 25010 Conforming</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {module.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] font-mono bg-claude-bgSubtle dark:bg-claude-darkSurface border border-claude-border dark:border-claude-darkBorder text-claude-muted dark:text-claude-darkMuted rounded-sm"
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
            <div className="flex items-center gap-2 pb-2 border-b border-claude-border/60 dark:border-claude-darkBorder/60">
              <span className="w-2 h-2 rounded-full bg-claude-clay" />
              <h2 className="font-serif text-2xl font-normal text-claude-ink dark:text-claude-darkText">
                {sub.title}
              </h2>
            </div>

            {/* Sub-section Prose with KaTeX inline math parsing */}
            <div className="text-claude-text dark:text-claude-darkText text-sm sm:text-base leading-relaxed font-sans font-normal">
              <FormattedProse content={sub.content} />
            </div>

            {/* LaTeX Mathematical Formula Block with KaTeX Display Mode */}
            {sub.formula && (
              <div className="p-5 rounded-lg bg-white dark:bg-claude-darkSurface border border-claude-border dark:border-claude-darkBorder text-center my-5 shadow-claude-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-claude-muted dark:text-claude-darkMuted mb-2">
                  Mathematical Formalization
                </div>
                <div className="py-2 text-claude-ink dark:text-claude-darkText overflow-x-auto">
                  <MathDisplay math={sub.formula.latex} displayMode={true} />
                </div>
                <div className="text-xs text-claude-muted dark:text-claude-darkMuted mt-2 font-sans border-t border-claude-border/40 dark:border-claude-darkBorder/40 pt-2">
                  <FormattedProse content={sub.formula.explanation} />
                </div>
              </div>
            )}

            {/* Claude-style Callout Box */}
            {sub.callout && (
              <div
                className={`p-4 rounded-md border-l-3 my-5 flex gap-3 text-xs leading-relaxed ${
                  sub.callout.type === "amber"
                    ? "bg-[#FFF9F5] dark:bg-[#261E1A] border-l-claude-clay text-[#612814] dark:text-[#F3BCA8] border border-claude-clayBorder"
                    : sub.callout.type === "spruce"
                    ? "bg-claude-bgSubtle dark:bg-claude-darkSurface border-l-claude-ink dark:border-l-claude-clay text-claude-ink dark:text-claude-darkText border border-claude-border dark:border-claude-darkBorder"
                    : "bg-[#F7FAF6] dark:bg-[#1B241A] border-l-claude-moss text-[#243321] dark:text-[#C4D9C0] border border-claude-mossBorder"
                }`}
              >
                {sub.callout.type === "amber" ? (
                  <AlertTriangle className="w-5 h-5 text-claude-clay shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-5 h-5 text-claude-clay shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-serif font-semibold text-xs mb-1 text-claude-ink dark:text-claude-darkText">
                    {sub.callout.title}
                  </h4>
                  <div className="font-sans">
                    <FormattedProse content={sub.callout.text} />
                  </div>
                </div>
              </div>
            )}

            {/* Code Snippet Box */}
            {sub.codeSnippet && (
              <div className="rounded-lg overflow-hidden border border-claude-border dark:border-claude-darkBorder bg-[#23201C] text-[#EAE5DD] my-5 shadow-claude-sm">
                <div className="px-4 py-2 bg-[#1A1815] border-b border-[#35302B] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A39B91] text-[11px]">
                    {sub.codeSnippet.caption || sub.codeSnippet.language.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleCopy(sub.codeSnippet!.code, sub.id)}
                    className="flex items-center gap-1 text-[11px] text-[#A39B91] hover:text-white transition-colors"
                  >
                    {copiedSnippet === sub.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-claude-clay" />
                        <span className="text-claude-clay">Copied!</span>
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
              <div className="overflow-x-auto my-5 border border-claude-border dark:border-claude-darkBorder rounded-lg bg-white dark:bg-claude-darkSurface shadow-claude-sm">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border-b border-claude-border dark:border-claude-darkBorder text-claude-muted dark:text-claude-darkMuted font-mono">
                    <tr>
                      {sub.table.headers.map((h, hi) => (
                        <th key={hi} className="p-3.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-claude-border/60 dark:divide-claude-darkBorder/60">
                    {sub.table.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="hover:bg-claude-bgSubtle/50 dark:hover:bg-claude-darkSurfaceElevated/50 transition-colors"
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`p-3.5 ${
                              ci === 0
                                ? "font-medium text-claude-ink dark:text-white"
                                : "text-claude-muted dark:text-claude-darkMuted"
                            }`}
                          >
                            <FormattedProse content={String(cell)} />
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
      <footer className="mt-16 pt-8 border-t border-claude-border dark:border-claude-darkBorder flex items-center justify-between text-xs font-sans">
        {prevModule ? (
          <button
            onClick={() => {
              onNavigateModule(prevModule.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-claude-muted dark:text-claude-darkMuted hover:text-claude-clay dark:hover:text-[#E89274] transition-colors group text-left"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <div>
              <span className="text-[10px] font-mono text-claude-muted dark:text-claude-darkMuted block">
                Previous Treatise
              </span>
              <span className="font-medium text-claude-ink dark:text-white">
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
            className="flex items-center gap-2 text-claude-muted dark:text-claude-darkMuted hover:text-claude-clay dark:hover:text-[#E89274] transition-colors group text-right"
          >
            <div>
              <span className="text-[10px] font-mono text-claude-muted dark:text-claude-darkMuted block">
                Next Treatise
              </span>
              <span className="font-medium text-claude-ink dark:text-white">
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
