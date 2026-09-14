export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
};

export function diff(targetIso: string, nowMs: number = Date.now()): CountdownParts {
  const target = new Date(targetIso).getTime();
  const delta = target - nowMs;
  if (delta <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  }
  const seconds = Math.floor(delta / 1000) % 60;
  const minutes = Math.floor(delta / (1000 * 60)) % 60;
  const hours = Math.floor(delta / (1000 * 60 * 60)) % 24;
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, past: false };
}
