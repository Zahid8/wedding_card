import Image from "next/image";
import Link from "next/link";
import { site, home } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Wash } from "@/components/paper/Wash";

export function RsvpBand() {
  return (
    <section className="relative isolate overflow-hidden pt-14 md:pt-16 pb-64 md:pb-72">
      <Wash variant="blush" />
      {/* Bride and groom cutouts drawn at well under their native size, facing each other */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-60 md:h-72 flex items-end justify-center gap-8 md:gap-20"
      >
        <div className="relative h-[92%] aspect-[248/972] -scale-x-100">
          <Image src="/art/groom.png" alt="" fill sizes="120px" className="object-contain object-bottom" />
        </div>
        <div className="relative h-[92%] aspect-[433/953] -scale-x-100">
          <Image src="/art/bride-roses.png" alt="" fill sizes="160px" className="object-contain object-bottom" />
        </div>
      </div>
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="font-script text-5xl md:text-6xl text-[color:var(--color-bark)]">{home.closing}</p>
          <Link href="/rsvp" className="stamp-btn stamp-btn-coral mt-8">
            RSVP Now
          </Link>
          <p className="tracked-label mt-6">Kindly respond by {site.rsvpDeadline}</p>
        </Reveal>
      </div>
    </section>
  );
}
