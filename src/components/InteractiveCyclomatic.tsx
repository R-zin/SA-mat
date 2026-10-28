"use client";

import React, { useState } from "react";
import { GitBranch, ShieldCheck, AlertCircle, Cpu, Network } from "lucide-react";
import { MathDisplay } from "./MathDisplay";

export default function InteractiveCyclomatic() {
  const [edges, setEdges] = useState<number>(14);
  const [nodes, setNodes] = useState<number>(11);
  const [predicates, setPredicates] = useState<number>(4);
  const [connected, setConnected] = useState<number>(1);

  // Cyclomatic calculation
  const vgByFormula1 = edges - nodes + 2 * connected;
  const vgByFormula2 = predicates + 1;

  const getRiskStatus = (val: number) => {
    if (val <= 10) {
      return {
        label: "Low Risk • High Testability",
        color: "text-claude-moss bg-claude-mossSubtle border-claude-mossBorder",
        recommendation: "Well-structured procedure. 100% basis path branch coverage is easily achievable.",
      };
    } else if (val <= 20) {
      return {
        label: "Moderate Risk • Moderately Complex",
        color: "text-claude-clay bg-claude-claySubtle border-claude-clayBorder",
        recommendation: "Refactoring into smaller helper sub-routines recommended.",
      };
    } else {
      return {
        label: "High / Severe Risk • Untestable",
        color: "text-red-700 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
        recommendation: "Severe violation of structured design. Immediate decomposition mandatory.",
      };
    }
  };

  const risk = getRiskStatus(vgByFormula1);

  return (
    <div className="bg-white dark:bg-claude-darkSurface border border-claude-border dark:border-claude-darkBorder rounded-lg p-6 shadow-claude-sm my-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-claude-border dark:border-claude-darkBorder gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-claude-claySubtle text-claude-clay border border-claude-clayBorder">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-claude-ink dark:text-white">
              McCabe Cyclomatic Complexity &amp; CFG Formalism
            </h3>
            <p className="text-xs text-claude-muted dark:text-claude-darkMuted">
              Graph-theoretic derivation of linearly independent basis execution paths
            </p>
          </div>
        </div>
        <div className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border ${risk.color}`}>
          {risk.label}
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated p-4 rounded-md border border-claude-border dark:border-claude-darkBorder">
        <div>
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-claude-muted dark:text-claude-darkMuted">Edges (E) in CFG:</span>
            <span className="font-medium text-claude-ink dark:text-white">{edges}</span>
          </div>
          <input
            type="range"
            min="4"
            max="40"
            value={edges}
            onChange={(e) => setEdges(Number(e.target.value))}
            className="w-full h-1.5 bg-claude-border dark:bg-claude-darkBorder rounded-lg appearance-none cursor-pointer accent-claude-clay"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-claude-muted dark:text-claude-darkMuted">Nodes (N) in CFG:</span>
            <span className="font-medium text-claude-ink dark:text-white">{nodes}</span>
          </div>
          <input
            type="range"
            min="3"
            max="30"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
            className="w-full h-1.5 bg-claude-border dark:bg-claude-darkBorder rounded-lg appearance-none cursor-pointer accent-claude-moss"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-claude-muted dark:text-claude-darkMuted">Decision Predicates (P):</span>
            <span className="font-medium text-claude-clay">{predicates}</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={predicates}
            onChange={(e) => setPredicates(Number(e.target.value))}
            className="w-full h-1.5 bg-claude-border dark:bg-claude-darkBorder rounded-lg appearance-none cursor-pointer accent-claude-clay"
          />
        </div>
      </div>

      {/* Visual Calculation Cards with KaTeX Math Rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-md border border-claude-border dark:border-claude-darkBorder bg-white dark:bg-claude-darkSurface shadow-claude-sm">
          <div className="text-xs font-mono text-claude-muted dark:text-claude-darkMuted mb-1">
            Theorem 1: Graph-Theoretic Euler Formula
          </div>
          <div className="py-1">
            <MathDisplay math="V(G) = E - N + 2P" displayMode={false} className="text-sm font-serif" />
          </div>
          <div className="mt-2 text-xl font-serif text-claude-ink dark:text-white flex items-center gap-2">
            <span>{edges} − {nodes} + 2({connected}) =</span>
            <span className="text-2xl font-bold text-claude-clay">{vgByFormula1}</span>
          </div>
          <div className="text-[11px] text-claude-muted dark:text-claude-darkMuted mt-1 font-sans">
            Guarantees exactly {vgByFormula1} linearly independent basis paths.
          </div>
        </div>

        <div className="p-4 rounded-md border border-claude-border dark:border-claude-darkBorder bg-white dark:bg-claude-darkSurface shadow-claude-sm">
          <div className="text-xs font-mono text-claude-muted dark:text-claude-darkMuted mb-1">
            Theorem 2: Predicate Node Counting
          </div>
          <div className="py-1">
            <MathDisplay math="V(G) = P_{\text{predicates}} + 1" displayMode={false} className="text-sm font-serif" />
          </div>
          <div className="mt-2 text-xl font-serif text-claude-ink dark:text-white flex items-center gap-2">
            <span>{predicates} + 1 =</span>
            <span className="text-2xl font-bold text-claude-clay">{vgByFormula2}</span>
          </div>
          <div className="text-[11px] text-claude-muted dark:text-claude-darkMuted mt-1 font-sans">
            Counts branch points: if, while, for, and compound conditions.
          </div>
        </div>
      </div>

      {/* Code Sample Demonstration */}
      <div className="p-4 bg-[#23201C] text-[#EAE5DD] rounded-md font-mono text-xs overflow-x-auto leading-relaxed border border-claude-border dark:border-claude-darkBorder shadow-claude-sm">
        <div className="text-[#A39B91] text-[11px] mb-2 flex items-center justify-between">
          <span>Control Flow Graph (CFG) Node Mapping Demo</span>
          <span className="text-claude-clay font-medium">Standard Ceiling: V(G) ≤ 10</span>
        </div>
        <pre>
          <code>{`1: function evaluateCreditApplication(applicant) {
2:   if (!applicant.idVerified) return Status.REJECTED;         // Predicate 1
3:   if (applicant.score < 600 || applicant.hasDefaults) {      // Predicates 2 & 3
4:     logAuditFailure(applicant);
5:     return Status.REJECTED;
6:   }
7:   while (hasPendingInquiries(applicant)) {                   // Predicate 4
8:     resolveInquiryQueue(applicant);
9:   }
10:  return Status.APPROVED;
11: }`}</code>
        </pre>
      </div>

      <p className="text-xs text-claude-muted dark:text-claude-darkMuted mt-3 italic font-serif">
        Evaluation: {risk.recommendation}
      </p>
    </div>
  );
}
