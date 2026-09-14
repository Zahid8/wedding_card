import Link from "next/link";
import { home } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function ContentsList() {
  return (
    <section className="relative py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center mb-6">
            <span className="tracked-label">Explore</span>
            <h2 className="font-script text-4xl md:text-5xl mt-2 text-[color:var(--color-bark)]">Contents</h2>
          </div>
        </Reveal>
        <ul className="flex flex-col gap-2">
          {home.quickLinks.map((link, i) => (
            <Reveal key={link.href} delay={i * 0.05}>
              <li>
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-4 py-4 border-b border-[color:var(--color-tan)]/30 hover:border-[color:var(--color-coral)] transition-colors"
                >
                  <span className="font-serif font-light text-[color:var(--color-tan)] text-2xl w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <img src="/masks/leaf.svg" alt="" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-serif uppercase tracking-[0.22em] text-[color:var(--color-bark)] text-base md:text-lg">
                    {link.title}
                  </span>
                  <span aria-hidden className="flex-1 border-b border-dotted border-[color:var(--color-tan)]/50 translate-y-[-3px] mx-2" />
                  <span className="hidden md:block font-serif italic text-[color:var(--color-ink)]/70 text-right max-w-xs">
                    {link.desc}
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <li>
              <Link href="/faqs" className="group flex items-baseline gap-4 py-4 border-b border-[color:var(--color-tan)]/30 hover:border-[color:var(--color-coral)] transition-colors">
                <span className="font-serif font-light text-[color:var(--color-tan)] text-2xl w-10 shrink-0">04</span>
                <img src="/masks/leaf.svg" alt="" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-serif uppercase tracking-[0.22em] text-[color:var(--color-bark)] text-base md:text-lg">FAQs</span>
                <span aria-hidden className="flex-1 border-b border-dotted border-[color:var(--color-tan)]/50 translate-y-[-3px] mx-2" />
                <span className="hidden md:block font-serif italic text-[color:var(--color-ink)]/70 text-right max-w-xs">Common questions, answered</span>
              </Link>
            </li>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
