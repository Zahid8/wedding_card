import { Wash } from "@/components/paper/Wash";
import { Foliage } from "@/components/paper/Foliage";
import { story } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function Quote() {
  return (
    <section className="relative isolate overflow-hidden py-12 md:py-16">
      <Wash variant="blush" />
      <Foliage className="-left-6 top-4 -rotate-12" width={200} opacity={0.6} />
      <Foliage className="-right-8 bottom-2 rotate-[160deg]" width={220} opacity={0.5} flip />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="font-serif italic text-2xl md:text-3xl leading-snug text-[color:var(--color-bark)]">
            “{story.quote.text}”
          </p>
          <p className="tracked-label mt-6">— {story.quote.author}</p>
        </Reveal>
      </div>
    </section>
  );
}
