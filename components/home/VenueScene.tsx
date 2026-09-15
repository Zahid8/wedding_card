import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { art } from "@/content/art";
import { Reveal } from "@/components/motion/Reveal";

export function VenueScene() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-8">
          <span className="tracked-label">The Venues</span>
          <h2 className="font-script text-4xl md:text-5xl mt-2 text-[color:var(--color-bark)]">Where we celebrate</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 md:gap-12 items-center">
          <Reveal className="hidden md:block">
            <div className="relative aspect-[9/16] w-full max-w-[340px] mx-auto overflow-hidden torn-wipe-top -rotate-1 shadow-[0_30px_60px_-40px_rgba(87,52,30,0.5)]">
              <Image src={art.background.src} alt={art.background.alt} fill sizes="340px" className="object-cover object-bottom kenburns" />
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            {site.events.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.1}>
                <article className="paper-card torn-top torn-bottom p-8 md:p-9 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center">
                  <div>
                    <p className="font-serif uppercase tracking-[0.2em] text-sm font-medium text-[color:var(--color-bark)]">
                      {ev.name} · {ev.weekday}, {ev.month} {ev.day} · {ev.time}
                    </p>
                    <h3 className="font-script text-4xl md:text-5xl mt-2 text-[color:var(--color-bark)] leading-tight">{ev.venue.name}</h3>
                    <p className="mt-3 text-base md:text-lg text-[color:var(--color-ink)] leading-snug">
                      {ev.venue.line1}
                      <br />
                      {ev.venue.line2}
                    </p>
                  </div>
                  <a href={ev.venue.mapsSearch} target="_blank" rel="noreferrer" className="stamp-btn stamp-btn-coral justify-self-start sm:justify-self-end">
                    <MapPin size={14} strokeWidth={1.5} /> Open in Maps
                  </a>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link href="/travel" className="font-serif uppercase tracking-[0.2em] text-sm font-medium text-[color:var(--color-bark)] hover:text-[color:var(--color-coral)]">
                  Travel &amp; where to stay →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
