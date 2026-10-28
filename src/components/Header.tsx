"use client";

import React, { useState, useEffect } from "react";
import { Trees, Search, Moon, Sun, Download, Menu, Terminal, BookOpen, GitBranch } from "lucide-react";
import { MODULES } from "@/data/modules";

interface HeaderProps {
  activeModuleId: string;
  onOpenSearch: () => void;
  onToggleMobileNav: () => void;
}

export default function Header({ activeModuleId, onOpenSearch, onToggleMobileNav }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeModule = MODULES.find((m) => m.id === activeModuleId) || MODULES[0];

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-nordic-darkBg/95 backdrop-blur-md border-b border-nordic-hairline dark:border-nordic-hairlineDark transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden p-2 rounded hover:bg-nordic-frost dark:hover:bg-nordic-darkSurface text-nordic-slate"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-nordic-spruce dark:bg-nordic-polar text-white flex items-center justify-center border border-nordic-hairline/40 dark:border-nordic-hairlineDark shadow-xs transition-transform group-hover:scale-105">
              <Trees className="w-5 h-5 text-green-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base sm:text-lg font-bold text-nordic-spruce dark:text-white tracking-tight">
                  CSE312 Architecture
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-nordic-pineBg text-nordic-pine dark:text-green-300 border border-nordic-pine/30 font-semibold">
                  v2025.1
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1 text-[11px] text-nordic-slate font-sans">
                <span>Docs</span>
                <span>/</span>
                <span className="text-nordic-pine dark:text-green-300 font-medium truncate max-w-[260px]">
                  Module 0{activeModule.number}: {activeModule.shortTitle}
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Global Search Bar (⌘K) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-nordic-slate bg-nordic-frost dark:bg-nordic-darkSurface rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark hover:border-nordic-pine transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-nordic-slate" />
              <span>Search formulas, metrics, ISO standards...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark rounded shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded hover:bg-nordic-frost dark:hover:bg-nordic-darkSurface text-nordic-slate"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-nordic-frost dark:hover:bg-nordic-darkSurface text-nordic-slate hover:text-nordic-spruce dark:hover:text-white transition-colors"
            title={isDark ? "Switch to Nordic Frost (Light)" : "Switch to Polar Night (Dark)"}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href="https://github.com/R-zin/SA-mat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-nordic-spruce dark:bg-nordic-polar text-white text-xs font-medium rounded-lg hover:bg-nordic-polar dark:hover:bg-nordic-spruce transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub Repo</span>
          </a>
        </div>
      </div>

      {/* Dynamic Scroll Reading Progress Line */}
      <div className="w-full bg-nordic-hairline/40 dark:bg-nordic-hairlineDark/60 h-0.5 overflow-hidden">
        <div
          className="bg-nordic-pine h-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
