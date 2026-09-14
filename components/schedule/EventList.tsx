import { schedule, site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Sparkles, Utensils } from "lucide-react";

const icons = { nikah: Sparkles, walima: Utensils } as const;

export function EventList() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <div className="text-center mb-8">
        <span className="tracked-label">Two evenings</span>
        <h2 className="font-script text-5xl mt-2 text-[color:var(--color-bark)]">{schedule.eventsHeading}</h2>
      </div>
      <ol className="relative flex flex-col gap-8">
        <div aria-hidden className="absolute left-5 md:left-1/2 top-4 bottom-4 w-px bg-[color:var(--color-tan)]/40" />
        {schedule.events.map((ev, i) => {
          const day = site.events.find((e) => e.id === ev.eventId)!;
          const Icon = icons[ev.eventId];
          const right = i % 2 === 1;
          return (
            <Reveal key={ev.title} delay={i * 0.1}>
              <li className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_3rem_1fr] items-center gap-4">
                <div className="row-start-1 col-start-1 md:col-start-2 flex justify-center">
                  <span className="w-10 h-10 rounded-full bg-[color:var(--color-paper)] border border-[color:var(--color-tan)] flex items-center justify-center text-[color:var(--color-tan)]">
                    <Icon size={18} strokeWidth={1.25} />
                  </span>
                </div>
                <article
                  className={
                    right
                      ? "paper-card torn-top torn-bottom p-7 row-start-1 col-start-2 md:col-start-3 md:text-left"
                      : "paper-card torn-top torn-bottom p-7 row-start-1 col-start-2 md:col-start-1 md:text-right"
                  }
                >
                  <span className="tracked-label">{day.weekday}, {day.month} {day.day}</span>
                  <div className={right ? "mt-2 flex items-baseline gap-2" : "mt-2 flex items-baseline gap-2 md:justify-end"}>
                    <span className="font-serif font-light text-[color:var(--color-tan)] text-6xl leading-none">{ev.time}</span>
                    <span className="tracked-label mb-1">{ev.meridiem}</span>
                  </div>
                  <h3 className="mt-2 font-serif uppercase tracking-[0.22em] text-[color:var(--color-bark)]">{ev.title}</h3>
                  <p className="font-serif italic text-[color:var(--color-ink)]/80 mt-2">{ev.desc}</p>
                  <p className="text-sm text-[color:var(--color-ink)]/70 mt-3">
                    {day.venue.name}, {day.venue.line1}, {day.venue.line2}
                  </p>
                </article>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
