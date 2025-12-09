"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal as TerminalIcon, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const ASCII_CAKE = `
    _______________
   |~~~ ~~~ ~~~|
   |    HAPPY   |
   |  BIRTHDAY! |
   |___________ |
   |           |
   |  @@@@@@   |
   | @@@@@@@@  |
   |@@@@@@@@@@|
   |__________|
`;

const TERMINAL_LOGS = [
  "> Initializing birthday protocol...",
  "> System check: OK",
  "> Loading celebration module...",
  "> Deploying good wishes... OK",
  "> Performance metrics:",
  "  - Leadership score: 99.99%",
  "  - Team inspiration: Maximum",
  "  - Uptime: 365 days/year",
  "> All systems operational",
  "> Happy Birthday, Mr. Martin Marta! 🎉",
];

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [martinProgress, setMartinProgress] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami code detection
      if (e.key === KONAMI_CODE[konamiProgress]) {
        setKonamiProgress((prev) => prev + 1);
      } else if (e.key === KONAMI_CODE[0]) {
        setKonamiProgress(1);
      } else {
        setKonamiProgress(0);
      }

      // MARTIN typing detection
      const newProgress = martinProgress + e.key.toLowerCase();
      if ("martin".startsWith(newProgress)) {
        setMartinProgress(newProgress);
      } else if ("martin".startsWith(e.key.toLowerCase())) {
        setMartinProgress(e.key.toLowerCase());
      } else {
        setMartinProgress("");
      }

      // ESC to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress, martinProgress, isOpen]);

  useEffect(() => {
    // Activate when both conditions are met
    if (konamiProgress === KONAMI_CODE.length && martinProgress === "martin") {
      openTerminal();
      setKonamiProgress(0);
      setMartinProgress("");
    }
  }, [konamiProgress, martinProgress]);

  const openTerminal = () => {
    setIsOpen(true);
    setLogs([]);

    // Animate logs
    TERMINAL_LOGS.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, index * 300);
    });
  };

  return (
    <>
      {/* Terminal Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={openTerminal}
              size="icon"
              className="fixed bottom-6 right-6 z-40 bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
            >
              <TerminalIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Terminal Mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border-2 border-cyan-500 rounded-lg w-full max-w-3xl shadow-2xl overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-cyan-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-cyan-400 text-sm font-mono">
                    birthday-terminal
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm h-96 overflow-y-auto">
                <pre className="text-cyan-400 mb-6 text-xs leading-tight">
                  {ASCII_CAKE}
                </pre>

                <div className="space-y-1">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-400"
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>

                {logs.length === TERMINAL_LOGS.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4"
                  >
                    <span className="text-cyan-400">guest@birthday:~$</span>
                    <span className="text-white ml-2 animate-pulse">_</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
