"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, home, story } from "@/content/site";
import { Wash } from "@/components/paper/Wash";
import { Foliage } from "@/components/paper/Foliage";
import { cn } from "@/lib/utils";
import { Blossoms, type Bloom } from "@/components/paper/Blossoms";
import { FlowerCurtain } from "@/components/paper/FlowerCurtain";

/**
 * Full-screen animated invitation. Flower-decorated drapes part first, then
 * the watercolor video plays as a live scene sequence. The painted art is only ever rendered inside a 9:16 stage
 * whose size matches the source frames (480x854), so it never pixelates:
 * on phones the stage is the screen, on desktop it is a centered card on a
 * vector paper backdrop.
 */

type SceneId = "intro" | "arch" | "invite" | "groom" | "bride" | "date" | "rsvp" | "wait" | "meme";
const SCENES: { id: SceneId; ms: number }[] = [
  { id: "intro", ms: 4600 },
  { id: "arch", ms: 4800 },
  { id: "invite", ms: 4400 },
  { id: "groom", ms: 4000 },
  { id: "bride", ms: 4000 },
  { id: "date", ms: 7000 },
  { id: "rsvp", ms: 5000 },
  { id: "wait", ms: 2800 },
  { id: "meme", ms: 0 },
];
const LAST = SCENES.length - 1;
const CURTAIN_MS = 2900; // drapes fully open, scenes start

const ease = [0.22, 0.8, 0.2, 1] as const;
const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
};

