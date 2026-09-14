import { travel } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Phone } from "lucide-react";

export function Hotels() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <div className="text-center mb-6">
        <span className="tracked-label">Rest &amp; refresh</span>
        <h2 className="font-script text-4xl md:text-5xl mt-2 text-[color:var(--color-bark)]">{travel.hotelsHeading}</h2>
        <p className="font-serif italic text-[color:var(--color-ink)]/80 max-w-xl mx-auto mt-4">{travel.hotelsIntro}</p>
      </div>
      {travel.hotels.length > 0 && (
      <ul className="flex flex-col divide-y divide-[color:var(--color-tan)]/40">
        {travel.hotels.map((h, i) => (
          <Reveal key={h.name} delay={i * 0.05}>
            <li className="py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] items-baseline gap-3">
              <div>
                <h3 className="font-serif text-xl text-[color:var(--color-bark)]">{h.name}</h3>
                <p className="text-sm text-[color:var(--color-ink)]/75 mt-1">{h.address}</p>
                <p className="text-sm font-serif italic text-[color:var(--color-tan)] mt-1">{h.distance} · {h.tier}</p>
              </div>
              <a href={`tel:${h.tel}`} className="inline-flex items-center gap-2 font-serif text-[color:var(--color-coral)] tracking-[0.14em] uppercase text-xs hover:brightness-90">
                <Phone size={14} strokeWidth={1.5} /> {h.phone}
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
      )}
    </section>
  );
}
