"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, Users, Clock, Flame } from "lucide-react";
import { MathDisplay } from "./MathDisplay";

type CocomoMode = "organic" | "semidetached" | "embedded";

interface ModeParams {
  name: string;
  description: string;
  aBasic: number;
  bBasic: number;
  cBasic: number;
  dBasic: number;
  aInter: number;
}

const MODES: Record<CocomoMode, ModeParams> = {
  organic: {
    name: "Organic Mode",
    description: "Small teams, experienced engineers, familiar in-house environment, relaxed constraints.",
    aBasic: 2.4,
    bBasic: 1.05,
    cBasic: 2.5,
    dBasic: 0.38,
    aInter: 3.2,
  },
  semidetached: {
    name: "Semi-Detached Mode",
    description: "Medium teams, mixed experience levels, medium system complexity and constraints.",
    aBasic: 3.0,
    bBasic: 1.12,
    cBasic: 2.5,
    dBasic: 0.35,
    aInter: 3.0,
  },
  embedded: {
    name: "Embedded Mode",
    description: "Strict hardware, software, regulatory and operational constraints (e.g. flight/medical).",
    aBasic: 3.6,
    bBasic: 1.20,
    cBasic: 2.5,
    dBasic: 0.32,
    aInter: 2.8,
  },
};

