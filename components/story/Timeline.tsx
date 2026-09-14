import { Heart, Sparkles, HeartHandshake, Calendar } from "lucide-react";
import { story } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

const icons: Record<string, React.ElementType> = {
  heart: Heart,
  sparkles: Sparkles,
  "heart-filled": HeartHandshake,
  calendar: Calendar,
};

export function Timeline() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-8">
      <div className="text-center mb-14">
        <span className="tracked-label">Chapter by chapter</span>
        <h2 className="font-script text-5xl mt-2 text-[color:var(--color-bark)]">{story.journeyHeading}</h2>
      </div>
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-[url('/masks/brush-rule.svg')] bg-repeat-y opacity-70"
          style={{ backgroundSize: "6px 200px", transform: "rotate(90deg) translateX(-50%)", transformOrigin: "top left" }}
        />
        <ul className="flex flex-col gap-14">
          {story.journey.map((step, i) => {
            const Icon = icons[step.icon] ?? Heart;
            const side = i % 2 === 0 ? "left" : "right";
            const tilt = (i % 2 === 0 ? -1 : 1) * 0.7;
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className={`relative grid grid-cols-[3rem_1fr] md:grid-cols-2 gap-6 items-start`}>
                  <div className={`relative flex md:justify-center ${side === "right" ? "md:order-2" : ""}`}>
                    <div className="w-12 h-12 rounded-full bg-[color:var(--color-paper)] border-2 border-[color:var(--color-tan)] flex items-center justify-center text-[color:var(--color-bark)]">
                      <Icon size={20} strokeWidth={1.25} />
                    </div>
                  </div>
                  <div
                    className={`paper-card torn-top torn-bottom p-6 md:p-8 max-w-lg ${side === "right" ? "md:order-1 md:justify-self-end md:text-right" : ""}`}
                    style={{ transform: `rotate(${tilt}deg)` }}
                  >
                    <span className="tracked-label">{step.label}</span>
                    <h3 className="font-serif uppercase tracking-[0.22em] text-[color:var(--color-bark)] mt-2">{step.title}</h3>
                    <p className="font-serif italic text-[color:var(--color-ink)]/85 mt-3 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
