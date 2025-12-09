"use client";

import { useState } from "react";

// Generate random values outside component to avoid re-render issues
const generateParticles = () => 
  Array.from({ length: 20 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5
  }));

const generateLines = () =>
  Array.from({ length: 15 }, () => ({
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2
  }));

const generateBinaryCode = () =>
  Array.from({ length: 10 }, () => ({
    code: Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join(''),
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 5
  }));

export function TechBackground() {
  // Initialize with random values once
  const [particles] = useState(generateParticles);
  const [lines] = useState(generateLines);
  const [binaryCode] = useState(generateBinaryCode);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-900 to-slate-800" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {lines.map((line, i) => (
          <line
            key={i}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            className="animate-pulse"
            style={{
              animationDelay: `${line.delay}s`,
              animationDuration: `${line.duration}s`
            }}
          />
        ))}
      </svg>

      {/* Binary Code Rain */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {binaryCode.map((item, i) => (
          <div
            key={i}
            className="absolute text-blue-400 font-mono text-xs whitespace-nowrap"
            style={{
              left: `${i * 10}%`,
              animation: `binaryRain ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`
            }}
          >
            {item.code}
          </div>
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        
        @keyframes binaryRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}
