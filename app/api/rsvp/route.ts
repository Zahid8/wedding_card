import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";
import { saveRsvp } from "@/lib/rsvp-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bucket = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = bucket.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    bucket.set(ip, { count: 1, ts: now });
    return true;
  }
  entry.count += 1;
  if (entry.count > LIMIT) return false;
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a minute." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  if (parsed.data.hp) {
    return NextResponse.json({ ok: true });
  }

  const result = await saveRsvp(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
