import { schedule } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function DressCode() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-8">
      <Reveal>
        <div className="relative p-10 md:p-14 text-center torn-top torn-bottom" style={{ background: "linear-gradient(180deg, rgba(252,215,207,0.5), rgba(252,215,207,0.15))" }}>
          <span className="tracked-label">Dress Code</span>
          <h3 className="font-serif uppercase tracking-[0.28em] text-[color:var(--color-bark)] text-xl md:text-2xl mt-3">
            {schedule.dressCode.title}
          </h3>
          <p className="font-serif italic text-[color:var(--color-ink)]/85 mt-4 max-w-xl mx-auto">
            {schedule.dressCode.body}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            {[
              { c: "var(--color-blush)", l: "Blush" },
              { c: "var(--color-sand)", l: "Sand" },
              { c: "var(--color-olive)", l: "Olive" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col items-center gap-1">
                <span className="w-8 h-8 rounded-full border border-[color:var(--color-tan)]/60" style={{ background: s.c }} />
                <span className="tracked-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