export function InvitationStage() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(reduce ? LAST : 0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // scenes render once the curtain is open
  const [run, setRun] = useState(0); // bumps to restart everything
  const [opened, setOpened] = useState(false); // curtain has been told to part
  const [sound, setSound] = useState<"pending" | "on" | "off">("pending");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const startMusic = useCallback(async () => {
    const a = audio.current;
    if (!a) return false;
    try {
      a.currentTime = 0;
      a.volume = 0.7;
      await a.play();
      setSound("on");
      return true;
    } catch {
      return false;
    }
  }, []);

  // Try to open with music straight away; if the browser blocks autoplay,
  // wait for a tap on the curtain (fallback: open silently after a while).
  useEffect(() => {
    let cancelled = false;
    let fallback: ReturnType<typeof setTimeout> | null = null;
    if (reduce) {
      fallback = setTimeout(() => setOpened(true), 0);
      return () => {
        if (fallback) clearTimeout(fallback);
      };
    }
    // deferred so no state is set synchronously inside the effect
    const kick = setTimeout(() => {
      startMusic().then((ok) => {
        if (cancelled) return;
        if (ok) setOpened(true);
        else {
          setSound("off");
          fallback = setTimeout(() => setOpened(true), 7000);
        }
      });
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(kick);
      if (fallback) clearTimeout(fallback);
    };
  }, [run, reduce, startMusic]);

  const openWithMusic = useCallback(() => {
    startMusic();
    setOpened(true);
  }, [startMusic]);

  // pause the music when the invitation scrolls out of view, resume when back
  useEffect(() => {
    const el = sectionRef.current;
    const a = audio.current;
    if (!el || !a) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) a.pause();
        else if (sound === "on" && a.paused) a.play().catch(() => {});
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sound]);

  // curtain opens, then the show starts
  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(
      () => {
        setStarted(true);
        setPlaying(!reduce);
      },
      reduce ? 0 : CURTAIN_MS,
    );
    return () => clearTimeout(t);
  }, [opened, run, reduce]);

  const scene: SceneId | null = started ? SCENES[index].id : null;
  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(LAST, i))), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);
  const replay = useCallback(() => {
    setStarted(false);
    setPlaying(false);
    setOpened(false);
    go(0);
    setRun((r) => r + 1);
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
  }, [index, playing, go]);

  // pause when tab hidden
  useEffect(() => {
    const onVis = () => setPlaying(started && !document.hidden && SCENES[index].ms !== 0);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [index, started]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const showTent = started && index >= 2;
  const showArch = started && index === 1;
  const meme = scene === "meme";
  const groomOn = scene === "groom" || scene === "date" || scene === "rsvp" || meme;
  const brideOn = scene === "bride" || scene === "date" || scene === "rsvp" || meme;
  const meet = scene === "date" || scene === "rsvp" || meme;

  return (
    <section
      ref={sectionRef}
      aria-label="Wedding invitation"
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[color:var(--color-paper)]"
    >
      {/* the song from 0:30 to 1:15, looped */}
      <audio ref={audio} src="/audio/invitation-loop.mp3" loop preload="auto" />
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
          if (!started || (e.target as HTMLElement).closest("a,button")) return;
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
              ? meme
                ? { x: "10%", opacity: 1, scaleX: -1, height: "46%" }
                : meet
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
              ? meme
                ? { x: "-4%", opacity: 1, scaleX: -1, height: "46%" }
                : meet
                  ? { x: "-14%", opacity: 1, scaleX: -1, height: "50%" }
                  : { x: "-4%", opacity: 1, scaleX: 1, height: "64%" }
              : { x: "120%", opacity: 0, scaleX: 1, height: "64%" }
          }
          transition={{ duration: 1.1, ease, delay: meet ? 0.15 : 0 }}
          style={{ aspectRatio: "433 / 953", transformOrigin: "bottom center" }}
        >
          <Image src="/art/bride-roses.png" alt="" fill priority sizes="300px" className="object-contain object-bottom" />
        </motion.div>

        {/* MEME: flower curtain drops between them, then the bubbles */}
        <AnimatePresence>
          {meme && (
            <motion.div
              key="meme-curtain"
              className="absolute left-1/2 -translate-x-1/2 top-[27%] bottom-0 w-[22%]"
              initial={reduce ? false : { y: "-110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease }}
            >
              <FlowerCurtain className="h-full w-full" />
            </motion.div>
          )}
          {meme && (
            <motion.div
              key="bubble-bride"
              className="absolute right-[3%] top-[36%] z-10 max-w-[44%]"
              initial={reduce ? false : { opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
            >
              <SpeechBubble>{home.meme.brideLine}</SpeechBubble>
            </motion.div>
          )}
          {meme && (
            <motion.div
              key="bubble-groom"
              className="absolute left-[3%] top-[30%] z-10 max-w-[46%]"
              initial={reduce ? false : { opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 3.0, type: "spring", stiffness: 260, damping: 18 }}
            >
              <SpeechBubble>{home.meme.groomLine}</SpeechBubble>
            </motion.div>
          )}
        </AnimatePresence>

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
              </motion.div>
            )}
            {scene === "wait" && (
              <motion.div key="t-wait" {...fade} transition={{ duration: 0.7, ease }} className="md:-mt-[6%]">
                <p className="font-script text-6xl leading-none text-[color:var(--color-bark)]">{home.meme.waitScript}</p>
                <p className="tracked-label mt-4">{home.meme.waitLabel}</p>
              </motion.div>
            )}

            {scene === "meme" && (
              <motion.div key="t-meme" {...fade} transition={{ duration: 0.9, ease, delay: 0.3 }} className="md:-mt-[10%]">
                <p className="tracked-label">Meanwhile, behind the curtain…</p>
                <motion.p
                  className="font-serif italic text-sm text-[color:var(--color-ink)]/70 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.6, duration: 0.8 }}
                >
                  {home.meme.footnote}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* scene dots */}
        <div
          className={cn("absolute inset-x-0 bottom-12 flex justify-center gap-2 z-20 transition-opacity", started ? "opacity-100" : "opacity-0")}
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
              className="p-1"
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-500",
                  i === index ? "w-4 h-1.5 bg-[color:var(--color-bark)]/80" : "w-1.5 h-1.5 bg-[color:var(--color-bark)]/25",
                )}
              />
            </button>
          ))}
        </div>

        {/* controls */}
        <div className={cn("absolute bottom-4 inset-x-0 px-6 flex items-center justify-between z-20 text-[color:var(--color-bark)]/70 transition-opacity", started ? "opacity-100" : "opacity-0")}>
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

      <Curtains key={run} reduce={!!reduce} open={opened} onOpen={openWithMusic} showPrompt={!opened && sound === "off"} />
    </section>
  );
}

