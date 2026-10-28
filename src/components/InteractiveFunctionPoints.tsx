"use client";

import React, { useState } from "react";
import { Table, Layers, ArrowRight, CheckCircle2 } from "lucide-react";

type Complexity = "low" | "avg" | "high";

const WEIGHTS = {
  ilf: { low: 7, avg: 10, high: 15, label: "Internal Logical Files (ILF)" },
  eif: { low: 5, avg: 7, high: 10, label: "External Interface Files (EIF)" },
  ei: { low: 3, avg: 4, high: 6, label: "External Inputs (EI)" },
  eo: { low: 4, avg: 5, high: 7, label: "External Outputs (EO)" },
  eq: { low: 3, avg: 4, high: 6, label: "External Inquiries (EQ)" },
};

export default function InteractiveFunctionPoints() {
  const [counts, setCounts] = useState({
    ilf: 4,
    eif: 2,
    ei: 12,
    eo: 8,
    eq: 6,
  });

  const [complexities, setComplexities] = useState<Record<string, Complexity>>({
    ilf: "avg",
    eif: "avg",
    ei: "avg",
    eo: "avg",
    eq: "avg",
  });

  const [tdi, setTdi] = useState<number>(35); // Total degree of influence (0 to 70)

  // Calculations
  const calcRow = (key: keyof typeof WEIGHTS) => {
    const count = counts[key] || 0;
    const comp = complexities[key];
    const weight = WEIGHTS[key][comp];
    return count * weight;
  };

  const ufp =
    calcRow("ilf") +
    calcRow("eif") +
    calcRow("ei") +
    calcRow("eo") +
    calcRow("eq");

  const vaf = 0.65 + 0.01 * tdi;
  const fp = Math.round(ufp * vaf * 10) / 10;

  return (
    <div className="bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded-lg p-6 shadow-sm my-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-nordic-hairline dark:border-nordic-hairlineDark gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-nordic-frost dark:bg-nordic-darkSurfaceElevated text-nordic-spruce dark:text-white border border-nordic-hairline dark:border-nordic-hairlineDark">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-nordic-spruce dark:text-gray-100">
              Albrecht Function Point (FP) Calculator
            </h3>
            <p className="text-xs text-nordic-slate">
              Specification-based size metric independent of implementation programming language
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-nordic-slate">Formula:</span>{" "}
          <span className="text-xs font-mono font-bold text-nordic-pine">
            FP = UFP × [0.65 + 0.01 × ∑(Fi)]
          </span>
        </div>
      </div>

      {/* FP Table */}
      <div className="overflow-x-auto my-4 border border-nordic-hairline dark:border-nordic-hairlineDark rounded-lg">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border-b border-nordic-hairline dark:border-nordic-hairlineDark text-nordic-slate font-mono">
            <tr>
              <th className="p-3">Functional Component</th>
              <th className="p-3 w-28">Count</th>
              <th className="p-3 w-40">Complexity Rating</th>
              <th className="p-3 w-28 text-center">Unit Weight</th>
              <th className="p-3 w-32 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nordic-hairline/60 dark:divide-nordic-hairlineDark/60 font-mono">
            {(Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]).map((key) => {
              const item = WEIGHTS[key];
              const comp = complexities[key];
              const weight = item[comp];
              const subtotal = (counts[key] || 0) * weight;

              return (
                <tr key={key} className="hover:bg-nordic-frost/50 dark:hover:bg-nordic-darkSurfaceElevated/50">
                  <td className="p-3 font-medium text-nordic-spruce dark:text-gray-200">
                    {item.label}
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="200"
                      value={counts[key]}
                      onChange={(e) =>
                        setCounts({ ...counts, [key]: Math.max(0, parseInt(e.target.value) || 0) })
                      }
                      className="w-20 px-2 py-1 bg-nordic-frost dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded text-xs font-bold text-nordic-spruce dark:text-white"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={comp}
                      onChange={(e) =>
                        setComplexities({ ...complexities, [key]: e.target.value as Complexity })
                      }
                      className="px-2 py-1 bg-nordic-frost dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded text-xs font-sans text-nordic-spruce dark:text-white"
                    >
                      <option value="low">Low ({item.low})</option>
                      <option value="avg">Average ({item.avg})</option>
                      <option value="high">High ({item.high})</option>
                    </select>
                  </td>
                  <td className="p-3 text-center text-nordic-slate">{weight}</td>
                  <td className="p-3 text-right font-bold text-nordic-pine dark:text-green-400">
                    {subtotal} FP
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border-t border-nordic-hairline dark:border-nordic-hairlineDark font-mono font-bold">
            <tr>
              <td colSpan={4} className="p-3 text-right text-nordic-slate">
                Total Unadjusted Function Points (UFP):
              </td>
              <td className="p-3 text-right text-base text-nordic-spruce dark:text-white">
                {ufp} UFP
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* GSC Influence Slider */}
      <div className="bg-nordic-frost dark:bg-nordic-darkSurfaceElevated p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark my-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-2">
          <span className="text-nordic-slate font-medium">
            Sum of 14 General System Characteristics (∑ Fi):
          </span>
          <span className="font-mono font-bold text-nordic-amber">
            ∑ Fi = {tdi} (out of max 70) ➔ VAF = {vaf.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="70"
          value={tdi}
          onChange={(e) => setTdi(Number(e.target.value))}
          className="w-full h-2 bg-nordic-hairline dark:bg-nordic-hairlineDark rounded-lg appearance-none cursor-pointer accent-nordic-amber"
        />
        <div className="flex justify-between text-[10px] text-nordic-slate font-mono mt-1">
          <span>0 (No influence: VAF = 0.65)</span>
          <span>35 (Average influence: VAF = 1.00)</span>
          <span>70 (Max influence: VAF = 1.35)</span>
        </div>
      </div>

      {/* Final Synthesized Metric Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark bg-white dark:bg-nordic-darkSurface text-center">
          <span className="text-xs text-nordic-slate block">Unadjusted FP (UFP)</span>
          <span className="font-serif text-3xl font-bold text-nordic-spruce dark:text-white">{ufp}</span>
        </div>
        <div className="p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark bg-white dark:bg-nordic-darkSurface text-center">
          <span className="text-xs text-nordic-slate block">Adjustment Factor (VAF)</span>
          <span className="font-serif text-3xl font-bold text-nordic-amber">{vaf.toFixed(2)}x</span>
        </div>
        <div className="p-4 rounded-lg border-2 border-nordic-pine bg-nordic-pineBg/50 dark:bg-nordic-pine/20 text-center">
          <span className="text-xs font-semibold text-nordic-pine dark:text-green-300 block">Final Adjusted FP</span>
          <span className="font-serif text-3xl font-extrabold text-nordic-pine dark:text-green-400">{fp} FP</span>
        </div>
      </div>
    </div>
  );
}
