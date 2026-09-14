import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { BrushRule } from "@/components/paper/BrushRule";

export function VenueScene() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="relative aspect-[9/16] w-full max-w-[420px] mx-auto overflow-hidden torn-wipe-top md:-rotate-1 shadow-[0_30px_60px_-40px_rgba(87,52,30,0.5)]">
            <Image
              src="/art/scene-tent.png"
              alt="Watercolor tent and olive tree"
              fill
              sizes="420px"
              className="object-cover object-bottom kenburns"
            />
            <div aria-hidden className="absolute inset-0 bg-[color:var(--color-paper)]/15" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="paper-card torn-top torn-bottom p-8 md:p-10 md:-ml-20 relative z-10 flex flex-col gap-8">
            <span className="tracked-label">The Venues</span>
            {site.events.map((ev) => (
              <div key={ev.id}>
                <span className="tracked-label">{ev.name} · {ev.weekday}, {ev.monthShort} {ev.day}</span>
                <h3 className="font-script text-3xl md:text-4xl mt-1 text-[color:var(--color-bark)]">{ev.venue.name}</h3>
                <BrushRule width={90} className="my-3" />
                <p className="font-serif italic text-[color:var(--color-ink)]/85">
                  {ev.venue.line1}, {ev.venue.line2}
                </p>
                <a href={ev.venue.mapsSearch} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-serif uppercase tracking-[0.2em] text-xs text-[color:var(--color-coral)] hover:brightness-90">
                  <MapPin size={13} strokeWidth={1.5} /> Open in Maps
                </a>
              </div>
            ))}
            <Link href="/travel" className="font-serif uppercase tracking-[0.2em] text-xs text-[color:var(--color-tan)] hover:text-[color:var(--color-bark)]">
              Travel &amp; where to stay →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
