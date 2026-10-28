"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, AlertTriangle, Users, Clock, Flame } from "lucide-react";

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
    description: "Small teams, experienced engineers, familiar in-house environment, relaxed requirements.",
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
    <div className="bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded-lg p-6 shadow-sm my-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-nordic-hairline dark:border-nordic-hairlineDark gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-nordic-amber/10 text-nordic-amber">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-nordic-spruce dark:text-gray-100">
              Interactive Boehm COCOMO Simulator
            </h3>
            <p className="text-xs text-nordic-slate">
              Parametric cost synthesis for Person-Months, Schedule, and Team Sizing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated p-1 rounded border border-nordic-hairline dark:border-nordic-hairlineDark text-xs font-mono">
          <button
            onClick={() => setModelType("basic")}
            className={`px-3 py-1 rounded transition-colors ${
              modelType === "basic"
                ? "bg-white dark:bg-nordic-polar text-nordic-spruce dark:text-white shadow-xs font-semibold"
                : "text-nordic-slate hover:text-nordic-spruce dark:hover:text-white"
            }`}
          >
            Basic COCOMO
          </button>
          <button
            onClick={() => setModelType("intermediate")}
            className={`px-3 py-1 rounded transition-colors ${
              modelType === "intermediate"
                ? "bg-white dark:bg-nordic-polar text-nordic-spruce dark:text-white shadow-xs font-semibold"
                : "text-nordic-slate hover:text-nordic-spruce dark:hover:text-white"
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
              className={`p-3 text-left rounded-lg border transition-all ${
                isActive
                  ? "border-nordic-pine bg-nordic-pineBg dark:bg-nordic-pine/20 text-nordic-pine dark:text-green-300 ring-1 ring-nordic-pine"
                  : "border-nordic-hairline dark:border-nordic-hairlineDark bg-nordic-frost dark:bg-nordic-darkSurfaceElevated hover:border-nordic-slate/60 text-nordic-spruce dark:text-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs font-mono">{item.name}</span>
                {isActive && <Sparkles className="w-3.5 h-3.5 text-nordic-pine" />}
              </div>
              <p className="text-[11px] text-nordic-slate leading-tight line-clamp-2">{item.description}</p>
            </button>
          );
        })}
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-nordic-slate font-medium">Estimated Project Size (KLOC):</span>
            <span className="font-mono font-bold text-nordic-spruce dark:text-white text-sm">
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
            className="w-full h-2 bg-nordic-hairline dark:bg-nordic-hairlineDark rounded-lg appearance-none cursor-pointer accent-nordic-pine"
          />
          <div className="flex justify-between text-[10px] text-nordic-slate font-mono mt-1">
            <span>2 KLOC (Small)</span>
            <span>150 KLOC (Medium)</span>
            <span>300 KLOC (Large)</span>
          </div>
        </div>

        {modelType === "intermediate" && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-nordic-slate font-medium">Effort Adjustment Factor (EAF):</span>
              <span className="font-mono font-bold text-nordic-amber text-sm">{eaf.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.70"
              max="1.50"
              step="0.05"
              value={eaf}
              onChange={(e) => setEaf(Number(e.target.value))}
              className="w-full h-2 bg-nordic-hairline dark:bg-nordic-hairlineDark rounded-lg appearance-none cursor-pointer accent-nordic-amber"
            />
            <div className="flex justify-between text-[10px] text-nordic-slate font-mono mt-1">
              <span>0.70x (Elite Team)</span>
              <span>1.0x (Nominal)</span>
              <span>1.50x (Ultra Critical)</span>
            </div>
          </div>
        )}
      </div>

      {/* Computed Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
        <div className="bg-white dark:bg-nordic-darkSurface p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark text-center">
          <div className="flex items-center justify-center gap-1.5 text-nordic-slate text-xs mb-1">
            <Flame className="w-4 h-4 text-nordic-amber" />
            <span>Human Effort</span>
          </div>
          <div className="font-serif text-3xl font-bold text-nordic-spruce dark:text-white">
            {effort}
          </div>
          <span className="text-[11px] text-nordic-slate font-mono">Person-Months (PM)</span>
        </div>

        <div className="bg-white dark:bg-nordic-darkSurface p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark text-center">
          <div className="flex items-center justify-center gap-1.5 text-nordic-slate text-xs mb-1">
            <Clock className="w-4 h-4 text-nordic-pine" />
            <span>Development Schedule</span>
          </div>
          <div className="font-serif text-3xl font-bold text-nordic-pine dark:text-green-400">
            {tdev}
          </div>
          <span className="text-[11px] text-nordic-slate font-mono">Calendar Months</span>
        </div>

        <div className="bg-white dark:bg-nordic-darkSurface p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark text-center">
          <div className="flex items-center justify-center gap-1.5 text-nordic-slate text-xs mb-1">
            <Users className="w-4 h-4 text-nordic-polar" />
            <span>Average Staffing</span>
          </div>
          <div className="font-serif text-3xl font-bold text-nordic-spruce dark:text-gray-100">
            {staff}
          </div>
          <span className="text-[11px] text-nordic-slate font-mono">Full-Time Engineers</span>
        </div>
      </div>

      {/* Mathematical Proof Step Breakdown */}
      <div className="mt-4 p-3.5 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated rounded border border-nordic-hairline dark:border-nordic-hairlineDark text-xs font-mono text-nordic-spruce dark:text-gray-300">
        <div className="font-semibold text-nordic-pine mb-1">Mathematical Derivation:</div>
        <div>
          Effort = {a} × ({kloc})^{b} {modelType === "intermediate" ? `× ${eaf.toFixed(2)}` : ""} ={" "}
          <strong className="text-nordic-amber">{effort} Person-Months</strong>
        </div>
        <div>
          Tdev = {c} × ({effort})^{d} ={" "}
          <strong className="text-nordic-pine">{tdev} Months</strong>
        </div>
        <div>
          Avg Staff = Effort / Tdev = {effort} / {tdev} ={" "}
          <strong className="text-nordic-spruce dark:text-white">{staff} Engineers</strong>
        </div>
      </div>
    </div>
  );
}
