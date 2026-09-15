import Image from "next/image";
import Link from "next/link";
import { story } from "@/content/site";
import { art, ratio, faceClass } from "@/content/art";
import { Reveal } from "@/components/motion/Reveal";
import { BrushRule } from "@/components/paper/BrushRule";

export function MeetTheCouple() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-6 items-stretch">
          <Reveal>
            <article className="relative flex flex-col md:flex-row items-center gap-6 paper-card torn-top torn-bottom p-8">
              <div className="relative shrink-0 w-32 md:w-40 h-64 md:h-80" style={{ aspectRatio: ratio(art.groom) }}>
                <Image src={art.groom.src} alt={art.groom.alt} fill sizes="200px" className={`object-contain object-bottom ${faceClass(art.groom, "right")}`} />
              </div>
              <div className="text-center md:text-left">
                <span className="tracked-label">{story.groom.label}</span>
                <h3 className="font-script text-4xl mt-2 text-[color:var(--color-bark)]">{story.groom.name}</h3>
                <BrushRule width={80} className="my-3 mx-auto md:mx-0" />
                <p className="font-serif italic text-[color:var(--color-ink)]/85 leading-relaxed">{story.groom.bio}</p>
                <Link href="/our-story" className="mt-4 inline-block font-serif uppercase tracking-[0.2em] text-xs text-[color:var(--color-coral)] hover:brightness-90">
                  Read our story →
                </Link>
              </div>
            </article>
          </Reveal>

          <div className="hidden md:flex flex-col items-center justify-center">
            <img src="/masks/olive-branch.svg" alt="" className="w-24 opacity-80 rotate-90" />
          </div>

          <Reveal delay={0.1}>
            <article className="relative flex flex-col md:flex-row-reverse items-center gap-6 paper-card torn-top torn-bottom p-8">
              <div className="relative shrink-0 w-32 md:w-44 h-64 md:h-80" style={{ aspectRatio: ratio(art.bride) }}>
                <Image src={art.bride.src} alt={art.bride.alt} fill sizes="220px" className={`object-contain object-bottom ${faceClass(art.bride, "left")}`} />
              </div>
              <div className="text-center md:text-right">
                <span className="tracked-label">{story.bride.label}</span>
                <h3 className="font-script text-4xl mt-2 text-[color:var(--color-bark)]">{story.bride.name}</h3>
                <BrushRule width={80} className="my-3 mx-auto md:ml-auto md:mr-0" />
                <p className="font-serif italic text-[color:var(--color-ink)]/85 leading-relaxed">{story.bride.bio}</p>
                <Link href="/our-story" className="mt-4 inline-block font-serif uppercase tracking-[0.2em] text-xs text-[color:var(--color-coral)] hover:brightness-90">
                  Read our story →
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
