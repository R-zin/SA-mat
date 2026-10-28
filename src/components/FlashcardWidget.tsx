"use client";

import React, { useState } from "react";
import { FLASHCARDS } from "@/data/flashcards";
import { GraduationCap, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { MathDisplay, FormattedProse } from "./MathDisplay";

export default function FlashcardWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const card = FLASHCARDS[currentIndex];

  const handleNext = () => {
    setIsRevealed(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsRevealed(false);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  return (
    <div className="bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder rounded-lg p-4 my-4 shadow-claude-sm">
      <div className="flex items-center justify-between text-xs font-mono text-claude-muted dark:text-claude-darkMuted mb-2">
        <span className="flex items-center gap-1.5 text-claude-clay dark:text-[#E89274] font-medium">
          <GraduationCap className="w-4 h-4" />
          {card.category}
        </span>
        <span>
          Card {currentIndex + 1} of {FLASHCARDS.length}
        </span>
      </div>

      <div className="bg-white dark:bg-claude-darkSurface p-4 rounded-md border border-claude-border dark:border-claude-darkBorder min-h-[140px] flex flex-col justify-between shadow-claude-sm">
        <div>
          <div className="font-serif text-sm font-medium text-claude-ink dark:text-white leading-snug">
            <FormattedProse content={card.question} />
          </div>

          {!isRevealed && card.hint && (
            <p className="text-[11px] text-claude-muted dark:text-claude-darkMuted italic mt-2 font-serif">
              💡 Hint: {card.hint}
            </p>
          )}

          {isRevealed && (
            <div className="mt-3 pt-3 border-t border-claude-border/80 dark:border-claude-darkBorder/80">
              <div className="text-xs text-claude-text dark:text-claude-darkText whitespace-pre-line leading-relaxed font-sans">
                <FormattedProse content={card.answer} />
              </div>
              {card.formula && (
                <div className="mt-2.5 px-3 py-1.5 bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated rounded border border-claude-border dark:border-claude-darkBorder text-center">
                  <MathDisplay math={card.formula} displayMode={true} />
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className="mt-3 text-left text-xs font-mono font-medium text-claude-clay dark:text-[#E89274] hover:underline flex items-center gap-1.5 w-fit"
        >
          {isRevealed ? (
            <>
              <EyeOff className="w-3.5 h-3.5" /> Hide Solution
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" /> Reveal Solution
            </>
          )}
        </button>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-3 pt-2">
        <button
          onClick={handlePrev}
          className="p-1.5 rounded hover:bg-white dark:hover:bg-claude-darkSurface text-claude-muted hover:text-claude-ink dark:hover:text-white transition-colors"
          title="Previous Flashcard"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-1">
          {FLASHCARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsRevealed(false);
                setCurrentIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-claude-clay"
                  : "bg-claude-border dark:bg-claude-darkBorder hover:bg-claude-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-1.5 rounded hover:bg-white dark:hover:bg-claude-darkSurface text-claude-muted hover:text-claude-ink dark:hover:text-white transition-colors"
          title="Next Flashcard"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
