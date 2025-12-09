"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Navbar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioExists, setAudioExists] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if audio file exists
    fetch("/audio/birthday.mp3", { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setAudioExists(true);
          const audioElement = new Audio("/audio/birthday.mp3");
          audioElement.loop = true;
          audioElement.volume = 0.3;
          setAudio(audioElement);
          // Auto-play audio (browser may block this)
          audioElement.play().catch(() => {
            // If auto-play is blocked, set state to false
            setIsPlaying(false);
          });
        }
      })
      .catch(() => setAudioExists(false));

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/brand/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:inline">
              Birthday Celebration
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("spotlight")}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Spotlight
            </button>
            <button
              onClick={() => scrollToSection("card")}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Card
            </button>
            <button
              onClick={() => scrollToSection("wishes")}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Wishes
            </button>

            {/* Music Toggle */}
            {audioExists && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMusic}
                      className="ml-2"
                    >
                      {isPlaying ? (
                        <Volume2 className="h-5 w-5" />
                      ) : (
                        <VolumeX className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPlaying ? "Pause Music" : "Play Music"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
