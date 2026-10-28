"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RightToc from "@/components/RightToc";
import ModuleView from "@/components/ModuleView";
import SearchModal from "@/components/SearchModal";
import { MODULES } from "@/data/modules";
import { X } from "lucide-react";

export default function Home() {
  const [activeModuleId, setActiveModuleId] = useState<string>("sdlc-models");
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const activeModule = MODULES.find((m) => m.id === activeModuleId) || MODULES[0];

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setActiveSectionId(undefined);
    setIsMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSection = (moduleId: string, sectionId: string) => {
    setActiveModuleId(moduleId);
    setActiveSectionId(sectionId);
    setIsMobileNavOpen(false);

    // Wait for DOM render if module changed
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  return (
    <div className="min-h-screen flex flex-col bg-claude-bg dark:bg-claude-darkBg text-claude-text dark:text-claude-darkText transition-colors font-sans selection:bg-claude-clay/20 selection:text-claude-ink dark:selection:text-white" id="top">
      {/* Top Header */}
      <Header
        activeModuleId={activeModuleId}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
      />

      {/* Main Tri-Pane Shell */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex">
        {/* Left Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeModuleId={activeModuleId}
            onSelectModule={handleSelectModule}
            onSelectSection={handleSelectSection}
          />
        </div>

        {/* Center Main Documentation Canvas */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <ModuleView
            module={activeModule}
            onNavigateModule={handleSelectModule}
          />
        </main>

        {/* Right Desktop Table of Contents & Quick Study Tools */}
        <RightToc
          module={activeModule}
          activeSectionId={activeSectionId}
          onSelectSection={(secId) => handleSelectSection(activeModule.id, secId)}
          onOpenDeployGuide={() => handleSelectModule("github-pages-guide")}
        />
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-claude-ink/40 backdrop-blur-xs"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-claude-card dark:bg-claude-darkSurface h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 border-r border-claude-border dark:border-claude-darkBorder">
            <div className="p-4 border-b border-claude-border dark:border-claude-darkBorder flex items-center justify-between">
              <span className="font-serif font-semibold text-sm text-claude-ink dark:text-claude-darkInk tracking-tight flex items-center gap-1.5">
                <span className="text-claude-clay text-base">✳</span> Syllabus Navigation
              </span>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 rounded-md hover:bg-claude-bgSubtle dark:hover:bg-claude-darkCard text-claude-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                activeModuleId={activeModuleId}
                onSelectModule={handleSelectModule}
                onSelectSection={handleSelectSection}
              />
            </div>
          </div>
        </div>
      )}

      {/* ⌘K Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSection={handleSelectSection}
      />
    </div>
  );
}
