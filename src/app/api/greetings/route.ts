import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";

// In-memory rate limiter (fallback if no Vercel KV)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 3; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

const greetingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name too long"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(500, "Message too long"),
  emoji: z.string().nullable().optional(),
});

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIp || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("greetings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch greetings" },
        { status: 500 }
      );
    }

    return NextResponse.json({ greetings: data || [] });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = greetingSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, message, emoji } = validationResult.data;

    // Insert into database
    const { data, error } = await supabaseAdmin
      .from("greetings")
      .insert({
        name,
        message,
        emoji: emoji || null,
      } as any)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save greeting" },
        { status: 500 }
      );
    }

    return NextResponse.json({ greeting: data }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
