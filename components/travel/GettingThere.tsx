import { Plane, TrainFront, Car } from "lucide-react";
import { travel } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

const icons: Record<string, React.ElementType> = {
  plane: Plane,
  train: TrainFront,
  car: Car,
};

export function GettingThere() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="text-center mb-8">
        <span className="tracked-label">{travel.gettingThereEyebrow}</span>
        <h2 className="font-script text-4xl md:text-5xl mt-2 text-[color:var(--color-bark)]">{travel.gettingThereHeading}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {travel.gettingThere.map((mode, i) => {
          const Icon = icons[mode.icon] ?? Plane;
          const tilt = i === 1 ? 0 : (i === 0 ? -0.6 : 0.6);
          return (
            <Reveal key={mode.title} delay={i * 0.08}>
              <article className="paper-card torn-top torn-bottom p-8 h-full" style={{ transform: `rotate(${tilt}deg)` }}>
                <Icon size={30} strokeWidth={1} className="text-[color:var(--color-tan)]" />
                <h3 className="mt-4 font-serif uppercase tracking-[0.22em] text-[color:var(--color-bark)]">{mode.title}</h3>
                <p className="font-serif italic text-[color:var(--color-ink)]/85 mt-3 leading-relaxed">{mode.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
