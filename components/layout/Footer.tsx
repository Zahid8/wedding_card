import { site, home } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative mt-6 pt-14 pb-8 text-center">
      <div aria-hidden className="absolute inset-x-0 -top-4 flex justify-center gap-24 opacity-50 pointer-events-none">
        <img src="/masks/olive-branch.svg" alt="" className="w-40 -rotate-6" />
        <img src="/masks/olive-branch.svg" alt="" className="w-40 rotate-6 -scale-x-100" />
      </div>
      <div className="mx-auto max-w-2xl px-6 flex flex-col items-center gap-3">
        <p className="font-arabic text-lg text-[color:var(--color-tan)]">
          {home.bismillah}
        </p>
        <p className="font-script text-4xl text-[color:var(--color-bark)]">
          {site.couple.groomShort}{" "}
          <span className="text-[color:var(--color-coral)]">&amp;</span>{" "}
          {site.couple.brideShort}
        </p>
        <p className="tracked-label">{site.date.range}</p>
        <p className="font-serif italic text-[color:var(--color-ink)]/70">
          Made with love
        </p>
        <p className="font-serif italic text-xs text-[color:var(--color-tan)] mt-4">
          {site.credit}
        </p>
      </div>
    </footer>
  );
}
