import Link from "next/link";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function DayStrip() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-[color:var(--color-paper-wash)]/60 torn-top torn-bottom">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="tracked-label">Two evenings, two cities</span>
        <h2 className="font-script text-4xl md:text-5xl mt-2 text-[color:var(--color-bark)]">Save the Dates</h2>
        <p className="mt-1 font-serif italic text-[color:var(--color-ink)]/80">{site.date.range}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {site.events.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 0.08}>
              <div className="paper-card torn-top torn-bottom p-8 h-full flex flex-col items-center gap-3">
                <span className="font-arabic text-xl text-[color:var(--color-tan)]">{ev.arabic}</span>
                <h3 className="font-script text-4xl text-[color:var(--color-bark)] -mt-1">{ev.name}</h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="tracked-label">{ev.weekday}</span>
                  <span className="font-serif font-light text-[color:var(--color-tan)] text-6xl leading-none">{ev.day}</span>
                  <span className="tracked-label">{ev.monthShort} · {ev.time}</span>
                </div>
                <div className="h-px w-16 bg-[color:var(--color-tan)]/60" />
                <p className="font-serif uppercase tracking-[0.2em] text-sm text-[color:var(--color-bark)]">{ev.venue.name}</p>
                <p className="font-serif italic text-sm text-[color:var(--color-ink)]/70">{ev.venue.line1}, {ev.venue.line2}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Link href="/schedule" className="mt-8 inline-block font-serif uppercase tracking-[0.2em] text-xs text-[color:var(--color-coral)] hover:brightness-90">
          Full schedule →
        </Link>
      </div>
    </section>
  );
}