export default function InteractiveCocomo() {
  const [kloc, setKloc] = useState<number>(32);
  const [mode, setMode] = useState<CocomoMode>("organic");
  const [modelType, setModelType] = useState<"basic" | "intermediate">("basic");
  const [eaf, setEaf] = useState<number>(1.15);

  const currentMode = MODES[mode];
  const a = modelType === "basic" ? currentMode.aBasic : currentMode.aInter;
  const b = currentMode.bBasic;
  const c = currentMode.cBasic;
  const d = currentMode.dBasic;

  // Calculation
  const rawEffort = a * Math.pow(kloc, b) * (modelType === "intermediate" ? eaf : 1);
  const effort = Math.round(rawEffort * 10) / 10;
  const rawTdev = c * Math.pow(effort, d);
  const tdev = Math.round(rawTdev * 10) / 10;
  const staff = tdev > 0 ? Math.round((effort / tdev) * 10) / 10 : 0;

  return (
    <div className="bg-white dark:bg-claude-darkSurface border border-claude-border dark:border-claude-darkBorder rounded-lg p-6 shadow-claude-sm my-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-claude-border dark:border-claude-darkBorder gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-claude-claySubtle text-claude-clay border border-claude-clayBorder">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-claude-ink dark:text-white">
              Boehm COCOMO Quantitative Synthesis
            </h3>
            <p className="text-xs text-claude-muted dark:text-claude-darkMuted">
              Parametric cost modeling for Person-Months, Development Time, and Staffing Sizing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated p-1 rounded-md border border-claude-border dark:border-claude-darkBorder text-xs font-mono">
          <button
            onClick={() => setModelType("basic")}
            className={`px-3 py-1 rounded transition-colors ${
              modelType === "basic"
                ? "bg-white dark:bg-claude-darkSurface text-claude-ink dark:text-white shadow-2xs font-medium"
                : "text-claude-muted hover:text-claude-ink dark:hover:text-white"
            }`}
          >
            Basic COCOMO
          </button>
          <button
            onClick={() => setModelType("intermediate")}
            className={`px-3 py-1 rounded transition-colors ${
              modelType === "intermediate"
                ? "bg-white dark:bg-claude-darkSurface text-claude-ink dark:text-white shadow-2xs font-medium"
                : "text-claude-muted hover:text-claude-ink dark:hover:text-white"
            }`}
          >
            Intermediate COCOMO
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
        {(["organic", "semidetached", "embedded"] as CocomoMode[]).map((m) => {
          const item = MODES[m];
          const isActive = mode === m;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`p-3 text-left rounded-md border transition-all ${
                isActive
                  ? "border-claude-clay bg-claude-claySubtle text-claude-clay dark:text-[#E89274] ring-1 ring-claude-clay shadow-2xs"
                  : "border-claude-border dark:border-claude-darkBorder bg-claude-bgSubtle/50 dark:bg-claude-darkSurfaceElevated/50 hover:border-claude-muted text-claude-text dark:text-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif font-medium text-xs">{item.name}</span>
                {isActive && <Sparkles className="w-3.5 h-3.5 text-claude-clay" />}
              </div>
              <p className="text-[11px] text-claude-muted dark:text-claude-darkMuted leading-tight line-clamp-2">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated p-4 rounded-md border border-claude-border dark:border-claude-darkBorder">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-claude-muted dark:text-claude-darkMuted font-medium">Estimated Project Size (KLOC):</span>
            <span className="font-mono font-medium text-claude-ink dark:text-white text-sm">
              {kloc} KLOC ({kloc * 1000} lines)
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="300"
            step="2"
            value={kloc}
            onChange={(e) => setKloc(Number(e.target.value))}
            className="w-full h-1.5 bg-claude-border dark:bg-claude-darkBorder rounded-lg appearance-none cursor-pointer accent-claude-clay"
          />
          <div className="flex justify-between text-[10px] text-claude-muted font-mono mt-1">
            <span>2 KLOC</span>
            <span>150 KLOC</span>
            <span>300 KLOC</span>
          </div>
        </div>

        {modelType === "intermediate" && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-claude-muted dark:text-claude-darkMuted font-medium">Effort Adjustment Factor (EAF):</span>
              <span className="font-mono font-medium text-claude-clay text-sm">{eaf.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min="0.70"
              max="1.50"
              step="0.05"
              value={eaf}
              onChange={(e) => setEaf(Number(e.target.value))}
              className="w-full h-1.5 bg-claude-border dark:bg-claude-darkBorder rounded-lg appearance-none cursor-pointer accent-claude-clay"
            />
            <div className="flex justify-between text-[10px] text-claude-muted font-mono mt-1">
              <span>0.70× (Elite)</span>
              <span>1.00× (Nominal)</span>
              <span>1.50× (Critical)</span>
            </div>
          </div>
        )}
      </div>

      {/* Computed Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
        <div className="bg-white dark:bg-claude-darkSurface p-4 rounded-md border border-claude-border dark:border-claude-darkBorder text-center shadow-claude-sm">
          <div className="flex items-center justify-center gap-1.5 text-claude-muted dark:text-claude-darkMuted text-xs mb-1">
            <Flame className="w-3.5 h-3.5 text-claude-clay" />
            <span>Human Effort</span>
          </div>
          <div className="font-serif text-3xl text-claude-ink dark:text-white font-normal">
            {effort}
          </div>
          <span className="text-[11px] text-claude-muted font-mono">Person-Months (PM)</span>
        </div>

        <div className="bg-white dark:bg-claude-darkSurface p-4 rounded-md border border-claude-border dark:border-claude-darkBorder text-center shadow-claude-sm">
          <div className="flex items-center justify-center gap-1.5 text-claude-muted dark:text-claude-darkMuted text-xs mb-1">
            <Clock className="w-3.5 h-3.5 text-claude-clay" />
            <span>Development Schedule</span>
          </div>
          <div className="font-serif text-3xl text-claude-clay dark:text-[#E89274] font-normal">
            {tdev}
          </div>
          <span className="text-[11px] text-claude-muted font-mono">Calendar Months</span>
        </div>

        <div className="bg-white dark:bg-claude-darkSurface p-4 rounded-md border border-claude-border dark:border-claude-darkBorder text-center shadow-claude-sm">
          <div className="flex items-center justify-center gap-1.5 text-claude-muted dark:text-claude-darkMuted text-xs mb-1">
            <Users className="w-3.5 h-3.5 text-claude-moss" />
            <span>Average Staffing</span>
          </div>
          <div className="font-serif text-3xl text-claude-ink dark:text-white font-normal">
            {staff}
          </div>
          <span className="text-[11px] text-claude-muted font-mono">Engineers</span>
        </div>
      </div>

      {/* Mathematical Proof Step Breakdown with KaTeX */}
      <div className="mt-4 p-4 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated rounded-md border border-claude-border dark:border-claude-darkBorder text-xs text-claude-text dark:text-gray-300">
        <div className="font-serif font-semibold text-claude-clay mb-2">Step-by-Step Mathematical Derivation:</div>
        <div className="space-y-1.5 overflow-x-auto py-1">
          <div>
            <MathDisplay
              math={`\\text{Effort} = ${a} \\times (${kloc})^{${b}}${modelType === "intermediate" ? ` \\times ${eaf.toFixed(2)}` : ""} = \\mathbf{${effort}\\text{ PM}}`}
            />
          </div>
          <div>
            <MathDisplay
              math={`T_{\\text{dev}} = ${c} \\times (${effort})^{${d}} = \\mathbf{${tdev}\\text{ Months}}`}
            />
          </div>
          <div>
            <MathDisplay
              math={`\\text{Average Staff} = \\frac{\\text{Effort}}{T_{\\text{dev}}} = \\frac{${effort}}{${tdev}} = \\mathbf{${staff}\\text{ Engineers}}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
