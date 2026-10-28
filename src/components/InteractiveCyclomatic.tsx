"use client";

import React, { useState } from "react";
import { GitBranch, ShieldCheck, AlertCircle, Cpu, Network } from "lucide-react";

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
        color: "text-nordic-pine bg-nordic-pineBg border-nordic-pine",
        recommendation: "Well-structured procedure. 100% basis path coverage is easily achievable.",
      };
    } else if (val <= 20) {
      return {
        label: "Moderate Risk • Moderately Complex",
        color: "text-nordic-amber bg-nordic-amber/10 border-nordic-amber",
        recommendation: "Refactoring into smaller helper sub-routines recommended.",
      };
    } else {
      return {
        label: "High / Severe Risk • Untestable",
        color: "text-red-700 bg-red-100 border-red-500 dark:bg-red-950 dark:text-red-300",
        recommendation: "Crucial violation of structured design. Immediate decomposition mandatory.",
      };
    }
  };

  const risk = getRiskStatus(vgByFormula1);

  return (
    <div className="bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded-lg p-6 shadow-sm my-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-nordic-hairline dark:border-nordic-hairlineDark gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-nordic-pineBg text-nordic-pine">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-nordic-spruce dark:text-gray-100">
              McCabe Cyclomatic Complexity & CFG Explorer
            </h3>
            <p className="text-xs text-nordic-slate">
              Graph theory verification of basis execution paths and branch coverage bounds
            </p>
          </div>
        </div>
        <div className={`px-2.5 py-1 text-xs font-mono font-semibold rounded border ${risk.color}`}>
          {risk.label}
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark">
        <div>
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-nordic-slate">Edges (E) in CFG:</span>
            <span className="font-bold text-nordic-spruce dark:text-white">{edges}</span>
          </div>
          <input
            type="range"
            min="4"
            max="40"
            value={edges}
            onChange={(e) => setEdges(Number(e.target.value))}
            className="w-full h-2 bg-nordic-hairline dark:bg-nordic-hairlineDark rounded-lg appearance-none cursor-pointer accent-nordic-pine"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-nordic-slate">Nodes (N) in CFG:</span>
            <span className="font-bold text-nordic-spruce dark:text-white">{nodes}</span>
          </div>
          <input
            type="range"
            min="3"
            max="30"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
            className="w-full h-2 bg-nordic-hairline dark:bg-nordic-hairlineDark rounded-lg appearance-none cursor-pointer accent-nordic-polar"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-nordic-slate">Decision Predicates (P):</span>
            <span className="font-bold text-nordic-amber">{predicates}</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={predicates}
            onChange={(e) => setPredicates(Number(e.target.value))}
            className="w-full h-2 bg-nordic-hairline dark:bg-nordic-hairlineDark rounded-lg appearance-none cursor-pointer accent-nordic-amber"
          />
        </div>
      </div>

      {/* Visual Calculation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark bg-white dark:bg-nordic-darkSurface">
          <div className="text-xs font-mono text-nordic-slate mb-1">Method 1: Graph-Theoretic Formula</div>
          <div className="text-sm font-mono font-semibold text-nordic-spruce dark:text-gray-200">
            V(G) = E − N + 2(P)
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-nordic-pine">
            {edges} − {nodes} + 2({connected}) ={" "}
            <span className="text-3xl font-extrabold text-nordic-spruce dark:text-white">{vgByFormula1}</span>
          </div>
          <div className="text-[11px] text-nordic-slate mt-1 font-sans">
            Guarantees exactly {vgByFormula1} linearly independent basis paths.
          </div>
        </div>

        <div className="p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark bg-white dark:bg-nordic-darkSurface">
          <div className="text-xs font-mono text-nordic-slate mb-1">Method 2: Predicate Node Counting</div>
          <div className="text-sm font-mono font-semibold text-nordic-spruce dark:text-gray-200">
            V(G) = Number of Predicate Nodes + 1
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-nordic-amber">
            {predicates} + 1 ={" "}
            <span className="text-3xl font-extrabold text-nordic-spruce dark:text-white">{vgByFormula2}</span>
          </div>
          <div className="text-[11px] text-nordic-slate mt-1 font-sans">
            Counts branch points: if, while, for, and each boolean short-circuit condition.
          </div>
        </div>
      </div>

      {/* Code Sample Demonstration */}
      <div className="p-3.5 bg-nordic-spruceDark dark:bg-black text-gray-200 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-nordic-hairlineDark">
        <div className="text-nordic-slate text-[11px] mb-2 flex items-center justify-between">
          <span>Control Flow Graph (CFG) Node Mapping Demo</span>
          <span className="text-nordic-pine font-semibold">McCabe Target: V(G) ≤ 10</span>
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

      <p className="text-xs text-nordic-slate mt-3 italic">
        {risk.recommendation}
      </p>
    </div>
  );
}
