"use client";

import React, { useState, useEffect } from "react";
import { Search, Moon, Sun, Download, Menu, Terminal, BookOpen, GitBranch } from "lucide-react";
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
    <header className="sticky top-0 z-40 bg-claude-bg/95 dark:bg-claude-darkBg/95 backdrop-blur-md border-b border-claude-border dark:border-claude-darkBorder transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden p-2 rounded hover:bg-claude-bgSubtle dark:hover:bg-claude-darkSurface text-claude-muted"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-claude-clay text-white flex items-center justify-center font-serif text-lg font-bold shadow-claude-sm transition-transform group-hover:scale-105">
              ✳
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base sm:text-lg font-medium text-claude-ink dark:text-white tracking-tight">
                  CSE312 Architecture
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-claude-claySubtle text-claude-clay dark:text-[#E89274] border border-claude-clayBorder font-medium">
                  v2025.1
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1 text-[11px] text-claude-muted dark:text-claude-darkMuted font-sans">
                <span>Atlas</span>
                <span>/</span>
                <span className="text-claude-clay dark:text-[#E89274] font-medium truncate max-w-[260px]">
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
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-claude-muted bg-white dark:bg-claude-darkSurface rounded-lg border border-claude-border dark:border-claude-darkBorder hover:border-claude-clay transition-all shadow-claude-sm"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-claude-muted" />
              <span>Search treatises, formulas, ISO standards...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder rounded text-claude-muted">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded hover:bg-claude-bgSubtle dark:hover:bg-claude-darkSurface text-claude-muted"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-claude-bgSubtle dark:hover:bg-claude-darkSurface text-claude-muted hover:text-claude-ink dark:hover:text-white transition-colors border border-transparent hover:border-claude-border"
            title={isDark ? "Switch to Linen Light" : "Switch to Obsidian Dark"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="https://github.com/R-zin/SA-mat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-claude-ink dark:bg-claude-darkSurfaceElevated text-white text-xs font-medium rounded-md hover:bg-claude-clay dark:hover:bg-claude-clay transition-all shadow-claude-sm border border-transparent hover:border-claude-clay"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Repository</span>
          </a>
        </div>
      </div>

      {/* Dynamic Scroll Reading Progress Line in Claude Terracotta */}
      <div className="w-full bg-claude-border/40 dark:bg-claude-darkBorder/60 h-0.5 overflow-hidden">
        <div
          className="bg-claude-clay h-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
