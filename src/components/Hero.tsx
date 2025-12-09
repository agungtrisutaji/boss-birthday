"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Hero() {
  useEffect(() => {
    // Initial confetti burst on page load
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE"],
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCelebrate = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE", "#6366F1"],
    });
  };

  const scrollToWishes = () => {
    const element = document.getElementById("wishes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden scroll-mt-24"
    >
      {/* Background with subtle neon grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
          Happy Birthday,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Mr. Martin Marta
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto animate-slide-up">
          Celebrating your exceptional leadership and dedication to excellence
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Button
            size="lg"
            onClick={scrollToWishes}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Write a Wish
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleCelebrate}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Celebrate
          </Button>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
    </section>
  );
}
