import Link from "next/link";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Blossoms, type Bloom } from "@/components/paper/Blossoms";

const BLOOMS: Bloom[] = [
  { x: 4, y: 12, r: 7, c: "var(--color-coral)" },
  { x: 10, y: 70, r: 5, c: "var(--color-blush)" },
  { x: 2, y: 92, r: 6, c: "var(--color-coral)" },
  { x: 96, y: 10, r: 6, c: "var(--color-blush)" },
  { x: 92, y: 55, r: 7, c: "var(--color-coral)" },
  { x: 97, y: 88, r: 5, c: "var(--color-blush)" },
  { x: 50, y: 4, r: 4, c: "var(--color-coral)" },
];

/** Save the Dates: the one section that must pop, so it gets a warm sunrise wash and bright cards. */
export function DayStrip() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 torn-top torn-bottom"
      style={{
        background:
          "radial-gradient(90% 70% at 50% 0%, rgba(252,215,207,0.95), rgba(252,215,207,0) 70%), linear-gradient(180deg, #fbe7dd 0%, #f6dcc9 55%, var(--color-paper) 100%)",
      }}
    >
      <Blossoms blooms={BLOOMS} scale={8} className="absolute inset-0 pointer-events-none opacity-70 hidden md:block" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <span className="tracked-label !text-[color:var(--color-coral)]">Two evenings, two cities</span>
        <h2 className="font-script text-5xl md:text-6xl mt-2 text-[color:var(--color-bark)]">Save the Dates</h2>
        <p className="mt-2 font-serif italic text-lg text-[color:var(--color-ink)]/85">{site.date.range}</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {site.events.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 0.08}>
              <div
                className="relative h-full flex flex-col items-center gap-3 rounded-2xl p-8 md:p-10 bg-white/85 backdrop-blur-[2px] border border-[color:var(--color-coral)]/35 shadow-[0_30px_60px_-30px_rgba(192,57,43,0.35)]"
                style={{ transform: `rotate(${i === 0 ? -0.6 : 0.6}deg)` }}
              >
                <span aria-hidden className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 bg-[color:var(--color-coral)]/70 rotate-[-2deg] rounded-sm" />
                <span className="font-arabic text-2xl text-[color:var(--color-coral)] mt-1">{ev.arabic}</span>
                <h3 className="font-script text-4xl md:text-5xl text-[color:var(--color-bark)] -mt-1">{ev.name}</h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="tracked-label">{ev.weekday}</span>
                  <span className="font-serif font-medium text-[color:var(--color-coral)] text-7xl leading-none">{ev.day}</span>
                  <span className="tracked-label">{ev.monthShort} · {ev.time}</span>
                </div>
                <div className="h-px w-20 bg-[color:var(--color-coral)]/50" />
                <p className="font-sans font-semibold uppercase tracking-[0.14em] text-sm text-[color:var(--color-bark)]">{ev.venue.name}</p>
                <p className="font-sans text-sm text-[color:var(--color-ink)]/85 leading-snug">{ev.venue.line1}, {ev.venue.line2}</p>
                <a href={ev.venue.mapsSearch} target="_blank" rel="noreferrer" className="stamp-btn stamp-btn-coral mt-3 !py-2">
                  <MapPin size={13} strokeWidth={1.5} /> Open in Maps
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Link href="/schedule" className="mt-10 inline-block font-sans font-semibold uppercase tracking-[0.18em] text-xs text-[color:var(--color-coral)] hover:brightness-90">
          Full schedule →
        </Link>
      </div>
    </section>
  );
}
