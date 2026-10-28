"use client";

import React, { useState } from "react";
import { FLASHCARDS } from "@/data/flashcards";
import { GraduationCap, Eye, EyeOff, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

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
    <div className="bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark rounded-lg p-4 my-4 shadow-xs">
      <div className="flex items-center justify-between text-xs font-mono text-nordic-slate mb-2">
        <span className="flex items-center gap-1.5 text-nordic-pine dark:text-green-300 font-semibold">
          <GraduationCap className="w-4 h-4" />
          {card.category}
        </span>
        <span>
          Card {currentIndex + 1} of {FLASHCARDS.length}
        </span>
      </div>

      <div className="bg-white dark:bg-nordic-darkSurface p-4 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark min-h-[140px] flex flex-col justify-between">
        <div>
          <p className="font-serif text-sm font-semibold text-nordic-spruce dark:text-gray-100 leading-snug">
            {card.question}
          </p>

          {!isRevealed && card.hint && (
            <p className="text-[11px] text-nordic-slate italic mt-2">
              💡 Hint: {card.hint}
            </p>
          )}

          {isRevealed && (
            <div className="mt-3 pt-3 border-t border-nordic-hairline/80 dark:border-nordic-hairlineDark/80">
              <p className="text-xs text-nordic-spruce dark:text-gray-200 whitespace-pre-line leading-relaxed font-sans">
                {card.answer}
              </p>
              {card.formula && (
                <div className="mt-2 px-2 py-1 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated rounded border border-nordic-hairline dark:border-nordic-hairlineDark font-mono text-[11px] text-nordic-pine dark:text-green-300">
                  {card.formula}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className="mt-3 text-left text-xs font-mono font-semibold text-nordic-pine dark:text-green-300 hover:underline flex items-center gap-1.5 w-fit"
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
          className="p-1.5 rounded hover:bg-white dark:hover:bg-nordic-darkSurface text-nordic-slate hover:text-nordic-spruce dark:hover:text-white transition-colors"
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
                  ? "bg-nordic-pine"
                  : "bg-nordic-hairline dark:bg-nordic-hairlineDark hover:bg-nordic-slate"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-1.5 rounded hover:bg-white dark:hover:bg-nordic-darkSurface text-nordic-slate hover:text-nordic-spruce dark:hover:text-white transition-colors"
          title="Next Flashcard"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