const LEFT_BLOOMS: Bloom[] = [
  // trailing vine along the inner edge
  { x: 93, y: 5, r: 6, c: "var(--color-coral)" },
  { x: 84, y: 10, r: 4.5, c: "var(--color-blush)" },
  { x: 95, y: 16, r: 4, c: "var(--color-blush)" },
  { x: 88, y: 24, r: 5.5, c: "var(--color-coral)" },
  { x: 96, y: 33, r: 4, c: "var(--color-blush)" },
  { x: 89, y: 43, r: 5.5, c: "var(--color-coral)" },
  { x: 96, y: 54, r: 4, c: "var(--color-blush)" },
  { x: 88, y: 64, r: 5, c: "var(--color-coral)" },
  { x: 95, y: 74, r: 4, c: "var(--color-blush)" },
  { x: 89, y: 84, r: 5.5, c: "var(--color-coral)" },
  { x: 95, y: 94, r: 4.5, c: "var(--color-blush)" },
  // swag along the top
  { x: 72, y: 4, r: 4.5, c: "var(--color-blush)" },
  { x: 58, y: 7, r: 5.5, c: "var(--color-coral)" },
  { x: 44, y: 8, r: 4, c: "var(--color-blush)" },
  { x: 30, y: 7, r: 5, c: "var(--color-coral)" },
  { x: 16, y: 5, r: 4, c: "var(--color-blush)" },
  { x: 4, y: 3, r: 5, c: "var(--color-coral)" },
  // scattered on the drape
  { x: 62, y: 30, r: 3.5, c: "var(--color-blush)" },
  { x: 40, y: 48, r: 4, c: "var(--color-coral)" },
  { x: 68, y: 66, r: 3.5, c: "var(--color-blush)" },
  { x: 24, y: 80, r: 4, c: "var(--color-coral)" },
  { x: 55, y: 90, r: 3.5, c: "var(--color-blush)" },
];
const RIGHT_BLOOMS: Bloom[] = LEFT_BLOOMS.map((b) => ({ ...b, x: 100 - b.x }));

/** Sheer, flower-trimmed drapes that part to reveal the stage. */
function Curtains({
  reduce,
  open,
  onOpen,
  showPrompt,
}: {
  reduce: boolean;
  open: boolean;
  onOpen: () => void;
  showPrompt: boolean;
}) {
  const transition = { delay: 0.3, duration: 2.4, ease: [0.7, 0, 0.2, 1] as const };
  const panel = "absolute inset-y-0 w-[52%] curtain will-change-transform overflow-visible";
  return (
    <div className={cn("absolute inset-0 z-30", open ? "pointer-events-none" : "pointer-events-auto")} onClick={open ? undefined : onOpen}>
      {/* tap-to-open prompt when autoplay with sound is blocked */}
      <AnimatePresence>
        {showPrompt && (
          <motion.button
            key="prompt"
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 text-[color:var(--color-bark)]"
          >
            <span className="font-script text-3xl leading-none">Open the invitation</span>
            <span className="tracked-label text-[0.6rem]">tap to open</span>
          </motion.button>
        )}
      </AnimatePresence>
      {/* garland swag along the rod */}
      <motion.div
        className="absolute inset-x-0 -top-3 flex justify-center z-10 pointer-events-none"
        initial={reduce ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ delay: open ? 2 : 0, duration: 1 }}
      >
        <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 6 C 100 34, 300 34, 400 6" stroke="var(--color-olive)" strokeWidth="1.2" fill="none" />
          <path d="M0 4 C 100 30, 300 30, 400 4" stroke="var(--color-sage)" strokeWidth="0.8" fill="none" />
        </svg>
      </motion.div>
      <motion.div className={cn(panel, "left-0 curtain-left")} initial={reduce ? { x: "-100%" } : { x: 0 }} animate={{ x: open ? "-100%" : 0 }} transition={transition}>
        <Blossoms blooms={LEFT_BLOOMS} scale={8} className="absolute inset-0 pointer-events-none md:hidden" />
        <Blossoms blooms={LEFT_BLOOMS} scale={15} className="absolute inset-0 pointer-events-none hidden md:block" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M91 0 C 89 20, 93 40, 90 60 C 88 78, 92 90, 91 100" stroke="var(--color-olive)" strokeWidth="0.4" fill="none" opacity="0.7" />
        </svg>
      </motion.div>
      <motion.div className={cn(panel, "right-0 curtain-right")} initial={reduce ? { x: "100%" } : { x: 0 }} animate={{ x: open ? "100%" : 0 }} transition={transition}>
        <Blossoms blooms={RIGHT_BLOOMS} scale={8} className="absolute inset-0 pointer-events-none md:hidden" />
        <Blossoms blooms={RIGHT_BLOOMS} scale={15} className="absolute inset-0 pointer-events-none hidden md:block" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M9 0 C 11 20, 7 40, 10 60 C 12 78, 8 90, 9 100" stroke="var(--color-olive)" strokeWidth="0.4" fill="none" opacity="0.7" />
        </svg>
      </motion.div>
    </div>
  );
}

function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="paper-card wobble-border px-3 py-2.5 bg-[color:var(--color-paper)] text-center">
        <p className="font-serif text-[0.95rem] leading-snug text-[color:var(--color-ink)]">{children}</p>
      </div>
      <svg aria-hidden viewBox="0 0 24 18" className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-6 h-5">
        <path d="M2 0 C 6 8, 10 12, 12 18 C 13 10, 16 5, 22 0 Z" fill="var(--color-paper)" stroke="var(--color-tan)" strokeWidth="1" />
      </svg>
    </div>
  );
}
