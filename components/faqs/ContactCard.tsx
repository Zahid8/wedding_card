import { site, faqs } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Phone } from "lucide-react";

export function ContactCard() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-8">
      <Reveal>
        <div className="relative p-10 md:p-14 text-center torn-top torn-bottom overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(166,173,151,0.35), rgba(166,173,151,0.1))" }}>
          <img aria-hidden src="/masks/olive-branch.svg" alt="" className="absolute -left-6 top-4 w-40 opacity-70" />
          <img aria-hidden src="/masks/olive-branch.svg" alt="" className="absolute -right-6 bottom-4 w-40 opacity-70 scale-x-[-1]" />
          <span className="tracked-label">Still here?</span>
          <h3 className="font-script text-4xl mt-2 text-[color:var(--color-bark)]">{faqs.contact.title}</h3>
          <p className="font-serif italic text-[color:var(--color-ink)]/85 mt-4 max-w-xl mx-auto">
            {faqs.contact.body}
          </p>
          {site.contactPhoneTel ? (
            <a href={`tel:${site.contactPhoneTel}`} className="stamp-btn stamp-btn-coral mt-6">
              <Phone size={14} strokeWidth={1.5} /> {site.contactPhone}
            </a>
          ) : (
            <p className="tracked-label mt-6">Contact details coming soon</p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
