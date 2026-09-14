/**
 * Site-wide background music. One <audio> element lives in the root layout
 * (see BackgroundMusic), so it survives client-side navigation and keeps
 * playing on every page. Anything can call `music.play()`; the first
 * successful call (usually the tap on the invitation curtain) unlocks
 * audio for the rest of the visit.
 */
let el: HTMLAudioElement | null = null;

export const music = {
  register(a: HTMLAudioElement | null) {
    el = a;
  },
  async play(): Promise<boolean> {
    if (!el) return false;
    try {
      el.volume = 0.7;
      await el.play();
      return true;
    } catch {
      return false;
    }
  },
  restart() {
    if (el) el.currentTime = 0;
  },
  get playing() {
    return !!el && !el.paused;
  },
};
