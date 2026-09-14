import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin, Calendar } from "lucide-react";

export function SaveTheDate() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-6">
      <div className="text-center mb-8">
        <span className="tracked-label">Save the dates</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {site.events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.1}>
            <div
              className="paper-card torn-top torn-bottom p-10 md:p-12 text-center relative h-full flex flex-col items-center"
              style={{ transform: `rotate(${i === 0 ? -0.6 : 0.6}deg)` }}
            >
              <span className="font-arabic text-2xl text-[color:var(--color-tan)]">{ev.arabic}</span>
              <h3 className="font-script text-5xl mt-1 text-[color:var(--color-bark)]">{ev.name}</h3>
              <div className="mt-6 flex items-center justify-center gap-5 w-full">
                <div className="h-px flex-1 max-w-16 bg-[color:var(--color-tan)]/60" />
                <div className="font-serif uppercase tracking-[0.3em] text-[color:var(--color-bark)] text-sm">{ev.month}</div>
                <div className="h-px flex-1 max-w-16 bg-[color:var(--color-tan)]/60" />
              </div>
              <div className="mt-2 flex items-baseline justify-center gap-4">
                <span className="tracked-label">{ev.weekday}</span>
                <span className="font-serif font-light text-[color:var(--color-tan)] text-8xl leading-none">{ev.day}</span>
                <span className="tracked-label">{ev.year}</span>
              </div>
              <div className="mt-2 tracked-label">At {ev.time}</div>
              <div className="mt-8 font-serif uppercase tracking-[0.22em] text-[color:var(--color-bark)]">{ev.venue.name}</div>
              <p className="font-serif italic text-[color:var(--color-ink)]/80 mt-1">
                {ev.venue.line1}, {ev.venue.line2}
              </p>
              <a href={ev.venue.mapsSearch} target="_blank" rel="noreferrer" className="stamp-btn stamp-btn-ghost mt-6">
                <MapPin size={14} strokeWidth={1.5} /> Open in Maps
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="/api/ics" download={`${site.slug}.ics`} className="stamp-btn">
          <Calendar size={14} strokeWidth={1.5} /> Add both to Calendar
        </a>
      </div>
    </section>
  );
}
