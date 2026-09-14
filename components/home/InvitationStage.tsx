"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site, home } from "@/content/site";
import { Wash } from "@/components/paper/Wash";
import { Foliage } from "@/components/paper/Foliage";
import { cn } from "@/lib/utils";

/**
 * Curtain-reveal invitation. Sheer drapes part to reveal a painted set,
 * then each element of the card drops into place: garland, hanging name
 * card, the couple, the date ribbons and the RSVP button.
 *
 * All painted art lives inside a 9:16 stage matched to the 480x854 source
 * frames so nothing is upscaled; the surroundings are vector only.
 */

const ease = [0.22, 0.8, 0.2, 1] as const;
const T = {
  curtain: 0.6,
  garland: 2.2,
  card: 2.6,
  names: 3.4,
  groom: 4.0,
  bride: 4.3,
  ribbon1: 5.0,
  ribbon2: 5.3,
  rsvp: 6.0,
};

export function InvitationStage() {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, [run]);

  const drop = (delay: number, extra: Record<string, unknown> = {}) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: -80, ...extra },
          animate: { opacity: 1, y: 0, rotate: 0, x: 0 },
          transition: { delay, type: "spring" as const, stiffness: 70, damping: 14, mass: 1.1 },
        };

  return (
    <section
      aria-label="Wedding invitation"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[color:var(--color-paper)]"
    >
      <div aria-hidden className="absolute inset-0 hidden md:block">
        <Wash variant="sage" className="opacity-70" />
        <Foliage className="-left-10 top-24 -rotate-12" width={320} opacity={0.55} />
        <Foliage className="-right-12 bottom-16 rotate-[160deg]" width={360} opacity={0.5} flip />
        <div className="absolute inset-0 flex items-center justify-between px-[6vw] select-none">
          <span className="font-script text-[18vw] leading-none text-[color:var(--color-bark)]/[0.05]">{site.monogram.left}</span>
          <span className="font-script text-[18vw] leading-none text-[color:var(--color-bark)]/[0.05]">{site.monogram.right}</span>
        </div>
      </div>

      <div
        key={run}
        className={cn(
          "absolute inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
          "md:top-[calc(50%+2.25rem)] md:h-[min(calc(100svh-8.5rem),860px)] md:aspect-[9/16]",
          "overflow-hidden bg-[color:var(--color-paper)] md:shadow-[0_40px_80px_-40px_rgba(87,52,30,0.45)]",
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/textures/grain.svg'), url('/textures/paper.svg')",
            backgroundSize: "240px 240px, 480px 480px",
            backgroundBlendMode: "multiply",
          }}
        />
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ delay: T.curtain, duration: 3, ease }}
        >
          <div className={cn("absolute inset-0", !reduce && "kenburns")}>
            <Image
              src="/art/scene-tent.png"
              alt="Watercolor canvas tent with wooden chairs beneath an olive tree"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-bottom"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[52%]"
            style={{ background: "linear-gradient(to bottom, var(--color-paper) 42%, transparent)" }}
          />
        </motion.div>

        <motion.div aria-hidden className="absolute -top-2 inset-x-0 flex justify-center pointer-events-none" {...drop(T.garland)}>
          <img src="/masks/olive-branch.svg" alt="" className="w-40 -rotate-[8deg] -translate-x-16" />
          <img src="/masks/olive-branch.svg" alt="" className="w-40 rotate-[8deg] translate-x-16 -scale-x-100" />
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[8%] md:top-[7%] flex flex-col items-center pointer-events-none"
          {...drop(T.card, { rotate: -4 })}
          style={{ transformOrigin: "top center" }}
        >
          <div aria-hidden className="w-px h-8 bg-[color:var(--color-tan)]/70" />
          <div className="paper-card torn-top torn-bottom w-[86%] px-6 pt-8 pb-7 text-center">
            <p className="font-arabic text-xl text-[color:var(--color-tan)]">{home.bismillah}</p>
            <p className="tracked-label mt-4 text-[0.68rem]">{home.stage.families}</p>
            <p className="tracked-label text-[0.68rem]">{home.stage.invitedTo}</p>
            <motion.h1
              className="font-script text-[2.4rem] leading-[1.05] text-[color:var(--color-bark)] mt-4"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: T.names, duration: 0.9 }}
            >
              {site.couple.groom}
            </motion.h1>
            <motion.span
              className="block font-script text-3xl text-[color:var(--color-coral)] my-0.5"
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: T.names + 0.5, duration: 0.5 }}
            >
              &amp;
            </motion.span>
            <motion.h1
              className="font-script text-[2.4rem] leading-[1.05] text-[color:var(--color-bark)]"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: T.names + 0.7, duration: 0.9 }}
            >
              {site.couple.bride}
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[13%] left-[14%] h-[36%] will-change-transform"
          style={{ aspectRatio: "248 / 972" }}
          initial={reduce ? false : { x: "-160%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: T.groom, duration: 1.3, ease }}
        >
          <Image src="/art/groom.png" alt="" fill priority sizes="160px" className="object-contain object-bottom -scale-x-100" />
        </motion.div>
        <motion.div
          className="absolute bottom-[13%] right-[14%] h-[36%] will-change-transform"
          style={{ aspectRatio: "433 / 953" }}
          initial={reduce ? false : { x: "160%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: T.bride, duration: 1.3, ease }}
        >
          <Image src="/art/bride-roses.png" alt="" fill priority sizes="240px" className="object-contain object-bottom -scale-x-100" />
        </motion.div>

        <div className="absolute inset-x-0 bottom-[3.5rem] flex flex-col gap-1.5 items-stretch px-3 pointer-events-none">
          {site.events.map((ev, i) => (
            <motion.div
              key={ev.id}
              className="bg-[color:var(--color-bark)] text-[color:var(--color-paper)] px-4 py-2 flex items-center justify-between gap-3 shadow-[0_8px_20px_-14px_rgba(0,0,0,0.6)]"
              initial={reduce ? false : { x: i === 0 ? "-110%" : "110%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i === 0 ? T.ribbon1 : T.ribbon2, duration: 0.9, ease }}
            >
              <span className="font-script text-2xl leading-none">{ev.name}</span>
              <span className="font-serif uppercase tracking-[0.16em] text-[0.66rem] text-right leading-snug">
                {ev.weekday.slice(0, 3)} · {ev.day} {ev.monthShort} · {ev.time}
                <br />
                <span className="text-[color:var(--color-sand)]">{ev.venue.name}, {ev.venue.line2.split(",")[0]}</span>
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: T.rsvp, duration: 0.9 }}
        >
          <button
            onClick={() => {
              setReady(false);
              setRun((r) => r + 1);
            }}
            className="font-serif uppercase tracking-[0.2em] text-[0.66rem] text-[color:var(--color-bark)]/70 hover:text-[color:var(--color-bark)]"
          >
            ↺ {home.stage.replay}
          </button>
          <Link href="/rsvp" className="stamp-btn stamp-btn-coral !py-2 !px-4 !text-[0.7rem]">
            RSVP Now
          </Link>
          <a
            href="#details"
            className="flex items-center gap-1.5 font-serif uppercase tracking-[0.2em] text-[0.66rem] text-[color:var(--color-bark)]/70 hover:text-[color:var(--color-bark)]"
          >
            {home.stage.scrollCue}
            <img src="/masks/brush-arrow.svg" alt="" width={10} height={16} className="animate-bounce" />
          </a>
        </motion.div>

        <div aria-hidden className="hidden md:block absolute inset-x-0 top-0 h-6 torn-bottom bg-[color:var(--color-paper)] rotate-180 pointer-events-none" />
      </div>

      <Curtains open={ready} reduce={!!reduce} run={run} />
    </section>
  );
}

function Curtains({ open, reduce, run }: { open: boolean; reduce: boolean; run: number }) {
  const panel = "absolute inset-y-0 w-[52%] curtain will-change-transform";
  const transition = { delay: T.curtain, duration: 2.4, ease: [0.7, 0, 0.2, 1] as const };
  return (
    <div key={run} aria-hidden className="absolute inset-0 z-30 pointer-events-none">
      <motion.div
        className={cn(panel, "left-0 curtain-left")}
        initial={reduce ? { x: "-100%" } : { x: 0 }}
        animate={{ x: open ? "-100%" : 0 }}
        transition={transition}
      />
      <motion.div
        className={cn(panel, "right-0 curtain-right")}
        initial={reduce ? { x: "100%" } : { x: 0 }}
        animate={{ x: open ? "100%" : 0 }}
        transition={transition}
      />
    </div>
  );
}
