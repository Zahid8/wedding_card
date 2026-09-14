"use client";

import { useEffect, useRef } from "react";
import { music } from "./music";

/** Persistent looped background track; starts on the first user gesture if autoplay is blocked. */
export function BackgroundMusic({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    music.register(ref.current);
    let done = false;
    const unlock = () => {
      if (done) return;
      music.play().then((ok) => {
        if (ok) {
          done = true;
          remove();
        }
      });
    };
    const events = ["pointerdown", "touchstart", "keydown"] as const;
    const remove = () => events.forEach((e) => window.removeEventListener(e, unlock));
    // try straight away (allowed if the user already interacted or the browser permits it)
    music.play().then((ok) => {
      if (ok) done = true;
      else events.forEach((e) => window.addEventListener(e, unlock, { passive: true }));
    });
    return () => {
      remove();
      music.register(null);
    };
  }, []);

  return <audio ref={ref} src={src} loop preload="auto" aria-hidden />;
}
