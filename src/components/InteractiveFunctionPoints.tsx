"use client";

import React, { useState } from "react";
import { Table, Layers } from "lucide-react";
import { MathDisplay } from "./MathDisplay";

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
    <div className="bg-white dark:bg-claude-darkSurface border border-claude-border dark:border-claude-darkBorder rounded-lg p-6 shadow-claude-sm my-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-claude-border dark:border-claude-darkBorder gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-claude-claySubtle text-claude-clay border border-claude-clayBorder">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-claude-ink dark:text-white">
              Albrecht Function Point (FP) Synthesizer
            </h3>
            <p className="text-xs text-claude-muted dark:text-claude-darkMuted">
              Specification-based functional capability sizing independent of programming language
            </p>
          </div>
        </div>
        <div className="text-right">
          <MathDisplay
            math="FP = UFP \\times \\left[0.65 + 0.01 \\times \\sum_{i=1}^{14} F_i\\right]"
            displayMode={false}
            className="text-xs font-serif text-claude-clay"
          />
        </div>
      </div>

      {/* FP Table */}
      <div className="overflow-x-auto my-4 border border-claude-border dark:border-claude-darkBorder rounded-lg shadow-claude-sm">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border-b border-claude-border dark:border-claude-darkBorder text-claude-muted dark:text-claude-darkMuted font-mono">
            <tr>
              <th className="p-3.5">Functional Component</th>
              <th className="p-3.5 w-28">Count</th>
              <th className="p-3.5 w-40">Complexity Rating</th>
              <th className="p-3.5 w-28 text-center">Unit Weight</th>
              <th className="p-3.5 w-32 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-claude-border/60 dark:divide-claude-darkBorder/60 font-mono">
            {(Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]).map((key) => {
              const item = WEIGHTS[key];
              const comp = complexities[key];
              const weight = item[comp];
              const subtotal = (counts[key] || 0) * weight;

              return (
                <tr
                  key={key}
                  className="hover:bg-claude-bgSubtle/50 dark:hover:bg-claude-darkSurfaceElevated/50 transition-colors"
                >
                  <td className="p-3.5 font-medium text-claude-ink dark:text-gray-200 font-sans">
                    {item.label}
                  </td>
                  <td className="p-3.5">
                    <input
                      type="number"
                      min="0"
                      max="200"
                      value={counts[key]}
                      onChange={(e) =>
                        setCounts({ ...counts, [key]: Math.max(0, parseInt(e.target.value) || 0) })
                      }
                      className="w-20 px-2 py-1 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder rounded text-xs font-medium text-claude-ink dark:text-white"
                    />
                  </td>
                  <td className="p-3.5">
                    <select
                      value={comp}
                      onChange={(e) =>
                        setComplexities({ ...complexities, [key]: e.target.value as Complexity })
                      }
                      className="px-2 py-1 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder rounded text-xs font-sans text-claude-ink dark:text-white"
                    >
                      <option value="low">Low ({item.low})</option>
                      <option value="avg">Average ({item.avg})</option>
                      <option value="high">High ({item.high})</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-center text-claude-muted">{weight}</td>
                  <td className="p-3.5 text-right font-medium text-claude-clay dark:text-[#E89274]">
                    {subtotal} FP
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border-t border-claude-border dark:border-claude-darkBorder font-mono font-medium">
            <tr>
              <td colSpan={4} className="p-3.5 text-right text-claude-muted font-sans">
                Total Unadjusted Function Points (UFP):
              </td>
              <td className="p-3.5 text-right text-base text-claude-ink dark:text-white font-bold">
                {ufp} UFP
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* GSC Influence Slider */}
      <div className="bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated p-4 rounded-md border border-claude-border dark:border-claude-darkBorder my-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-2">
          <span className="text-claude-muted dark:text-claude-darkMuted font-medium">
            Sum of 14 General System Characteristics (∑ Fi):
          </span>
          <span className="font-mono font-medium text-claude-clay">
            ∑ Fi = {tdi} (max 70) ➔ VAF = {vaf.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="70"
          value={tdi}
          onChange={(e) => setTdi(Number(e.target.value))}
          className="w-full h-1.5 bg-claude-border dark:bg-claude-darkBorder rounded-lg appearance-none cursor-pointer accent-claude-clay"
        />
        <div className="flex justify-between text-[10px] text-claude-muted font-mono mt-1">
          <span>0 (VAF = 0.65)</span>
          <span>35 (Nominal: VAF = 1.00)</span>
          <span>70 (VAF = 1.35)</span>
        </div>
      </div>

      {/* Final Synthesized Metric Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-md border border-claude-border dark:border-claude-darkBorder bg-white dark:bg-claude-darkSurface text-center shadow-claude-sm">
          <span className="text-xs text-claude-muted dark:text-claude-darkMuted block">Unadjusted FP (UFP)</span>
          <span className="font-serif text-3xl font-normal text-claude-ink dark:text-white">{ufp}</span>
        </div>
        <div className="p-4 rounded-md border border-claude-border dark:border-claude-darkBorder bg-white dark:bg-claude-darkSurface text-center shadow-claude-sm">
          <span className="text-xs text-claude-muted dark:text-claude-darkMuted block">Adjustment Factor (VAF)</span>
          <span className="font-serif text-3xl font-normal text-claude-clay">{vaf.toFixed(2)}×</span>
        </div>
        <div className="p-4 rounded-md border-2 border-claude-clay bg-claude-claySubtle dark:bg-claude-claySubtle text-center shadow-claude-sm">
          <span className="text-xs font-medium text-claude-clay dark:text-[#E89274] block">Final Adjusted FP</span>
          <span className="font-serif text-3xl font-bold text-claude-clay dark:text-[#E89274]">{fp} FP</span>
        </div>
      </div>
    </div>
  );
}
