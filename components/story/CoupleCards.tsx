import Image from "next/image";
import { story } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { BrushRule } from "@/components/paper/BrushRule";

export function CoupleCards() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12">
      {[
        { ...story.groom, art: "/art/groom.png", aspect: "248 / 972", right: false },
        { ...story.bride, art: "/art/bride-lily.png", aspect: "433 / 953", right: true },
      ].map((p, i) => (
        <Reveal key={p.name} delay={i * 0.1}>
          <div className="relative flex flex-col items-center text-center">
            <div className="relative w-full h-[420px] md:h-[520px]">
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-0 top-6 rounded-t-full opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 70% at 50% 60%, rgba(220,201,176,0.7), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <Image
                src={p.art}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-contain object-bottom ${p.right ? "" : "-scale-x-100"}`}
              />
            </div>
            <div className="mt-6">
              <span className="tracked-label">{p.label}</span>
              <h3 className="font-script text-5xl mt-2 text-[color:var(--color-bark)]">{p.name}</h3>
              <BrushRule width={90} className="my-3 mx-auto" />
              <p className="font-serif italic text-[color:var(--color-ink)]/85 max-w-sm mx-auto">{p.bio}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
