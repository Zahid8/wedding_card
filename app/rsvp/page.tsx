import Image from "next/image";
import { rsvpCopy, site } from "@/content/site";
import { SectionHeading } from "@/components/paper/SectionHeading";
import { Foliage } from "@/components/paper/Foliage";
import { RsvpForm } from "@/components/rsvp/RsvpForm";

export const metadata = { title: `RSVP · Wedding` };

export default function RsvpPage() {
  return (
    <div className="relative">
      <section className="relative pt-28 md:pt-32 pb-2 text-center">
        <Foliage className="top-24 left-4 md:left-10" width={190} opacity={0.8} />
        <Foliage className="top-24 right-4 md:right-10" width={190} flip opacity={0.8} />
        <SectionHeading eyebrow="Kindly respond" script={rsvpCopy.heading} subtitle={rsvpCopy.subtitle} />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 items-start">
        <aside className="relative md:sticky md:top-32 flex flex-col items-center text-center">
          <div className="relative w-52 md:w-64 aspect-[433/953] h-72 md:h-[420px]">
            <Image src="/art/bride-lily.png" alt="Bride illustration" fill sizes="260px" className="object-contain object-bottom" />
          </div>
          <div className="mt-4 flex flex-col gap-5">
            {site.events.map((ev) => (
              <div key={ev.id}>
                <span className="tracked-label">{ev.name} · {ev.weekday}</span>
                <div className="font-serif font-light text-[color:var(--color-tan)] text-5xl leading-none mt-1">{ev.day}</div>
                <div className="tracked-label mt-1">{ev.month} · {ev.time}</div>
                <p className="font-serif italic text-[color:var(--color-ink)]/80 mt-1 max-w-xs">
                  {ev.venue.name}, {ev.venue.line2}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <div>
          <RsvpForm />
        </div>
      </section>
    </div>
  );
}
