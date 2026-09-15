"use client";

import { useEffect, useState } from "react";
import { site, home } from "@/content/site";
import { diff } from "@/lib/countdown";
import { Reveal } from "@/components/motion/Reveal";
import { Wash } from "@/components/paper/Wash";
import { Foliage } from "@/components/paper/Foliage";

export function SentenceCountdown() {
  // Server and client clocks differ, so the numbers are filled in only after
  // mount (avoids a hydration mismatch). Until then the digits render as em dashes.
  const [parts, setParts] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const tick = () => setParts(diff(site.date.iso));
    const t = setInterval(tick, 1000);
    const first = setTimeout(tick, 0);
    return () => {
      clearInterval(t);
      clearTimeout(first);
    };
  }, []);
  const n = (v: number | undefined) => (v === undefined ? "—" : v);

  return (
    <section className="relative isolate overflow-hidden py-12 md:py-16">
      <Wash variant="sand" />
      <Foliage className="-left-8 -top-6 -rotate-12" width={220} opacity={0.6} />
      <Foliage className="-right-10 -bottom-8 rotate-[150deg]" width={260} opacity={0.5} flip />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          {parts?.past ? (
            <p className="font-serif italic text-2xl md:text-3xl text-[color:var(--color-bark)] leading-snug">
              {home.meme.countdownPast}
            </p>
          ) : (
            <p className="font-serif italic text-2xl md:text-4xl text-[color:var(--color-bark)] leading-snug">
              {home.meme.countdownBefore}{" "}
              <span className="font-serif not-italic font-light text-[color:var(--color-tan)] text-3xl md:text-5xl mx-1">
                {n(parts?.days)}
              </span>
              days,{" "}
              <span className="font-serif not-italic font-light text-[color:var(--color-tan)] text-3xl md:text-5xl mx-1">
                {n(parts?.hours)}
              </span>
              hours and{" "}
              <span className="font-serif not-italic font-light text-[color:var(--color-tan)] text-3xl md:text-5xl mx-1">
                {n(parts?.minutes)}
              </span>
              minutes, {home.meme.countdownAfter}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
