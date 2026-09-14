import { Blossoms, type Bloom } from "./Blossoms";
import { cn } from "@/lib/utils";

const BLOOMS: Bloom[] = [
  { y: 6, x: 40, r: 9, c: "var(--color-coral)" },
  { y: 14, x: 62, r: 7, c: "var(--color-blush)" },
  { y: 22, x: 34, r: 8, c: "var(--color-blush)" },
  { y: 31, x: 58, r: 10, c: "var(--color-coral)" },
  { y: 40, x: 38, r: 7, c: "var(--color-blush)" },
  { y: 49, x: 64, r: 8, c: "var(--color-coral)" },
  { y: 58, x: 42, r: 9, c: "var(--color-blush)" },
  { y: 67, x: 60, r: 7, c: "var(--color-coral)" },
  { y: 76, x: 36, r: 8, c: "var(--color-blush)" },
  { y: 86, x: 58, r: 9, c: "var(--color-coral)" },
];

/** A narrow sheer drape strip hung with blossoms, all vector. Give it a height via className. */
export function FlowerCurtain({ className }: { className?: string }) {
  return (
    <div className={cn("relative curtain torn-bottom", className)} aria-hidden>
      <div className="absolute -top-1 inset-x-[-6px] h-2 rounded-full bg-[color:var(--color-bark)]/80" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path d="M40 0 C 38 20, 44 40, 40 60 C 37 75, 42 90, 40 100" stroke="var(--color-olive)" strokeWidth="0.6" fill="none" opacity="0.8" />
        <path d="M60 0 C 63 18, 57 38, 61 58 C 64 74, 58 88, 60 100" stroke="var(--color-olive)" strokeWidth="0.6" fill="none" opacity="0.8" />
      </svg>
      <Blossoms blooms={BLOOMS} scale={3.2} />
    </div>
  );
}
