"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export function BirthdayCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <Section id="card">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Birthday Card
        </h2>
        <p className="text-gray-600">
          Click or press the button to flip the card
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div
          className="relative h-96 cursor-pointer perspective-1000"
          onClick={handleFlip}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-label={isFlipped ? "Flip to front" : "Flip to back"}
          aria-pressed={isFlipped}
        >
          <motion.div
            className="relative w-full h-full preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 flex flex-col items-center justify-center shadow-2xl"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-white text-center space-y-6">
                <div className="text-6xl mb-4">🎂</div>
                <h3 className="text-3xl font-bold">Happy Birthday!</h3>
                <p className="text-xl text-blue-100">Mr. Martin Marta</p>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-8 flex flex-col items-center justify-center shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="text-white text-center space-y-6">
                <p className="text-lg leading-relaxed">
                  May this special day bring you joy, success, and countless
                  moments of happiness. Thank you for being an exceptional
                  leader and mentor to us all.
                </p>
                <p className="text-xl font-semibold text-blue-100 mt-8">
                  — Your Team
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Flip Button for Accessibility */}
        <div className="text-center mt-8">
          <Button
            onClick={handleFlip}
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Flip Card
          </Button>
        </div>
      </div>
    </Section>
  );
}
