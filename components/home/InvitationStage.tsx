"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, home, story } from "@/content/site";
import { Wash } from "@/components/paper/Wash";
import { Foliage } from "@/components/paper/Foliage";
import { cn } from "@/lib/utils";

/**
 * Full-screen animated invitation, rebuilt from the watercolor video as a
 * live sequence. The painted art is only ever rendered inside a 9:16 stage
 * whose size matches the source frames (480x854), so it never pixelates:
 * on phones the stage is the screen, on desktop it is a centered card on a
 * vector paper backdrop.
 */

type SceneId = "intro" | "arch" | "invite" | "groom" | "bride" | "date" | "rsvp";
const SCENES: { id: SceneId; ms: number }[] = [
  { id: "intro", ms: 4600 },
  { id: "arch", ms: 4800 },
  { id: "invite", ms: 4400 },
  { id: "groom", ms: 4000 },
  { id: "bride", ms: 4000 },
  { id: "date", ms: 7000 },
  { id: "rsvp", ms: 0 },
];
const LAST = SCENES.length - 1;

const ease = [0.22, 0.8, 0.2, 1] as const;
const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
};

export function InvitationStage() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(reduce ? LAST : 0);
  const [playing, setPlaying] = useState(!reduce);
  const [run, setRun] = useState(0); // bumps to restart progress bars
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = SCENES[index].id;
  const go = useCallback(
    (i: number) => {
      setIndex(Math.max(0, Math.min(LAST, i)));
      setRun((r) => r + 1);
    },
    [],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);
  const replay = useCallback(() => {
    go(0);
    setPlaying(true);
  }, [go]);

  // auto-advance
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const ms = SCENES[index].ms;
    if (!playing || ms === 0) return;
    timer.current = setTimeout(() => go(index + 1), ms);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, playing, run, go]);

  // pause when tab hidden
  useEffect(() => {
    const onVis = () => setPlaying(!document.hidden && SCENES[index].ms !== 0);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [index]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const showTent = index >= 2;
  const showArch = index === 1;
  const groomOn = scene === "groom" || scene === "date" || scene === "rsvp";
  const brideOn = scene === "bride" || scene === "date" || scene === "rsvp";
  const meet = scene === "date" || scene === "rsvp";

  return (
    <section
      aria-label="Wedding invitation"
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[color:var(--color-paper)]"
    >
      {/* Desktop backdrop: vector only, so it stays crisp at any width */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        <Wash variant="sage" className="opacity-70" />
        <Foliage className="-left-10 top-24 -rotate-12" width={320} opacity={0.55} />
        <Foliage className="-right-12 bottom-16 rotate-[160deg]" width={360} opacity={0.5} flip />
        <div className="absolute inset-0 flex items-center justify-between px-[6vw] select-none">
          <span className="font-script text-[18vw] leading-none text-[color:var(--color-bark)]/[0.05]">
            {site.monogram.left}
          </span>
          <span className="font-script text-[18vw] leading-none text-[color:var(--color-bark)]/[0.05]">
            {site.monogram.right}
          </span>
        </div>
      </div>

      {/* The stage */}
      <div
        className={cn(
          "absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
          "md:top-[calc(50%+2.25rem)] md:h-[min(calc(100svh-8.5rem),860px)] md:aspect-[9/16]",
          "overflow-hidden bg-[color:var(--color-paper)] md:shadow-[0_40px_80px_-40px_rgba(87,52,30,0.45)]",
        )}
        onClick={(e) => {
          // tap anywhere (except controls/links) to advance
          if ((e.target as HTMLElement).closest("a,button")) return;
          if (index < LAST) next();
        }}
      >
        {/* paper grain inside the stage */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/textures/grain.svg'), url('/textures/paper.svg')",
            backgroundSize: "240px 240px, 480px 480px",
            backgroundBlendMode: "multiply",
          }}
        />

        {/* ARCH scene: blooms in like a wet wash */}
        <AnimatePresence>
          {showArch && (
            <motion.div
              key="arch"
              className="absolute inset-0"
              initial={reduce ? false : { clipPath: "circle(0% at 50% 72%)", scale: 1.08, opacity: 0.6 }}
              animate={{ clipPath: "circle(120% at 50% 72%)", scale: 1, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 1.8, ease, delay: 0.45 }}
            >
              <Image
                src="/art/scene-arch.png"
                alt="Watercolor wedding arch with sheer drapes, the bride and groom standing beneath"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-bottom"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[38%]"
                style={{ background: "linear-gradient(to bottom, var(--color-paper) 30%, transparent)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* TENT scene: torn-paper wipe up, then stays as the set */}
        <AnimatePresence>
          {showTent && (
            <motion.div
              key="tent"
              className="absolute inset-0 torn-wipe-top"
              initial={reduce ? false : { y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease }}
            >
              <div className={cn("absolute inset-0", !reduce && "kenburns")}>
                <Image
                  src="/art/scene-tent.png"
                  alt="Watercolor canvas tent with wooden chairs beneath an olive tree"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-bottom"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[46%]"
                style={{ background: "linear-gradient(to bottom, var(--color-paper) 40%, transparent)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* GROOM cutout */}
        <motion.div
          className="absolute bottom-0 left-0 will-change-transform"
          initial={false}
          animate={
            groomOn
              ? meet
                ? { x: "22%", opacity: 1, scaleX: -1, height: "50%" }
                : { x: "6%", opacity: 1, scaleX: 1, height: "64%" }
              : { x: "-120%", opacity: 0, scaleX: 1, height: "64%" }
          }
          transition={{ duration: 1.1, ease }}
          style={{ aspectRatio: "248 / 972", transformOrigin: "bottom center" }}
        >
          <Image src="/art/groom.png" alt="" fill priority sizes="220px" className="object-contain object-bottom" />
        </motion.div>

        {/* BRIDE cutout */}
        <motion.div
          className="absolute bottom-0 right-0 will-change-transform"
          initial={false}
          animate={
            brideOn
              ? meet
                ? { x: "-14%", opacity: 1, scaleX: -1, height: "50%" }
                : { x: "-4%", opacity: 1, scaleX: 1, height: "64%" }
              : { x: "120%", opacity: 0, scaleX: 1, height: "64%" }
          }
          transition={{ duration: 1.1, ease, delay: meet ? 0.15 : 0 }}
          style={{ aspectRatio: "433 / 953", transformOrigin: "bottom center" }}
        >
          <Image src="/art/bride-roses.png" alt="" fill priority sizes="300px" className="object-contain object-bottom" />
        </motion.div>

        {/* TEXT layers */}
        <div className="absolute inset-x-0 top-0 pt-[6.5rem] md:pt-[20%] px-7 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            {scene === "intro" && (
              <motion.div key="t-intro" {...fade} transition={{ duration: 0.9, ease }}>
                <p className="font-arabic text-xl text-[color:var(--color-tan)]">{home.bismillah}</p>
                <motion.p
                  className="tracked-label mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {home.stage.invitedTo}
                </motion.p>
                <motion.h1
                  className="font-script text-6xl leading-[0.95] text-[color:var(--color-bark)] mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                >
                  {site.couple.groom}
                </motion.h1>
                <motion.span
                  className="block font-script text-4xl text-[color:var(--color-coral)] my-1"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.1, duration: 0.6 }}
                >
                  &amp;
                </motion.span>
                <motion.h1
                  className="font-script text-6xl leading-[0.95] text-[color:var(--color-bark)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1 }}
                >
                  {site.couple.bride}
                </motion.h1>
              </motion.div>
            )}

            {scene === "arch" && (
              <motion.div key="t-arch" {...fade} transition={{ duration: 0.9, ease, delay: 0.6 }} className="md:-mt-[8%]">
                <p className="font-script text-4xl leading-tight text-[color:var(--color-bark)]">
                  {site.couple.groomShort}{" "}
                  <span className="text-[color:var(--color-coral)]">&amp;</span>{" "}
                  {site.couple.brideShort}
                </p>
                <p className="tracked-label mt-3">{site.date.range}</p>
              </motion.div>
            )}

            {scene === "invite" && (
              <motion.div key="t-invite" {...fade} transition={{ duration: 0.9, ease, delay: 0.5 }} className="md:-mt-[6%]">
                <p className="font-serif uppercase tracking-[0.22em] text-[color:var(--color-bark)] text-sm leading-loose">
                  {home.invite}
                  <br />
                  {home.stage.inviteLine}
                </p>
                <p className="font-serif italic text-[color:var(--color-ink)]/75 mt-4 text-base">
                  {home.request}
                  <br />
                  {home.celebration}
                </p>
              </motion.div>
            )}

            {scene === "groom" && (
              <motion.div key="t-groom" {...fade} transition={{ duration: 0.9, ease, delay: 0.4 }} className="text-right pr-1 md:-mt-[10%]">
                <span className="tracked-label">{home.stage.groomLabel}</span>
                <h2 className="font-script text-5xl leading-[1] text-[color:var(--color-bark)] mt-3">
                  {story.groom.name.split(" ").slice(0, -1).join(" ")}
                  <br />
                  {story.groom.name.split(" ").slice(-1)[0]}
                </h2>
              </motion.div>
            )}

            {scene === "bride" && (
              <motion.div key="t-bride" {...fade} transition={{ duration: 0.9, ease, delay: 0.4 }} className="text-left pl-1 md:-mt-[10%]">
                <span className="tracked-label">{home.stage.brideLabel}</span>
                <h2 className="font-script text-5xl leading-[1] text-[color:var(--color-bark)] mt-3">
                  {story.bride.name.split(" ")[0]}
                  <br />
                  {story.bride.name.split(" ").slice(1).join(" ")}
                </h2>
              </motion.div>
            )}

            {scene === "date" && (
              <motion.div key="t-date" {...fade} transition={{ duration: 0.9, ease, delay: 0.3 }} className="md:-mt-[10%]">
                <span className="tracked-label">{site.date.range}</span>
                <div className="mt-3 grid grid-cols-2 gap-3 items-start">
                  {site.events.map((ev, i) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.6, duration: 0.8 }}
                      className={i === 0 ? "border-r border-[color:var(--color-tan)]/40 pr-3" : "pl-1"}
                    >
                      <span className="font-arabic text-lg text-[color:var(--color-tan)] block leading-none">{ev.arabic}</span>
                      <span className="font-script text-3xl text-[color:var(--color-bark)] block leading-tight">{ev.name}</span>
                      <div className="mt-1 h-px bg-[color:var(--color-tan)]/50 mx-auto w-10" />
                      <span className="tracked-label block mt-2 text-[0.6rem]">{ev.weekday}</span>
                      <span className="font-serif font-light text-5xl text-[color:var(--color-tan)] block leading-none my-0.5">{ev.day}</span>
                      <span className="tracked-label block text-[0.6rem]">{ev.monthShort} · {ev.time}</span>
                      <p className="font-serif uppercase tracking-[0.14em] text-[0.62rem] text-[color:var(--color-bark)] mt-2 leading-snug">{ev.venue.name}</p>
                      <p className="font-serif italic text-[0.7rem] text-[color:var(--color-ink)]/70 leading-snug">{ev.venue.line1}, {ev.venue.line2}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {scene === "rsvp" && (
              <motion.div key="t-rsvp" {...fade} transition={{ duration: 0.9, ease, delay: 0.3 }} className="md:-mt-[10%] pointer-events-auto">
                <p className="font-script text-5xl leading-tight text-[color:var(--color-bark)]">{home.closing}</p>
                <Link href="/rsvp" className="stamp-btn stamp-btn-coral mt-6">
                  RSVP Now
                </Link>
                <p className="tracked-label mt-5">Kindly respond by {site.rsvpDeadline}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* progress bars */}
        <div
          className="absolute inset-x-0 top-[4.5rem] md:top-4 px-5 flex gap-1.5 z-20"
          role="tablist"
          aria-label="Invitation scenes"
        >
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Scene ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                go(i);
              }}
              className="h-3 flex-1 flex items-center"
            >
              <span className="relative block h-[2px] w-full bg-[color:var(--color-bark)]/15 overflow-hidden rounded-full">
                <span
                  key={`${i}-${run}`}
                  className={cn(
                    "absolute inset-y-0 left-0 bg-[color:var(--color-bark)]/70 rounded-full",
                    i < index && "w-full",
                    i > index && "w-0",
                    i === index && (s.ms === 0 ? "w-full" : "stage-fill"),
                    i === index && !playing && "[animation-play-state:paused]",
                  )}
                  style={i === index && s.ms ? { animationDuration: `${s.ms}ms` } : undefined}
                />
              </span>
            </button>
          ))}
        </div>

        {/* controls */}
        <div className="absolute bottom-5 inset-x-0 px-6 flex items-center justify-between z-20 text-[color:var(--color-bark)]/70">
          {index < LAST ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(LAST);
              }}
              className="font-serif uppercase tracking-[0.22em] text-[0.68rem] hover:text-[color:var(--color-bark)]"
            >
              {home.stage.skip} →
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                replay();
              }}
              className="font-serif uppercase tracking-[0.22em] text-[0.68rem] hover:text-[color:var(--color-bark)]"
            >
              ↺ {home.stage.replay}
            </button>
          )}
          <AnimatePresence>
            {index === LAST && (
              <motion.a
                key="scroll"
                href="#details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex items-center gap-2 font-serif uppercase tracking-[0.22em] text-[0.68rem] hover:text-[color:var(--color-bark)]"
              >
                {home.stage.scrollCue}
                <img src="/masks/brush-arrow.svg" alt="" width={12} height={20} className="animate-bounce" />
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* torn card edges on desktop */}
        <div aria-hidden className="hidden md:block absolute inset-x-0 top-0 h-6 torn-bottom bg-[color:var(--color-paper)] rotate-180 pointer-events-none" />
      </div>
    </section>
  );
}
