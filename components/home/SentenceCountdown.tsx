"use client";

import { useEffect, useState } from "react";
import { site, home } from "@/content/site";
import { diff } from "@/lib/countdown";
import { Reveal } from "@/components/motion/Reveal";
import { Wash } from "@/components/paper/Wash";
import { Foliage } from "@/components/paper/Foliage";

export function SentenceCountdown() {
  const [parts, setParts] = useState(() => diff(site.date.iso));

  useEffect(() => {
    const t = setInterval(() => setParts(diff(site.date.iso)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-12 md:py-16">
      <Wash variant="sand" />
      <Foliage className="-left-8 -top-6 -rotate-12" width={220} opacity={0.6} />
      <Foliage className="-right-10 -bottom-8 rotate-[150deg]" width={260} opacity={0.5} flip />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          {parts.past ? (
            <p className="font-serif italic text-2xl md:text-3xl text-[color:var(--color-bark)] leading-snug">
              {home.meme.countdownPast}
            </p>
          ) : (
            <p className="font-serif italic text-2xl md:text-4xl text-[color:var(--color-bark)] leading-snug">
              {home.meme.countdownBefore}{" "}
              <span className="font-serif not-italic font-light text-[color:var(--color-tan)] text-3xl md:text-5xl mx-1">
                {parts.days}
              </span>
              days,{" "}
              <span className="font-serif not-italic font-light text-[color:var(--color-tan)] text-3xl md:text-5xl mx-1">
                {parts.hours}
              </span>
              hours and{" "}
              <span className="font-serif not-italic font-light text-[color:var(--color-tan)] text-3xl md:text-5xl mx-1">
                {parts.minutes}
              </span>
              minutes, {home.meme.countdownAfter}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
