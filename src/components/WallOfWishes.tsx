"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { formatDistanceToNow } from "date-fns";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import type { Greeting } from "@/lib/supabase/types";
import { Send } from "lucide-react";

const EMOJIS = ["🎉", "🎂", "🎈", "🎊", "🌟", "💐", "🎁", "✨"];

export function WallOfWishes() {
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch initial greetings
    fetchGreetings();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("greetings")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "greetings",
        },
        (payload) => {
          setGreetings((prev) => [payload.new as Greeting, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGreetings = async () => {
    const response = await fetch("/api/greetings");
    if (response.ok) {
      const data = await response.json();
      setGreetings(data.greetings || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/greetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          emoji: selectedEmoji || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit wish");
        setIsSubmitting(false);
        return;
      }

      // Success - fire confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
      });

      // Reset form
      setName("");
      setMessage("");
      setSelectedEmoji("");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="wishes" variant="tinted">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Wall of Wishes
        </h2>
        <p className="text-gray-600">
          Share your birthday wishes for Mr. Martin Marta
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    maxLength={50}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your birthday wish..."
                    required
                    maxLength={500}
                    rows={4}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose an Emoji (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() =>
                          setSelectedEmoji(selectedEmoji === emoji ? "" : emoji)
                        }
                        className={`text-3xl p-2 rounded-lg transition-all ${
                          selectedEmoji === emoji
                            ? "bg-blue-100 ring-2 ring-blue-500 scale-110"
                            : "hover:bg-gray-100"
                        }`}
                        disabled={isSubmitting}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Wish"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Wall */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {greetings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500"
              >
                No wishes yet. Be the first to send one!
              </motion.div>
            ) : (
              greetings.map((greeting) => (
                <motion.div
                  key={greeting.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {greeting.emoji && (
                          <span className="text-3xl flex-shrink-0">
                            {greeting.emoji}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {greeting.name}
                            </h4>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {formatDistanceToNow(new Date(greeting.created_at), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed break-words">
                            {greeting.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
