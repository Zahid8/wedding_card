import { site, travel } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin } from "lucide-react";

export function VenueCard() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-6">
      <div className="text-center mb-8">
        <span className="tracked-label">{travel.venueLabel}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {site.events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.1}>
            <div className="flex flex-col gap-4">
              <div className="relative paper-card torn-top torn-bottom p-3 overflow-hidden">
                <iframe
                  title={`${ev.name} venue map`}
                  src={ev.venue.mapsEmbed}
                  loading="lazy"
                  className="w-full h-64 border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="paper-card torn-top torn-bottom p-8">
                <span className="tracked-label">{ev.name} · {ev.weekday}, {ev.month} {ev.day} · {ev.time}</span>
                <h3 className="font-script text-4xl mt-2 text-[color:var(--color-bark)]">{ev.venue.name}</h3>
                <p className="font-serif italic text-[color:var(--color-ink)]/85 mt-3">
                  {ev.venue.line1}
                  <br />
                  {ev.venue.line2}
                </p>
                <a href={ev.venue.mapsSearch} target="_blank" rel="noreferrer" className="stamp-btn stamp-btn-coral mt-6">
                  <MapPin size={14} strokeWidth={1.5} /> Open in Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
