"use client";

import Image from "next/image";
import { Section } from "@/components/Section";

export function Spotlight() {
  return (
    <Section id="spotlight" variant="tinted">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Photo with premium frame */}
        <div className="relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden ring-4 ring-blue-100 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 z-10" />
            <Image
              src="/brand/mr-martin.png"
              alt="Mr. Martin Marta"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                // Fallback placeholder
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.backgroundColor = "#E5E7EB";
                  const placeholder = document.createElement("div");
                  placeholder.className = "absolute inset-0 flex items-center justify-center text-gray-400 text-6xl font-bold";
                  placeholder.textContent = "MM";
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>
          {/* Subtle neon glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-lg opacity-30 -z-10" />
        </div>

        {/* Caption */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            A Leader of Vision
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today we celebrate a remarkable individual whose guidance, wisdom, and commitment
            have been instrumental in our success. Your leadership continues to inspire us to
            reach new heights of excellence.
          </p>
          <p className="text-base text-gray-600 italic">
            — From all of us at the team
          </p>
        </div>
      </div>
    </Section>
  );
}
